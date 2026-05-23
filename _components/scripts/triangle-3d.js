/* =============================================================================
   PADUA TRIANGLE 3D — Three.js triangular pyramid, base-down, spinning
   =============================================================================
   A glass-tinted triangular pyramid sits flat on its base and rotates slowly
   around the vertical axis. Each of the three side faces carries a methodology-
   tinted label (Quality, Cost, Turnaround) painted onto a plane that hugs the
   face, so labels rotate with the pyramid and present themselves in turn.

   Self-contained: no importmap, no Three.js addons. Wraps init in try/catch
   and writes any error visibly into the mount so failures are observable
   without dev tools.
   =========================================================================== */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js';

const PADUA = {
  discover:  '#4a308c',
  compare:   '#ab2178',
  recommend: '#eb2e4d',
  review:    '#f59436',
  yellow:    '#f5d534',
  teal:      '#007282',
  ink:       '#16121f',
  paper:     '#faf8f4',
};

const FACES = [
  { stage: 'discover',  color: PADUA.discover,  text: 'Quality' },
  { stage: 'compare',   color: PADUA.compare,   text: 'Cost' },
  { stage: 'recommend', color: PADUA.recommend, text: 'Turnaround' },
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -----------------------------------------------------------------------------
   Small studio-IBL environment, built from a 6-face cube of canvas swatches.
   Replaces RoomEnvironment so we don't need addons.
   --------------------------------------------------------------------------- */
function buildEnvironment(renderer) {
  const faces = ['#fffaf0','#eef2f7','#ffffff','#3a2f4e','#fdf5ec','#dfe5ee'];
  const size = 16;
  const imgs = faces.map((c) => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, size, size);
    return cv;
  });
  const cubeTex = new THREE.CubeTexture(imgs);
  cubeTex.needsUpdate = true;
  cubeTex.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromCubemap(cubeTex).texture;
  pmrem.dispose();
  return envTex;
}

/* -----------------------------------------------------------------------------
   Build a triangular-pyramid BufferGeometry centered on origin, base on the
   y = -h/2 plane, apex at y = +h/2.
   --------------------------------------------------------------------------- */
function buildPyramidGeometry(baseRadius, height) {
  const half = height / 2;
  // 3 base vertices, 120° apart, on the y = -half plane
  const b0 = [ baseRadius * Math.cos(0),                  -half, baseRadius * Math.sin(0) ];
  const b1 = [ baseRadius * Math.cos((2 * Math.PI) / 3),  -half, baseRadius * Math.sin((2 * Math.PI) / 3) ];
  const b2 = [ baseRadius * Math.cos((4 * Math.PI) / 3),  -half, baseRadius * Math.sin((4 * Math.PI) / 3) ];
  const ap = [ 0,                                          half, 0 ];

  // Side faces CCW seen from outside; base CCW seen from below
  const positions = new Float32Array([
    ...b0, ...b1, ...ap, // side A (between b0 and b1)
    ...b1, ...b2, ...ap, // side B (between b1 and b2)
    ...b2, ...b0, ...ap, // side C (between b2 and b0)
    ...b0, ...b2, ...b1, // base
  ]);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return { geom, baseVerts: [b0, b1, b2], apex: ap };
}

/* -----------------------------------------------------------------------------
   Render a chip-style label to a canvas: dot + uppercase text on a soft tinted
   pill background. Returns a CanvasTexture.
   --------------------------------------------------------------------------- */
function makeLabelTexture(text, color) {
  const W = 1024;
  const H = 256;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');

  // Transparent canvas. Draw a pill in the lower portion.
  ctx.clearRect(0, 0, W, H);

  const pillW = 760;
  const pillH = 140;
  const pillX = (W - pillW) / 2;
  const pillY = (H - pillH) / 2;
  const r = pillH / 2;

  // Soft background pill
  ctx.beginPath();
  ctx.moveTo(pillX + r, pillY);
  ctx.lineTo(pillX + pillW - r, pillY);
  ctx.arc(pillX + pillW - r, pillY + r, r, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(pillX + r, pillY + pillH);
  ctx.arc(pillX + r, pillY + r, r, Math.PI / 2, (3 * Math.PI) / 2);
  ctx.closePath();

  // Fill with translucent paper, then tinted border
  ctx.fillStyle = 'rgba(250, 248, 244, 0.92)';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.stroke();

  // Dot
  const dotR = 14;
  const dotX = pillX + 56;
  const dotY = pillY + pillH / 2;
  ctx.beginPath();
  ctx.arc(dotX, dotY, dotR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  // Text
  ctx.fillStyle = color;
  ctx.font = '600 70px "Geist", system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '6px';
  ctx.fillText(text.toUpperCase(), dotX + 36, dotY + 4);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
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

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1.0, 6.2);
  camera.lookAt(0, -0.1, 0);

  // -- IBL
  try {
    scene.environment = buildEnvironment(renderer);
  } catch (err) {
    console.warn('[padua-tri3d] env build failed', err);
  }

  // -- pyramid geometry
  const BASE_RADIUS = 1.7;
  const HEIGHT = 2.55;
  const { geom: pyrGeom, baseVerts, apex } = buildPyramidGeometry(BASE_RADIUS, HEIGHT);

  // Glass-prism material (tinted enough that back faces don't show through)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.08,
    transmission: 0.45,
    thickness: 1.2,
    ior: 1.5,
    attenuationColor: new THREE.Color(PADUA.discover),
    attenuationDistance: 1.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.1,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  const pyramid = new THREE.Mesh(pyrGeom, glassMat);

  // Root group rotates; pyramid + labels are children, so they rotate together
  const root = new THREE.Group();
  root.add(pyramid);
  scene.add(root);

  /* ---------------------------------------------------------------------------
     Place a labelled plane just outside each of the 3 side faces.
     For each side face (b_i, b_{i+1}, apex):
       - face center = centroid of the 3 vertices
       - face normal = normalize cross product
       - position the label plane at center + normal × offset
       - orient the plane so its +Z aligns with the face normal
     ----------------------------------------------------------------------- */
  function v(a) { return new THREE.Vector3(a[0], a[1], a[2]); }

  const sideTriples = [
    [v(baseVerts[0]), v(baseVerts[1]), v(apex), FACES[0]],
    [v(baseVerts[1]), v(baseVerts[2]), v(apex), FACES[1]],
    [v(baseVerts[2]), v(baseVerts[0]), v(apex), FACES[2]],
  ];

  const LABEL_W = 1.6;
  const LABEL_H = 0.4;
  const NORMAL_OFFSET = 0.01; // hover just outside the face

  sideTriples.forEach(([p1, p2, p3, face]) => {
    const center = new THREE.Vector3().add(p1).add(p2).add(p3).multiplyScalar(1 / 3);

    const edge1 = new THREE.Vector3().subVectors(p2, p1);
    const edge2 = new THREE.Vector3().subVectors(p3, p1);
    const normal = new THREE.Vector3().crossVectors(edge1, edge2).normalize();

    // Position label plane at face center, slightly outward along normal
    const planePos = center.clone().add(normal.clone().multiplyScalar(NORMAL_OFFSET));

    // Build the plane geometry — make it face outward (default plane faces +Z)
    const planeGeom = new THREE.PlaneGeometry(LABEL_W, LABEL_H);

    const tex = makeLabelTexture(face.text, face.color);
    const planeMat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const labelMesh = new THREE.Mesh(planeGeom, planeMat);
    labelMesh.position.copy(planePos);

    // Orient so plane normal matches face normal.
    // PlaneGeometry's default normal is +Z. Use a quaternion to rotate +Z → face normal.
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    labelMesh.quaternion.copy(q);

    // Position the label lower on the face (closer to the base edge)
    // by sliding along the up-vector projected onto the face.
    const faceUp = new THREE.Vector3(0, 1, 0).projectOnPlane(normal).normalize();
    labelMesh.position.sub(faceUp.clone().multiplyScalar(HEIGHT * 0.18));

    root.add(labelMesh);
  });

  /* ---------------------------------------------------------------------------
     Lights: methodology-tinted point lights placed AT the world positions of
     the three side-face centers but offset outward and high. Plus a soft key
     and a small ambient.
     ----------------------------------------------------------------------- */
  [PADUA.discover, PADUA.compare, PADUA.recommend].forEach((hex, i) => {
    const angle = (i / 3) * Math.PI * 2;
    const light = new THREE.PointLight(new THREE.Color(hex), 14, 10, 1.7);
    light.position.set(Math.cos(angle) * 3.2, 1.2, Math.sin(angle) * 3.2);
    scene.add(light);
  });

  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(2, 4, 3);
  scene.add(key);
  scene.add(new THREE.AmbientLight(0xffffff, 0.28));

  /* ---------------------------------------------------------------------------
     Soft contact shadow under the base — a faded radial gradient plane on
     the ground (just for grounding the pyramid visually).
     ----------------------------------------------------------------------- */
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 256;
  const sctx = shadowCanvas.getContext('2d');
  const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(74,48,140,0.32)');
  grad.addColorStop(0.6, 'rgba(74,48,140,0.10)');
  grad.addColorStop(1, 'rgba(74,48,140,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 256, 256);
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  shadowTex.colorSpace = THREE.SRGBColorSpace;
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
  });
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -HEIGHT / 2 - 0.01;
  scene.add(shadowPlane);

  /* ---------------------------------------------------------------------------
     Sizing + parallax
     ----------------------------------------------------------------------- */
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

  const pointer = { x: 0, tx: 0 };
  function onPointer(e) {
    const r = mount.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const isTouch = e.touches && e.touches[0];
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    pointer.tx = ((x - cx) / r.width) * 2;
  }
  function resetPointer() { pointer.tx = 0; }
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerleave', resetPointer, { passive: true });

  /* ---------------------------------------------------------------------------
     Pause when off-screen
     ----------------------------------------------------------------------- */
  let visible = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 }).observe(mount);
  }

  /* ---------------------------------------------------------------------------
     Animate: spin around Y, tiny parallax nudge based on mouse X
     ----------------------------------------------------------------------- */
  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dt = Math.min(0.05, clock.getDelta());

    pointer.x += (pointer.tx - pointer.x) * 0.05;

    if (!reduceMotion) {
      root.rotation.y += dt * 0.45;
    }
    // pointer nudges spin speed slightly (subtle, not draggable)
    root.rotation.y += pointer.x * 0.004;

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
