/* =============================================================================
   PADUA TRIANGLE 3D — solid spectrum pyramid with hover-to-face interaction
   =============================================================================
   A triangular pyramid sits flat on its base. Each of the 3 side faces is
   painted in one of the methodology spectrum colors (Discover purple, Compare
   pink, Recommend red). The base is dark ink.

   Default behavior: slow Y-axis spin so all three faces cycle into view.
   Interaction: hover any item in the linked side panel (matched by
   [data-face="0|1|2"]) and the pyramid eases to present that face to the
   camera. Mouse leave returns to autospin.

   Self-contained: no importmap, no Three.js addons.
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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -----------------------------------------------------------------------------
   Small studio-IBL environment from a 6-face cube of canvas swatches.
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
   Build a triangular pyramid centered vertically on origin. Returns geometry
   + per-side face data (center + normal in local coords).
   --------------------------------------------------------------------------- */
function buildPyramidGeometry(baseRadius, height) {
  const half = height / 2;
  const b0 = [ baseRadius * Math.cos(0),                  -half, baseRadius * Math.sin(0) ];
  const b1 = [ baseRadius * Math.cos((2 * Math.PI) / 3),  -half, baseRadius * Math.sin((2 * Math.PI) / 3) ];
  const b2 = [ baseRadius * Math.cos((4 * Math.PI) / 3),  -half, baseRadius * Math.sin((4 * Math.PI) / 3) ];
  const ap = [ 0,                                          half, 0 ];

  // Winding order matters: vertex order is CCW when viewed from OUTSIDE the
  // pyramid, so the visible side is Three.js's "front face" and the texture
  // maps in normal (non-mirrored) orientation. Wrong winding here = text
  // appears mirrored on the faces. Order is: base_i, apex, base_{i+1}.
  const positions = new Float32Array([
    ...b0, ...ap, ...b1, // side 0 (between b0 and b1)
    ...b1, ...ap, ...b2, // side 1 (between b1 and b2)
    ...b2, ...ap, ...b0, // side 2 (between b2 and b0)
    ...b0, ...b1, ...b2, // base (outward = -Y; CCW viewed from below)
  ]);

  // UVs aligned to the position order above. Note the U values: when each
  // face is presented to the camera, base_i ends up on screen-RIGHT and
  // base_{i+1} on screen-LEFT. To keep the canvas left→right reading on
  // screen left→right (not mirrored), base_i takes u=1 and base_{i+1} takes
  // u=0. The apex stays centered at u=0.5.
  const uvs = new Float32Array([
    1, 0,   0.5, 1,   0, 0, // side 0
    1, 0,   0.5, 1,   0, 0, // side 1
    1, 0,   0.5, 1,   0, 0, // side 2
    0, 0,   1, 0,    0.5, 1, // base (unused — base material has no map)
  ]);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geom.computeVertexNormals();

  // Material groups: each side gets its own material index; base is index 3
  geom.addGroup(0, 3, 0);
  geom.addGroup(3, 3, 1);
  geom.addGroup(6, 3, 2);
  geom.addGroup(9, 3, 3);

  // Compute per-side face center + outward normal (used for hover targeting).
  // Forces the normal outward by flipping it if it points back toward the
  // pyramid centroid at origin.
  function face(p1, p2, p3) {
    const v1 = new THREE.Vector3(p1[0], p1[1], p1[2]);
    const v2 = new THREE.Vector3(p2[0], p2[1], p2[2]);
    const v3 = new THREE.Vector3(p3[0], p3[1], p3[2]);
    const center = new THREE.Vector3().add(v1).add(v2).add(v3).multiplyScalar(1 / 3);
    const e1 = new THREE.Vector3().subVectors(v2, v1);
    const e2 = new THREE.Vector3().subVectors(v3, v1);
    const normal = new THREE.Vector3().crossVectors(e1, e2).normalize();
    // Ensure normal points outward (same hemisphere as face center)
    if (normal.dot(center) < 0) normal.negate();
    return { center, normal };
  }

  const sides = [
    face(b0, ap, b1),
    face(b1, ap, b2),
    face(b2, ap, b0),
  ];

  return { geom, sides };
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

/* -----------------------------------------------------------------------------
   Wrap angular delta into shortest path through [-PI, PI].
   --------------------------------------------------------------------------- */
function shortestDelta(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

function init() {
  const mount = document.getElementById('padua-tri3d');
  if (!mount) return;

  if (typeof THREE === 'undefined' || !THREE.WebGLRenderer) {
    showError(mount, 'three.js failed to load');
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    showError(mount, 'WebGL not available');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  mount.appendChild(canvas);

  // -- scene + camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 1.5, 6.4);
  camera.lookAt(0, -0.2, 0);

  try {
    scene.environment = buildEnvironment(renderer);
  } catch (err) {
    console.warn('[padua-tri3d] env build failed', err);
  }

  // -- pyramid
  const BASE_RADIUS = 1.75;
  const HEIGHT = 2.6;
  const { geom, sides } = buildPyramidGeometry(BASE_RADIUS, HEIGHT);

  /* -----------------------------------------------------------------------
     Paint a face texture: methodology-color background + uppercase white
     label drawn near the canvas's bottom-center, where the visible triangle
     lives in UV space. Returns a CanvasTexture.
     --------------------------------------------------------------------- */
  function makeFaceTexture(colorHex, text) {
    const size = 1024;
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d');

    // Solid face color, no inner highlight — cleaner read.
    ctx.fillStyle = colorHex;
    ctx.fillRect(0, 0, size, size);

    // Auto-fit text near the base of the triangle. The UV triangle has
    // width = (1 - v); at canvas y ≈ 0.84 (v ≈ 0.16) the triangle is ~84%
    // of the canvas wide, so the label can be big and still safely fit.
    const upper = text.toUpperCase();
    const targetY = size * 0.82;
    const maxWidth = size * 0.78;
    let fontPx = 140;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '4px';
    do {
      ctx.font = `600 ${fontPx}px "Geist", "Inter", system-ui, -apple-system, sans-serif`;
      if (ctx.measureText(upper).width <= maxWidth) break;
      fontPx -= 6;
    } while (fontPx > 60);
    ctx.fillText(upper, size / 2, targetY);

    // Brand dot above the label
    const dotR = 11;
    ctx.beginPath();
    ctx.arc(size / 2, targetY - fontPx - 32, dotR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fill();

    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }

  // 4 materials — 3 spectrum side faces (each a colored canvas texture with
  // its label baked in) + 1 ink base. DoubleSide guards winding order.
  const makeFaceMat = (colorHex, label) => new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: makeFaceTexture(colorHex, label),
    metalness: 0.0,
    roughness: 0.32,
    clearcoat: 0.7,
    clearcoatRoughness: 0.16,
    envMapIntensity: 0.85,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const materials = [
    makeFaceMat(PADUA.discover,  'Quality'),
    makeFaceMat(PADUA.compare,   'Value'),
    makeFaceMat(PADUA.recommend, 'Turnaround'),
    new THREE.MeshStandardMaterial({ color: PADUA.ink, roughness: 0.8, metalness: 0, flatShading: true, side: THREE.DoubleSide }),
  ];

  const pyramid = new THREE.Mesh(geom, materials);

  const root = new THREE.Group();
  root.add(pyramid);
  scene.add(root);

  // -- per-face target rotations: rotate root.y so this face's outward normal -> +Z (toward camera).
  // After rotateY(θ), local (nx, _, nz) becomes (nx cosθ + nz sinθ, _, -nx sinθ + nz cosθ).
  // Set the new X to zero and require new Z > 0 → θ = atan2(-nx, nz).
  const faceTargets = sides.map((side) => Math.atan2(-side.normal.x, side.normal.z));

  // -- lights
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 4, 3);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.5);
  fill.position.set(-3, 1, 2);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  // Subtle methodology rim lights — low intensity, just for reflections
  [PADUA.discover, PADUA.compare, PADUA.recommend].forEach((hex, i) => {
    const angle = (i / 3) * Math.PI * 2;
    const light = new THREE.PointLight(new THREE.Color(hex), 6, 8, 1.6);
    light.position.set(Math.cos(angle) * 3.0, 2.0, Math.sin(angle) * 3.0);
    scene.add(light);
  });

  // -- soft contact shadow under base
  const shadowCv = document.createElement('canvas');
  shadowCv.width = shadowCv.height = 256;
  const sctx = shadowCv.getContext('2d');
  const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(22,18,31,0.32)');
  grad.addColorStop(0.6, 'rgba(22,18,31,0.10)');
  grad.addColorStop(1, 'rgba(22,18,31,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 256, 256);
  const shadowTex = new THREE.CanvasTexture(shadowCv);
  shadowTex.colorSpace = THREE.SRGBColorSpace;
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -HEIGHT / 2 - 0.01;
  scene.add(shadowPlane);

  // -- sizing
  function resize() {
    const w = mount.clientWidth || 320;
    const h = mount.clientHeight || 320;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(mount);
  else window.addEventListener('resize', resize);

  // -- pause when off-screen
  let visible = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 }).observe(mount);
  }

  /* ---------------------------------------------------------------------------
     Hover-to-face: bind to .triangle-panel__item elements with data-face index
     ----------------------------------------------------------------------- */
  let targetY = null; // null = autospin, otherwise lock toward this angle
  let activeFaceIndex = -1;

  function setActiveFace(idx) {
    activeFaceIndex = idx;
    targetY = (idx >= 0 && idx < faceTargets.length) ? faceTargets[idx] : null;
    document.querySelectorAll('.triangle-panel__item').forEach((el, i) => {
      el.classList.toggle('is-active', i === idx);
    });
  }

  function clearActiveFace() {
    activeFaceIndex = -1;
    targetY = null;
    document.querySelectorAll('.triangle-panel__item').forEach((el) => el.classList.remove('is-active'));
  }

  const items = document.querySelectorAll('.triangle-panel__item');
  items.forEach((el) => {
    const idx = parseInt(el.getAttribute('data-face'), 10);
    if (Number.isNaN(idx)) return;
    el.addEventListener('mouseenter', () => setActiveFace(idx));
    el.addEventListener('focus', () => setActiveFace(idx));
    el.addEventListener('touchstart', (e) => { e.preventDefault(); setActiveFace(idx); }, { passive: false });
  });
  const panel = document.querySelector('.triangle-panel');
  if (panel) {
    panel.addEventListener('mouseleave', clearActiveFace);
    panel.addEventListener('focusout', clearActiveFace);
  }

  /* ---------------------------------------------------------------------------
     Animate
     ----------------------------------------------------------------------- */
  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dt = Math.min(0.05, clock.getDelta());

    if (targetY !== null) {
      const delta = shortestDelta(root.rotation.y, targetY);
      root.rotation.y += delta * 0.12;
    } else if (!reduceMotion) {
      root.rotation.y += dt * 0.4;
    }

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
