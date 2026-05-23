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
  // Methodology accents (still used by the inner light per-face if desired)
  discover:  '#4a308c',
  compare:   '#ab2178',
  recommend: '#eb2e4d',

  // Cube-aesthetic palette
  faceBase:    '#1f1430',  // cool dark purple-blue base for every face
  innerGlow:   '#ff3d8b',  // hot magenta-pink inner light
  innerCore:   '#ffaadd',  // near-white pink core
  edge:        '#ff88cc',  // edge highlight color
  ink:         '#0a0612',
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

/* -----------------------------------------------------------------------------
   Mix a hex color toward black to create a darker base for each face.
   --------------------------------------------------------------------------- */
function darken(hex, factor = 0.45) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const rd = Math.round(r * factor);
  const gd = Math.round(g * factor);
  const bd = Math.round(b * factor);
  return `rgb(${rd}, ${gd}, ${bd})`;
}

function makeFaceTexture(spectrumHex, text) {
  const size = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');

  // 1. Deep, cool-shifted base — face's spectrum color darkened toward black
  //    so the bright bits (glow, label) read against a near-dark surface.
  ctx.fillStyle = darken(spectrumHex, 0.32);
  ctx.fillRect(0, 0, size, size);

  // 2. Inner glow bleed-through — radial gradient in the face's spectrum
  //    color, brightest at the inner center. Reads as light pushing through
  //    from inside the form.
  const glow = ctx.createRadialGradient(size / 2, size * 0.55, 0, size / 2, size * 0.55, size * 0.55);
  glow.addColorStop(0, `${spectrumHex}cc`);  // ~80% alpha at center
  glow.addColorStop(0.4, `${spectrumHex}55`); // ~33% mid
  glow.addColorStop(1, `${spectrumHex}00`);   // 0% edge
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // 3. Cloudy wisps — soft blobs at random positions, tinted toward the
  //    face's spectrum color but with a hint of pink for warmth.
  for (let i = 0; i < 22; i++) {
    const x = Math.random() * size;
    const y = size * 0.3 + Math.random() * size * 0.55;
    const r = 60 + Math.random() * 110;
    ctx.globalAlpha = 0.05 + Math.random() * 0.07;
    const wisp = ctx.createRadialGradient(x, y, 0, x, y, r);
    wisp.addColorStop(0, '#ff66cc');
    wisp.addColorStop(1, 'rgba(255, 102, 204, 0)');
    ctx.fillStyle = wisp;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalAlpha = 1;

  // 4. Fine grain — dusty texture
  const grainCount = 2500;
  for (let i = 0; i < grainCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 0.5 + Math.random() * 1.1;
    const v = Math.random();
    ctx.globalAlpha = 0.05 + Math.random() * 0.06;
    ctx.fillStyle = v > 0.6 ? '#ffaadd' : (v > 0.3 ? '#ffffff' : '#000000');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // 5. Bottom vignette — ambient occlusion at the base
  const vig = ctx.createLinearGradient(0, size * 0.5, 0, size);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.38)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  // 6. Top edge highlight — faint specular along the apex
  const topHi = ctx.createLinearGradient(0, 0, 0, size * 0.3);
  topHi.addColorStop(0, 'rgba(255, 170, 220, 0.16)');
  topHi.addColorStop(1, 'rgba(255, 170, 220, 0)');
  ctx.fillStyle = topHi;
  ctx.fillRect(0, 0, size, size);

  // 7. Label — glowing, like backlit from inside
  const upper = text.toUpperCase();
  const targetY = size * 0.78;
  const maxWidth = size * 0.78;
  let fontPx = 150;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '5px';
  do {
    ctx.font = `400 ${fontPx}px "Geist", "Inter", system-ui, -apple-system, sans-serif`;
    if (ctx.measureText(upper).width <= maxWidth) break;
    fontPx -= 6;
  } while (fontPx > 60);

  // Outer soft glow pass — broad blur
  ctx.shadowColor = '#ff66cc';
  ctx.shadowBlur = 40;
  ctx.fillStyle = 'rgba(255, 200, 230, 0.55)';
  ctx.fillText(upper, size / 2, targetY);

  // Inner brighter pass — tighter blur
  ctx.shadowBlur = 16;
  ctx.fillStyle = 'rgba(255, 240, 250, 0.95)';
  ctx.fillText(upper, size / 2, targetY);
  ctx.shadowBlur = 0;

  // Brand dot
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(size / 2, targetY - fontPx - 30, 11, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();
  ctx.shadowBlur = 0;

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/* -----------------------------------------------------------------------------
   Build a cloudy noise canvas for the rotating interior wisp mesh.
   --------------------------------------------------------------------------- */
function makeCloudTexture() {
  const size = 512;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  // Many soft magenta blobs at varying scale
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 30 + Math.random() * 110;
    ctx.globalAlpha = 0.06 + Math.random() * 0.10;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    const tint = Math.random();
    const color = tint > 0.6 ? '#ffaadd' : (tint > 0.3 ? '#ff66cc' : '#aa66ee');
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(255, 102, 204, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
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

  // -- scene + camera — steeper top-down view, more "looking down at it" like the cube ref
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 3.8, 5.6);
  camera.lookAt(0, -0.4, 0);

  // Transparent clear so the section bg shows through the canvas
  renderer.setClearColor(0x000000, 0);

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

  // Face materials: each face's spectrum color baked into its texture
  // (including dark base, inner glow, wisps, grain, label). Transmission +
  // sheen give the glass-with-rim look. flatShading keeps facet edges crisp.
  const makeFaceMat = (spectrumHex, label) => new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: makeFaceTexture(spectrumHex, label),
    metalness: 0.0,
    roughness: 0.45,
    transmission: 0.30,
    thickness: 0.9,
    ior: 1.45,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    sheen: 0.8,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color(PADUA.edge),
    envMapIntensity: 0.7,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const materials = [
    makeFaceMat(PADUA.discover,  'Quality'),
    makeFaceMat(PADUA.compare,   'Value'),
    makeFaceMat(PADUA.recommend, 'Turnaround'),
    new THREE.MeshStandardMaterial({ color: PADUA.ink, roughness: 0.95, metalness: 0, flatShading: true, side: THREE.DoubleSide }),
  ];

  const pyramid = new THREE.Mesh(geom, materials);

  const root = new THREE.Group();
  root.add(pyramid);
  scene.add(root);

  // Edge lines — luminous boundaries along face seams. Bloom amplifies them.
  const edgeGeom = new THREE.EdgesGeometry(geom, 1);
  const edgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PADUA.edge),
    transparent: true,
    opacity: 0.6,
  });
  const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
  pyramid.add(edgeLines);

  // (no cloud mesh — it was reading as a visible sphere inside the form.
  //  The bloom + emissive core + baked face wisps carry the "glow from
  //  within" feel without showing a discrete inner object.)

  /* --------------------------------------------------------------------------
     Inner emissive core — VERY small + VERY bright. Reads as a point source
     of light rather than a visible sphere inside the form. The bloom turns
     it into a diffuse halo. Sits inside the geometry where faces hide its
     literal shape; only its LIGHT bleeds through.
     -------------------------------------------------------------------------- */
  const CORE_BASE_INTENSITY = 16.0;
  const coreGeom = new THREE.IcosahedronGeometry(0.14, 3);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: new THREE.Color(PADUA.innerCore),
    emissiveIntensity: CORE_BASE_INTENSITY,
    roughness: 1,
    metalness: 0,
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  root.add(core);

  // Point light at the core — illuminates the inside of the faces.
  const coreLight = new THREE.PointLight(new THREE.Color(PADUA.innerGlow), 26, 7, 1.6);
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
     External lights — kept very dim. The inner emissive is the primary
     light source; these only add a touch of definition.
     -------------------------------------------------------------------------- */
  const key = new THREE.DirectionalLight(0xffffff, 0.4);
  key.position.set(2.5, 4, 3);
  scene.add(key);

  const fill = new THREE.DirectionalLight(new THREE.Color('#8855dd'), 0.18);
  fill.position.set(-3, 1, 2);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(new THREE.Color('#3a2851'), 0.4));

  /* --------------------------------------------------------------------------
     Ground falloff — magenta-tinted glow under the base (the inner light
     spills onto the floor). Not a hard shadow, just an ambient warm pool.
     -------------------------------------------------------------------------- */
  const shadowCv = document.createElement('canvas');
  shadowCv.width = shadowCv.height = 256;
  const sctx = shadowCv.getContext('2d');
  const grad = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255, 61, 139, 0.30)');
  grad.addColorStop(0.4, 'rgba(255, 61, 139, 0.10)');
  grad.addColorStop(1, 'rgba(255, 61, 139, 0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 256, 256);
  const shadowTex = new THREE.CanvasTexture(shadowCv);
  shadowTex.colorSpace = THREE.SRGBColorSpace;
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
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
    // RGBAFormat + HalfFloatType render target preserves alpha through the
    // bloom pipeline, so the section bg shows through where the pyramid isn't.
    const rt = new THREE.WebGLRenderTarget(
      mount.clientWidth || 320,
      mount.clientHeight || 320,
      {
        type: THREE.HalfFloatType,
        format: THREE.RGBAFormat,
        colorSpace: THREE.LinearSRGBColorSpace,
      }
    );
    composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth || 320, mount.clientHeight || 320),
      0.6,    // strength — lower because the dark bg already amplifies perceived brightness
      0.85,   // radius — wider spread for that hazy halo
      0.25    // threshold — only the bright bits (core, edges, text glow) bloom
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
    const breathe = !reduceMotion ? (Math.sin(clock.elapsedTime * 1.2) * 0.08 + 1) : 1;
    coreMat.emissiveIntensity = CORE_BASE_INTENSITY * breathe * (1 + flash * 1.8);
    coreLight.intensity = 22 * breathe * (1 + flash * 1.6);
    if (bloomPass) {
      bloomPass.strength = 0.6 * breathe + flash * 0.5;
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
