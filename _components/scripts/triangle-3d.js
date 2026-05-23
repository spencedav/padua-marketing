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
  review:    '#f59436',

  // Cube-aesthetic palette
  faceBase:    '#1f1430',  // cool dark purple-blue base for every face
  innerGlow:   '#ff3d8b',  // hot magenta-pink inner light
  innerCore:   '#ffaadd',  // near-white pink core
  edge:        '#ff88cc',  // edge highlight color
  ink:         '#0a0612',
};

// Orb color cycle: full Padua brand spectrum (purple → pink → red → orange).
// The orb (and the inner point light) tween between adjacent colors with a
// cycle period of ~12s, then wrap.
const ORB_PALETTE = [
  new THREE.Color(PADUA.discover),
  new THREE.Color(PADUA.compare),
  new THREE.Color(PADUA.recommend),
  new THREE.Color(PADUA.review),
];
const ORB_CYCLE_PERIOD_SEC = 12;

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

/* -----------------------------------------------------------------------------
   Face texture — one big radial gradient acts as the "lightbulb projection"
   on this face, off-center per face for asymmetry, with diffuse cloudy noise
   on top instead of multiple discrete bright spots. Soft text in pink to feel
   embedded and backlit rather than painted on white.

   `lightOffsetX/Y`: where the inner light projects on this face (in 0..1).
                    Off-center values create the asymmetric-lighting feel.
   `brightness`:    overall intensity of the projected light (0..1).
                    One face gets close to 1.0, others ~0.7 → uneven lighting.
   --------------------------------------------------------------------------- */
function makeFaceTexture(spectrumHex, text, lightOffsetX = 0.5, lightOffsetY = 0.62, brightness = 0.9) {
  const size = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');

  // 1. Very dark base — almost black with a faint spectrum hue
  ctx.fillStyle = darken(spectrumHex, 0.13);
  ctx.fillRect(0, 0, size, size);

  // 2. A handful of large soft DARK regions for surface unevenness (very
  //    subtle — we don't want them competing with the inner light).
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 180 + Math.random() * 260;
    ctx.globalAlpha = 0.16 + Math.random() * 0.18;
    const blob = ctx.createRadialGradient(x, y, 0, x, y, r);
    blob.addColorStop(0, '#000000');
    blob.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = blob;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalAlpha = 1;

  // 3. THE BIG INNER LIGHT — one huge soft radial gradient covering most
  //    of the face. This is the lightbulb projecting onto the face. Off-
  //    center via lightOffsetX/Y so the light feels positioned in 3D.
  const cx = size * lightOffsetX;
  const cy = size * lightOffsetY;
  const cr = size * 0.78;
  const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
  const a0 = Math.round(255 * brightness * 0.95);
  const a1 = Math.round(255 * brightness * 0.55);
  inner.addColorStop(0,    `rgba(255, 215, 235, ${(brightness * 0.95).toFixed(2)})`);
  inner.addColorStop(0.1,  `rgba(255, 175, 215, ${(brightness * 0.85).toFixed(2)})`);
  inner.addColorStop(0.25, `${spectrumHex}${a0.toString(16).padStart(2, '0')}`);
  inner.addColorStop(0.55, `${spectrumHex}${a1.toString(16).padStart(2, '0')}`);
  inner.addColorStop(1,    `${spectrumHex}00`);
  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = inner;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = 'source-over';

  // 4. Diffuse cloudy wisps — soft, blended into the inner light. NOT discrete
  //    spots; the user noted those read as "stuck on". Lots of them, very low
  //    opacity, large radii.
  for (let i = 0; i < 24; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 120 + Math.random() * 180;
    ctx.globalAlpha = 0.04 + Math.random() * 0.07;
    const wisp = ctx.createRadialGradient(x, y, 0, x, y, r);
    const tint = Math.random();
    const wispColor = tint > 0.55 ? '#ff88cc' : (tint > 0.25 ? '#cc55aa' : '#ffaadd');
    wisp.addColorStop(0, wispColor);
    wisp.addColorStop(1, wispColor + '00');
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = wisp;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;

  // 5. Vertical surface scratches — very subtle, faint vertical streaks
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * size;
    const h = 60 + Math.random() * 220;
    const y = Math.random() * (size - h);
    const w = 0.5 + Math.random();
    ctx.globalAlpha = 0.02 + Math.random() * 0.03;
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(x, y, w, h);
  }
  ctx.globalAlpha = 1;

  // 6. Fine speckle grain
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = Math.random();
    ctx.globalAlpha = 0.05 + Math.random() * 0.08;
    ctx.fillStyle = v > 0.6 ? '#ffaadd' : (v > 0.3 ? '#ffffff' : '#000000');
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.globalAlpha = 1;

  // 7. Vignette — but darken FROM THE LIGHT CENTER, not the canvas center.
  //    This makes the edges of the face genuinely dim while keeping the
  //    bright lit area centered on the projected light.
  const vig = ctx.createRadialGradient(cx, cy, size * 0.28, cx, cy, size * 0.85);
  vig.addColorStop(0,   'rgba(0, 0, 0, 0)');
  vig.addColorStop(0.6, 'rgba(0, 0, 0, 0.30)');
  vig.addColorStop(1,   'rgba(0, 0, 0, 0.78)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  // 8. Label — Newsreader italic in Title Case. Serif italic is the brand
  //    display voice (used on h1/h2 throughout the site) and reads as
  //    editorial / refined / "stylish" rather than the previous uppercase
  //    sans-serif chip-style. Soft pink tones keep it integrated with the
  //    face surface.
  const label = text;  // Title Case as given (Quality / Value / Turnaround)
  const targetY = size * 0.79;
  const maxWidth = size * 0.78;
  let fontPx = 180;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'; // serifs prefer tight tracking
  do {
    ctx.font = `italic 400 ${fontPx}px "Newsreader", "Quincy CF", Georgia, serif`;
    if (ctx.measureText(label).width <= maxWidth) break;
    fontPx -= 8;
  } while (fontPx > 70);

  // Soft outer halo — wide, low contrast, warm pink
  ctx.shadowColor = '#ff66cc';
  ctx.shadowBlur = 70;
  ctx.fillStyle = 'rgba(255, 180, 210, 0.4)';
  ctx.fillText(label, size / 2, targetY);

  // Inner pass — pink, soft
  ctx.shadowBlur = 22;
  ctx.fillStyle = 'rgba(235, 180, 215, 0.85)';
  ctx.fillText(label, size / 2, targetY);
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

  // -- scene + camera — steeper top-down view + pulled back so the pyramid
  //    sits comfortably inside the stage (corners weren't being clipped).
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 4.4, 6.6);
  camera.lookAt(0, -0.4, 0);

  // Transparent clear so the section bg shows through the canvas
  renderer.setClearColor(0x000000, 0);

  try {
    scene.environment = buildEnvironment(renderer);
  } catch (err) {
    console.warn('[padua-tri3d] env build failed', err);
  }

  // Make sure Newsreader (italic 400) is loaded before we rasterize text
  // into the face textures — otherwise canvas falls back to generic serif.
  if (document.fonts && document.fonts.load) {
    try {
      await Promise.all([
        document.fonts.load('italic 400 180px "Newsreader"'),
        document.fonts.load('italic 400 120px "Newsreader"'),
      ]);
    } catch (e) { /* fall through to canvas's font fallback chain */ }
  }

  /* --------------------------------------------------------------------------
     Pyramid — wider base (#6 in critique): less crystal-shard, more
     tetrahedron when viewed from above.
     -------------------------------------------------------------------------- */
  const BASE_RADIUS = 2.2;
  const HEIGHT = 2.45;
  const { geom, sides } = buildPyramidGeometry(BASE_RADIUS, HEIGHT);

  // Face materials. Higher transmission lets the back-glow sprite show
  // through the form (so light feels like it's PASSING through the glass).
  // transparent: true + opacity 0.94 adds a touch more see-through on top
  // of the physical transmission effect.
  const makeFaceMat = (spectrumHex, label, lightX, lightY, brightness) => new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: makeFaceTexture(spectrumHex, label, lightX, lightY, brightness),
    metalness: 0.0,
    roughness: 0.5,
    transmission: 0.55,
    thickness: 1.1,
    ior: 1.45,
    clearcoat: 0.55,
    clearcoatRoughness: 0.35,
    sheen: 0.6,
    sheenRoughness: 0.55,
    sheenColor: new THREE.Color(PADUA.edge),
    envMapIntensity: 0.6,
    flatShading: true,
    transparent: true,
    opacity: 0.94,
    side: THREE.DoubleSide,
  });

  // Uniform brightness across faces — face-to-face asymmetry now comes from
  // real 3D lighting (the key DirectionalLight below), not from baked texture
  // differences. This way the brightest face is always the one facing the
  // camera, regardless of which face that is at a given rotation. The
  // lightOffset still varies a bit for "the inner light is positioned in
  // 3D, not at face center" feel.
  const materials = [
    makeFaceMat(PADUA.discover,  'Quality',    0.50, 0.62, 1.0),
    makeFaceMat(PADUA.compare,   'Value',      0.46, 0.60, 1.0),
    makeFaceMat(PADUA.recommend, 'Turnaround', 0.54, 0.60, 1.0),
    new THREE.MeshStandardMaterial({ color: PADUA.ink, roughness: 0.95, metalness: 0, flatShading: true, side: THREE.DoubleSide }),
  ];

  const pyramid = new THREE.Mesh(geom, materials);

  const root = new THREE.Group();
  root.add(pyramid);
  scene.add(root);

  // Edge lines — toned down so the inner orb is clearly THE light source,
  // not the silhouette. Faint pink rim, just enough to define the facets.
  const edgeGeom = new THREE.EdgesGeometry(geom, 1);
  const edgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PADUA.edge),
    transparent: true,
    opacity: 0.22,
  });
  const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
  pyramid.add(edgeLines);

  /* --------------------------------------------------------------------------
     INNER ORB — the light source inside the form. A camera-facing Sprite
     with a tight bright-white core fading through magenta. Rendered before
     the pyramid (renderOrder -1, depthTest off) so the pyramid faces sit
     in front of it; the faces' transmission picks up the orb color and
     makes the light feel like it's emanating from within.
     -------------------------------------------------------------------------- */
  const orbCv = document.createElement('canvas');
  orbCv.width = orbCv.height = 256;
  const octx = orbCv.getContext('2d');
  const orbGrad = octx.createRadialGradient(128, 128, 0, 128, 128, 128);
  orbGrad.addColorStop(0,    'rgba(255, 255, 255, 1.0)');
  orbGrad.addColorStop(0.06, 'rgba(255, 230, 245, 0.95)');
  orbGrad.addColorStop(0.18, 'rgba(255, 130, 195, 0.80)');
  orbGrad.addColorStop(0.40, 'rgba(255, 61, 139, 0.50)');
  orbGrad.addColorStop(0.75, 'rgba(170, 60, 180, 0.18)');
  orbGrad.addColorStop(1,    'rgba(74, 48, 140, 0)');
  octx.fillStyle = orbGrad;
  octx.fillRect(0, 0, 256, 256);
  const orbTex = new THREE.CanvasTexture(orbCv);
  orbTex.colorSpace = THREE.SRGBColorSpace;

  const orb = new THREE.Sprite(new THREE.SpriteMaterial({
    map: orbTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  }));
  orb.scale.set(1.4, 1.4, 1);
  orb.position.set(0, 0, 0); // inside the pyramid at geometric center
  orb.renderOrder = -1; // draw before pyramid so the transmissive faces overlay
  root.add(orb);

  // (no cloud mesh — it was reading as a visible sphere inside the form.
  //  The bloom + emissive core + baked face wisps carry the "glow from
  //  within" feel without showing a discrete inner object.)

  /* --------------------------------------------------------------------------
     Inner emissive core — VERY small + VERY bright. Reads as a point source
     of light rather than a visible sphere inside the form. The bloom turns
     it into a diffuse halo. Sits inside the geometry where faces hide its
     literal shape; only its LIGHT bleeds through.
     -------------------------------------------------------------------------- */
  // No visible inner mesh — the user saw the small icosahedron as a "dot"
  // showing through the glass. The inner-glow effect is now done entirely
  // through the concentrated bright spot baked into each face's canvas
  // texture, plus a point light that illuminates the faces from inside.
  const coreLight = new THREE.PointLight(new THREE.Color(PADUA.innerGlow), 30, 8, 1.5);
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
     External lights. Key light is now PROMINENT (intensity 2.8) and aimed
     from the camera's general direction so the face facing the camera is
     significantly brighter than the side faces — view-dependent contrast
     instead of baked-into-textures. As the pyramid rotates or hovers a
     face into view, that face naturally becomes the bright one.
     -------------------------------------------------------------------------- */
  const key = new THREE.DirectionalLight(0xffffff, 2.8);
  key.position.set(0.8, 4.0, 5.5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(new THREE.Color('#8855dd'), 0.25);
  fill.position.set(-3, 1, 2);
  scene.add(fill);

  scene.add(new THREE.AmbientLight(new THREE.Color('#1a0e2a'), 0.5));

  // (No back-glow sprite — it was creating a pink fog around the panel,
  //  making the pyramid look "stuck in a pink box". The CSS drop-shadow
  //  filter on the canvas provides the soft halo around the silhouette
  //  without flooding the surrounding area.)

  /* --------------------------------------------------------------------------
     No bloom postprocessing — UnrealBloomPass corrupts canvas alpha which
     produces a visible dark rectangle ("box") around the pyramid. Instead we
     use a CSS filter: drop-shadow on the canvas element (see CSS in
     software.html). Drop-shadow follows the alpha-defined pyramid silhouette
     rather than the canvas rectangle, so the halo appears around the form
     itself and the canvas is fully transparent everywhere else.
     -------------------------------------------------------------------------- */
  const composer = null;
  const bloomPass = null;

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
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
     Animation (always runs — removed IntersectionObserver because it was
     occasionally getting stuck in the not-visible state on this layout).
     -------------------------------------------------------------------------- */
  const clock = new THREE.Clock();
  const orbCyclingColor = new THREE.Color();
  function tick() {
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, clock.getDelta());

    // Orb spectrum cycle (Padua brand: discover → compare → recommend → review → wrap)
    const cyclePos = (clock.elapsedTime % ORB_CYCLE_PERIOD_SEC) / ORB_CYCLE_PERIOD_SEC * ORB_PALETTE.length;
    const cIdx = Math.floor(cyclePos) % ORB_PALETTE.length;
    const cNext = (cIdx + 1) % ORB_PALETTE.length;
    const cLocal = cyclePos - Math.floor(cyclePos);
    orbCyclingColor.copy(ORB_PALETTE[cIdx]).lerp(ORB_PALETTE[cNext], cLocal);
    orb.material.color.copy(orbCyclingColor);
    coreLight.color.copy(orbCyclingColor);

    // Decay the click-flash and apply it to the point light
    flash *= 0.92;
    if (flash < 0.001) flash = 0;
    const breathe = !reduceMotion ? (Math.sin(clock.elapsedTime * 1.2) * 0.08 + 1) : 1;
    coreLight.intensity = 30 * breathe * (1 + flash * 1.6);

    if (targetY !== null) {
      const delta = shortestDelta(root.rotation.y, targetY);
      root.rotation.y += delta * 0.12;
    } else if (!reduceMotion) {
      root.rotation.y += dt * 0.38;
    }

    // (no core mesh to counter-spin anymore)

    renderer.render(scene, camera);
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
