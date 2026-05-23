/* =============================================================================
   PADUA TRIANGLE 3D — Spectrum pyramid with bloom + inner emissive core
   =============================================================================
   A triangular pyramid sits flat on its base. Each side face is a methodology
   spectrum color (Discover purple, Compare pink, Recommend red) with its
   label baked in. Inside the pyramid sits a bright magenta emissive core
   which UnrealBloomPass amplifies into a radiating halo — the "light from
   inside" effect that gives the form its cube-like luminosity.

   Interactions:
     - Slow Y-axis auto-spin when idle
     - Hover any .triangle-panel__item to ease that face into a 3/4 view
     - Click anywhere on the pyramid to pulse the inner glow (light burst)

   Self-contained: imports Three.js + postprocessing addons via an importmap
   in software.html. Bloom is wrapped in try/catch so any addon failure falls
   back to plain rendering instead of breaking the scene.
   =========================================================================== */

import * as THREE from 'three';

const PADUA = {
  discover:  '#4a308c',
  compare:   '#ab2178',
  recommend: '#eb2e4d',
  review:    '#f59436',
  yellow:    '#f5d534',
  teal:      '#007282',
  ink:       '#16121f',
  paper:     '#faf8f4',
  glow:      '#ff3d8b',  // bright magenta — the inner-glow color
};

const FACE_ANGLE_OFFSET = -0.42;  // ~24° offset so hover lands a 3/4 view, not flat-on

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================================
   Helpers
   ========================================================================== */

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

function buildPyramidGeometry(baseRadius, height) {
  const half = height / 2;
  const b0 = [ baseRadius * Math.cos(0),                  -half, baseRadius * Math.sin(0) ];
  const b1 = [ baseRadius * Math.cos((2 * Math.PI) / 3),  -half, baseRadius * Math.sin((2 * Math.PI) / 3) ];
  const b2 = [ baseRadius * Math.cos((4 * Math.PI) / 3),  -half, baseRadius * Math.sin((4 * Math.PI) / 3) ];
  const ap = [ 0,                                          half, 0 ];

  // Winding CCW from outside: base_i, apex, base_{i+1}
  const positions = new Float32Array([
    ...b0, ...ap, ...b1, // side 0
    ...b1, ...ap, ...b2, // side 1
    ...b2, ...ap, ...b0, // side 2
    ...b0, ...b1, ...b2, // base (CCW from below)
  ]);

  // UVs: base_i takes u=1, base_{i+1} takes u=0 so screen orientation is
  // not mirrored. Apex stays at top-center.
  const uvs = new Float32Array([
    1, 0,   0.5, 1,   0, 0, // side 0
    1, 0,   0.5, 1,   0, 0, // side 1
    1, 0,   0.5, 1,   0, 0, // side 2
    0, 0,   1, 0,   0.5, 1, // base
  ]);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geom.computeVertexNormals();
  geom.addGroup(0, 3, 0);
  geom.addGroup(3, 3, 1);
  geom.addGroup(6, 3, 2);
  geom.addGroup(9, 3, 3);

  function face(p1, p2, p3) {
    const v1 = new THREE.Vector3(p1[0], p1[1], p1[2]);
    const v2 = new THREE.Vector3(p2[0], p2[1], p2[2]);
    const v3 = new THREE.Vector3(p3[0], p3[1], p3[2]);
    const center = new THREE.Vector3().add(v1).add(v2).add(v3).multiplyScalar(1 / 3);
    const e1 = new THREE.Vector3().subVectors(v2, v1);
    const e2 = new THREE.Vector3().subVectors(v3, v1);
    const normal = new THREE.Vector3().crossVectors(e1, e2).normalize();
    if (normal.dot(center) < 0) normal.negate();
    return { center, normal };
  }

  return {
    geom,
    sides: [
      face(b0, ap, b1),
      face(b1, ap, b2),
      face(b2, ap, b0),
    ],
  };
}

function makeFaceTexture(colorHex, text) {
  const size = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');

  // Base fill
  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, size, size);

  // Subtle procedural grain — gives the face that dusty "rendered" texture
  // we saw on the cube reference. Sparse, low-opacity speckle.
  const grainCount = 2200;
  for (let i = 0; i < grainCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 0.6 + Math.random() * 1.2;
    const v = Math.random();
    ctx.globalAlpha = 0.06 + Math.random() * 0.06;
    ctx.fillStyle = v > 0.5 ? '#ffffff' : '#000000';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Soft vignette toward the base — reads as ambient occlusion from the
  // ground shadow, anchors the visual weight.
  const vig = ctx.createLinearGradient(0, size * 0.55, 0, size);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  // Auto-fit label
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

  // Brand dot
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

function shortestDelta(from, to) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/* ============================================================================
   Main init — async because we dynamically import the bloom addons.
   ========================================================================== */

async function init() {
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
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.cursor = 'pointer';
  mount.appendChild(canvas);

  // -- scene + camera (a touch steeper than before)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 1.6, 6.2);
  camera.lookAt(0, -0.3, 0);

  try {
    scene.environment = buildEnvironment(renderer);
  } catch (err) {
    console.warn('[padua-tri3d] env build failed', err);
  }

  /* --------------------------------------------------------------------------
     Pyramid
     -------------------------------------------------------------------------- */
  const BASE_RADIUS = 1.75;
  const HEIGHT = 2.6;
  const { geom, sides } = buildPyramidGeometry(BASE_RADIUS, HEIGHT);

  // Face materials use a slight transmission so the inner glow can leak
  // through. higher roughness picks up the dusty grain.
  const makeFaceMat = (colorHex, label) => new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: makeFaceTexture(colorHex, label),
    metalness: 0.0,
    roughness: 0.55,
    transmission: 0.12,
    thickness: 0.5,
    ior: 1.45,
    clearcoat: 0.55,
    clearcoatRoughness: 0.4,
    envMapIntensity: 0.85,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const materials = [
    makeFaceMat(PADUA.discover,  'Quality'),
    makeFaceMat(PADUA.compare,   'Value'),
    makeFaceMat(PADUA.recommend, 'Turnaround'),
    new THREE.MeshStandardMaterial({ color: PADUA.ink, roughness: 0.85, metalness: 0, flatShading: true, side: THREE.DoubleSide }),
  ];

  const pyramid = new THREE.Mesh(geom, materials);

  const root = new THREE.Group();
  root.add(pyramid);
  scene.add(root);

  /* --------------------------------------------------------------------------
     Inner emissive core — this is what bloom amplifies into a halo.
     -------------------------------------------------------------------------- */
  const CORE_BASE_INTENSITY = 6.0;
  const coreGeom = new THREE.IcosahedronGeometry(0.55, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: new THREE.Color(PADUA.glow),
    emissiveIntensity: CORE_BASE_INTENSITY,
    roughness: 1,
    metalness: 0,
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  root.add(core);

  // Methodology-tinted point light at the core's position — actually
  // illuminates the inside of the faces.
  const coreLight = new THREE.PointLight(new THREE.Color(PADUA.glow), 14, 7, 1.4);
  coreLight.position.set(0, 0, 0);
  root.add(coreLight);

  /* --------------------------------------------------------------------------
     Per-face target rotations — offset by FACE_ANGLE_OFFSET so the hover
     state lands a 3/4 view instead of looking straight at the face.
     -------------------------------------------------------------------------- */
  const faceTargets = sides.map((side) =>
    Math.atan2(-side.normal.x, side.normal.z) + FACE_ANGLE_OFFSET
  );

  /* --------------------------------------------------------------------------
     External lights — a soft key + fill so the front-presenting face
     reads cleanly. Kept dim so the inner emissive carries the visual mass.
     -------------------------------------------------------------------------- */
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(2.5, 4, 3);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(-3, 1, 2);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(0xffffff, 0.22));

  /* --------------------------------------------------------------------------
     Soft contact shadow under the base.
     -------------------------------------------------------------------------- */
  const shadowCv = document.createElement('canvas');
  shadowCv.width = shadowCv.height = 256;
  const sctx = shadowCv.getContext('2d');
  const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(22,18,31,0.40)');
  grad.addColorStop(0.55, 'rgba(22,18,31,0.12)');
  grad.addColorStop(1, 'rgba(22,18,31,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 256, 256);
  const shadowTex = new THREE.CanvasTexture(shadowCv);
  shadowTex.colorSpace = THREE.SRGBColorSpace;
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 5.5),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -HEIGHT / 2 - 0.01;
  scene.add(shadowPlane);

  /* --------------------------------------------------------------------------
     EffectComposer + UnrealBloomPass — the "real" glow effect. Loaded
     dynamically and wrapped in try/catch so any addon failure falls back
     to plain rendering.
     -------------------------------------------------------------------------- */
  let composer = null;
  let bloomPass = null;
  try {
    const [
      { EffectComposer },
      { RenderPass },
      { UnrealBloomPass },
      { OutputPass },
    ] = await Promise.all([
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/postprocessing/OutputPass.js'),
    ]);
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth || 320, mount.clientHeight || 320),
      0.95,   // strength
      0.7,    // radius
      0.08    // threshold — anything brighter than this glows
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());
  } catch (err) {
    console.warn('[padua-tri3d] bloom unavailable, falling back to plain render', err);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  function resize() {
    const w = mount.clientWidth || 320;
    const h = mount.clientHeight || 320;
    renderer.setSize(w, h, false);
    if (composer) composer.setSize(w, h);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(mount);
  else window.addEventListener('resize', resize);

  /* --------------------------------------------------------------------------
     Hover-to-face panel interaction
     -------------------------------------------------------------------------- */
  let targetY = null;
  let flash = 0;

  function setActiveFace(idx) {
    targetY = (idx >= 0 && idx < faceTargets.length) ? faceTargets[idx] : null;
    document.querySelectorAll('.triangle-panel__item').forEach((el, i) => {
      el.classList.toggle('is-active', i === idx);
    });
  }
  function clearActiveFace() {
    targetY = null;
    document.querySelectorAll('.triangle-panel__item').forEach((el) => el.classList.remove('is-active'));
  }

  const items = document.querySelectorAll('.triangle-panel__item');
  items.forEach((el) => {
    const idx = parseInt(el.getAttribute('data-face'), 10);
    if (Number.isNaN(idx)) return;
    el.addEventListener('mouseenter', () => setActiveFace(idx));
    el.addEventListener('focus', () => setActiveFace(idx));
    el.addEventListener('touchstart', (e) => { e.preventDefault(); setActiveFace(idx); flash = 1.0; }, { passive: false });
  });
  const panel = document.querySelector('.triangle-panel');
  if (panel) {
    panel.addEventListener('mouseleave', clearActiveFace);
    panel.addEventListener('focusout', clearActiveFace);
  }

  /* --------------------------------------------------------------------------
     Click-on-pyramid -> burst of light
     -------------------------------------------------------------------------- */
  const raycaster = new THREE.Raycaster();
  const pointerNDC = new THREE.Vector2();

  function onPress(e) {
    const r = canvas.getBoundingClientRect();
    const isTouch = e.touches && e.touches[0];
    const x = isTouch ? e.touches[0].clientX : e.clientX;
    const y = isTouch ? e.touches[0].clientY : e.clientY;
    pointerNDC.x = ((x - r.left) / r.width) * 2 - 1;
    pointerNDC.y = -((y - r.top) / r.height) * 2 + 1;
    raycaster.setFromCamera(pointerNDC, camera);
    const hits = raycaster.intersectObject(pyramid);
    if (hits.length > 0) {
      flash = 1.0;
      const matIdx = hits[0].face && hits[0].face.materialIndex;
      if (matIdx >= 0 && matIdx < 3) setActiveFace(matIdx);
    }
  }
  canvas.addEventListener('pointerdown', onPress);

  /* --------------------------------------------------------------------------
     Visibility (pause when off-screen)
     -------------------------------------------------------------------------- */
  let visible = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 }).observe(mount);
  }

  /* --------------------------------------------------------------------------
     Animation
     -------------------------------------------------------------------------- */
  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dt = Math.min(0.05, clock.getDelta());

    // Decay the click-flash and apply it to emissive + bloom
    flash *= 0.92;
    if (flash < 0.001) flash = 0;
    coreMat.emissiveIntensity = CORE_BASE_INTENSITY * (1 + flash * 2.2);
    coreLight.intensity = 14 * (1 + flash * 2.0);
    if (bloomPass) {
      bloomPass.strength = 0.95 + flash * 0.6;
    }

    if (targetY !== null) {
      const delta = shortestDelta(root.rotation.y, targetY);
      root.rotation.y += delta * 0.12;
    } else if (!reduceMotion) {
      root.rotation.y += dt * 0.38;
    }

    // Counter-spin the core slightly for visual life
    core.rotation.y -= dt * 0.6;
    core.rotation.x += dt * 0.3;

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }
  tick();
}

function safeInit() {
  try {
    Promise.resolve(init()).catch((err) => {
      console.error('[padua-tri3d] init failed', err);
      const mount = document.getElementById('padua-tri3d');
      if (mount) showError(mount, err && err.message ? err.message : 'init failed');
    });
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
