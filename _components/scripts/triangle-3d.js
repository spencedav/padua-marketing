/* =============================================================================
   PADUA TRIANGLE 3D — Three.js glass tetrahedron (v2 — no importmap, no addons)
   =============================================================================
   Auto-attaches to id="padua-tri3d". Self-contained: no importmap, no addons
   (built-in env replaces RoomEnvironment). Wraps init in try/catch and writes
   any error visibly into the mount so we can diagnose without dev tools.
   =========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js';

const PADUA = {
  discover:  0x4a308c,
  compare:   0xab2178,
  recommend: 0xeb2e4d,
  review:    0xf59436,
  yellow:    0xf5d534,
  teal:      0x007282,
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -----------------------------------------------------------------------------
   Build a simple PMREM environment from a generated cube texture.
   Replaces RoomEnvironment so we don't need addons / importmap.
   --------------------------------------------------------------------------- */
function buildEnvironment(renderer) {
  // 6 face colors approximating a soft studio: warm key, cool fill, dim floor/ceiling
  const faces = [
    '#fffaf0', // +X (warm key, right)
    '#eef2f7', // -X (cool fill, left)
    '#ffffff', // +Y (top, sky)
    '#3a2f4e', // -Y (floor, warm ink)
    '#fdf5ec', // +Z (front, warm)
    '#dfe5ee', // -Z (back, cool)
  ];
  const size = 16;
  const faceTextures = faces.map((c) => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(cv);
  });
  const cubeRT = new THREE.WebGLCubeRenderTarget(size);
  const cubeScene = new THREE.Scene();
  // Use a CubeTexture built from the 6 canvases
  const cubeTex = new THREE.CubeTexture(faceTextures.map((t) => t.image));
  cubeTex.needsUpdate = true;
  cubeTex.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromCubemap(cubeTex).texture;
  pmrem.dispose();
  faceTextures.forEach((t) => t.dispose());
  cubeRT.dispose();
  cubeScene.clear();
  return envTex;
}

function showError(mount, message) {
  mount.style.display = 'flex';
  mount.style.alignItems = 'center';
  mount.style.justifyContent = 'center';
  mount.style.padding = '20px';
  mount.style.fontFamily = 'system-ui, sans-serif';
  mount.style.fontSize = '12px';
  mount.style.color = '#888';
  mount.style.textAlign = 'center';
  mount.style.background = 'rgba(0,0,0,0.03)';
  mount.style.borderRadius = '12px';
  mount.innerHTML = `<div>3D view unavailable<br><span style="font-size:10px;opacity:0.7">${message}</span></div>`;
}

function init() {
  const mount = document.getElementById('padua-tri3d');
  if (!mount) return;

  if (typeof THREE === 'undefined' || !THREE.WebGLRenderer) {
    showError(mount, 'three.js failed to load');
    return;
  }

  // -- renderer
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    showError(mount, 'WebGL not available');
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  mount.appendChild(canvas);

  // -- scene + camera
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.3, 5.4);
  camera.lookAt(0, 0, 0);

  // -- env
  try {
    scene.environment = buildEnvironment(renderer);
  } catch (err) {
    console.warn('[padua-tri3d] env build failed, continuing without IBL', err);
  }

  // -- glass tetrahedron (flat-facet shading via non-indexed geometry)
  const tetraGeom = new THREE.TetrahedronGeometry(1.6, 0).toNonIndexed();
  tetraGeom.computeVertexNormals();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transmission: 1.0,
    thickness: 1.2,
    ior: 1.5,
    attenuationColor: new THREE.Color(PADUA.discover),
    attenuationDistance: 2.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.1,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  const tetra = new THREE.Mesh(tetraGeom, glassMat);
  tetra.rotation.x = -0.35;
  tetra.rotation.y = 0.6;
  scene.add(tetra);

  // -- inner spectrum-tinted core (visible through the glass via refraction)
  const coreGeom = new THREE.IcosahedronGeometry(0.55, 1);
  const colors = [];
  const palette = [
    new THREE.Color(PADUA.discover),
    new THREE.Color(PADUA.compare),
    new THREE.Color(PADUA.recommend),
    new THREE.Color(PADUA.review),
    new THREE.Color(PADUA.yellow),
  ];
  const posAttr = coreGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const y = posAttr.getY(i);
    const t = Math.max(0, Math.min(1, (y + 0.55) / 1.1));
    const seg = t * (palette.length - 1);
    const idx = Math.floor(seg);
    const next = Math.min(palette.length - 1, idx + 1);
    const local = seg - idx;
    const c = palette[idx].clone().lerp(palette[next], local);
    colors.push(c.r, c.g, c.b);
  }
  coreGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const coreMat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  core.scale.setScalar(0.55);
  scene.add(core);

  // -- lights: methodology-tinted points at the vertices + soft key from above
  [
    [PADUA.discover,  [ 1.8,  1.6,  1.4]],
    [PADUA.compare,   [-1.8,  1.4,  0.8]],
    [PADUA.recommend, [ 0.0, -1.8,  1.6]],
    [PADUA.review,    [ 1.2,  0.4, -1.8]],
  ].forEach(([color, pos]) => {
    const light = new THREE.PointLight(color, 12, 8, 1.6);
    light.position.set(pos[0], pos[1], pos[2]);
    scene.add(light);
  });

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(2, 4, 3);
  scene.add(keyLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambient);

  // -- responsive sizing
  function resize() {
    const w = mount.clientWidth || 320;
    const h = mount.clientHeight || 320;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }
  resize();

  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(mount);
  } else {
    window.addEventListener('resize', resize);
  }

  // -- mouse parallax
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  function onPointer(e) {
    const r = mount.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const isTouch = e.touches && e.touches[0];
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    const y = isTouch ? e.touches[0].clientY : e.clientY;
    pointer.tx = ((x - cx) / r.width) * 2;
    pointer.ty = ((y - cy) / r.height) * 2;
  }
  function resetPointer() {
    pointer.tx = 0;
    pointer.ty = 0;
  }
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerleave', resetPointer, { passive: true });

  // -- pause when off-screen
  let visible = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0 }).observe(mount);
  }

  // -- loop
  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;

    const dt = Math.min(0.05, clock.getDelta());
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    if (!reduceMotion) {
      tetra.rotation.y += dt * 0.18;
      tetra.rotation.x += dt * 0.06;
      core.rotation.y -= dt * 0.22;
      core.rotation.x += dt * 0.09;
    }
    tetra.rotation.y += pointer.x * 0.0025;
    tetra.rotation.x += pointer.y * 0.0015;

    renderer.render(scene, camera);
  }
  tick();
}

function safeInit() {
  try {
    init();
  } catch (err) {
    console.error('[padua-tri3d] init failed', err);
    const mount = document.getElementById('padua-tri3d');
    if (mount) showError(mount, err && err.message ? err.message : 'init failed');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeInit);
} else {
  safeInit();
}
