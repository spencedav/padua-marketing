/* =============================================================================
   PADUA TRIANGLE 3D — DolphinIQ-style emission shader port
   =============================================================================
   Approach inspired by https://github.com/DolphinIQ/Pyramid-Scene
   We inject an animated noise-driven emission term into MeshPhysicalMaterial's
   fragment shader via onBeforeCompile. The noise is sampled from two
   procedurally-generated textures (perlin-ish and voronoi-ish), mixed with
   time, color-ramped, and added as emissive light. Combined with
   UnrealBloomPass this produces the volumetric "glowing form" look — the
   form's surface emits light from within, bloomed into a halo.

   Faces still carry per-face labels (Newsreader italic) baked into canvas
   textures, so the labels glow as part of the surface emission.

   Box-free: renderer uses alpha:false with clearColor matching the section
   bg, so the canvas reads as continuous with the surrounding dark space.
   =========================================================================== */

import * as THREE from 'three';

const PADUA = {
  discover:  '#4a308c',
  compare:   '#ab2178',
  recommend: '#eb2e4d',
  review:    '#f59436',
  faceBase:  '#1f1430',
  edge:      '#ff88cc',
  ink:       '#0a0612',
};

const SECTION_BG = new THREE.Color('#0a0612');

const ORB_PALETTE = [
  new THREE.Color(PADUA.discover),
  new THREE.Color(PADUA.compare),
  new THREE.Color(PADUA.recommend),
  new THREE.Color(PADUA.review),
];
const ORB_CYCLE_PERIOD_SEC = 12;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================================
   Procedural noise textures (we don't bundle 3rd-party images)
   ========================================================================== */

function makeOrganicNoise(size = 256, octaves = 4) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  for (let o = 0; o < octaves; o++) {
    const blockSize = Math.max(2, Math.floor(size / Math.pow(2, o + 2)));
    const opacity = 0.55 / (o + 1);

    const temp = document.createElement('canvas');
    temp.width = temp.height = size;
    const tctx = temp.getContext('2d');

    for (let y = 0; y < size; y += blockSize) {
      for (let x = 0; x < size; x += blockSize) {
        const v = Math.floor(Math.random() * 255);
        tctx.fillStyle = `rgba(${v},${v},${v},${opacity.toFixed(3)})`;
        tctx.fillRect(x, y, blockSize, blockSize);
      }
    }

    const blurred = document.createElement('canvas');
    blurred.width = blurred.height = size;
    const bctx = blurred.getContext('2d');
    bctx.filter = `blur(${Math.max(1, blockSize / 4)}px)`;
    bctx.drawImage(temp, 0, 0);

    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(blurred, 0, 0);
  }
  ctx.globalCompositeOperation = 'source-over';

  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeCellularNoise(size = 256, dotCount = 28, blurPx = 22) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  // Tile by replicating dots into 3x3 (so blur wraps cleanly)
  const points = [];
  for (let i = 0; i < dotCount; i++) {
    points.push({ x: Math.random() * size, y: Math.random() * size, v: Math.random() });
  }
  for (const p of points) {
    for (const dx of [-size, 0, size]) {
      for (const dy of [-size, 0, size]) {
        const r = 10 + Math.random() * 30;
        const grad = ctx.createRadialGradient(p.x + dx, p.y + dy, 0, p.x + dx, p.y + dy, r);
        const a = (0.6 + p.v * 0.4).toFixed(3);
        grad.addColorStop(0, `rgba(255,255,255,${a})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
      }
    }
  }

  const blurred = document.createElement('canvas');
  blurred.width = blurred.height = size;
  const bctx = blurred.getContext('2d');
  bctx.filter = `blur(${blurPx}px)`;
  bctx.drawImage(cv, 0, 0);

  const tex = new THREE.CanvasTexture(blurred);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeSoftParticleTexture(size = 256) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');
  const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  grad.addColorStop(0,    'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.18, 'rgba(255, 230, 245, 0.55)');
  grad.addColorStop(0.45, 'rgba(255, 105, 180, 0.20)');
  grad.addColorStop(1,    'rgba(74, 48, 140, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ============================================================================
   Geometry — triangular pyramid sitting on its base
   ========================================================================== */

function buildPyramidGeometry(baseRadius, height) {
  const half = height / 2;
  const b0 = [ baseRadius * Math.cos(0),                  -half, baseRadius * Math.sin(0) ];
  const b1 = [ baseRadius * Math.cos((2 * Math.PI) / 3),  -half, baseRadius * Math.sin((2 * Math.PI) / 3) ];
  const b2 = [ baseRadius * Math.cos((4 * Math.PI) / 3),  -half, baseRadius * Math.sin((4 * Math.PI) / 3) ];
  const ap = [ 0,                                          half, 0 ];

  const positions = new Float32Array([
    ...b0, ...ap, ...b1, // side 0
    ...b1, ...ap, ...b2, // side 1
    ...b2, ...ap, ...b0, // side 2
    ...b0, ...b1, ...b2, // base
  ]);

  const uvs = new Float32Array([
    1, 0,   0.5, 1,   0, 0,
    1, 0,   0.5, 1,   0, 0,
    1, 0,   0.5, 1,   0, 0,
    0, 0,   1, 0,    0.5, 1,
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
    sides: [ face(b0, ap, b1), face(b1, ap, b2), face(b2, ap, b0) ],
  };
}

/* ============================================================================
   Face label texture — dark base + Newsreader italic label (no glow here;
   the shader injection handles the emission)
   ========================================================================== */

function darken(hex, factor) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r*factor)}, ${Math.round(g*factor)}, ${Math.round(b*factor)})`;
}

function makeFaceTexture(spectrumHex, text) {
  const size = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d');

  // Deep dark base
  ctx.fillStyle = darken(spectrumHex, 0.15);
  ctx.fillRect(0, 0, size, size);

  // Subtle vertical streaks for surface character
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const h = 60 + Math.random() * 220;
    const y = Math.random() * (size - h);
    const w = 0.5 + Math.random();
    ctx.globalAlpha = 0.02 + Math.random() * 0.03;
    ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
    ctx.fillRect(x, y, w, h);
  }
  ctx.globalAlpha = 1;

  // Fine grain
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = Math.random();
    ctx.globalAlpha = 0.04 + Math.random() * 0.06;
    ctx.fillStyle = v > 0.6 ? '#ffaadd' : (v > 0.3 ? '#ffffff' : '#000000');
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.globalAlpha = 1;

  // Label — Newsreader italic, soft pink-tinted, embedded
  const targetY = size * 0.78;
  const maxWidth = size * 0.78;
  let fontPx = 180;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  do {
    ctx.font = `italic 400 ${fontPx}px "Newsreader", "Quincy CF", Georgia, serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    fontPx -= 8;
  } while (fontPx > 70);

  ctx.shadowColor = '#ff66cc';
  ctx.shadowBlur = 70;
  ctx.fillStyle = 'rgba(255, 180, 210, 0.4)';
  ctx.fillText(text, size / 2, targetY);

  ctx.shadowBlur = 22;
  ctx.fillStyle = 'rgba(235, 180, 215, 0.85)';
  ctx.fillText(text, size / 2, targetY);
  ctx.shadowBlur = 0;

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
   Main init
   ========================================================================== */

async function init() {
  const mount = document.getElementById('padua-tri3d');
  if (!mount) return;

  if (typeof THREE === 'undefined' || !THREE.WebGLRenderer) {
    showError(mount, 'three.js failed to load');
    return;
  }

  // Transparent canvas — direct rendering, no postprocessing, so alpha is
  // preserved exactly as the materials write it. The pyramid's faces are
  // opaque (alpha=1), everything outside them is clear (alpha=0). Section
  // background shows through the transparent areas.
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: 'high-performance' });
  } catch (err) {
    showError(mount, 'WebGL not available');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3; // a bit hotter since we no longer have bloom amplification
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0); // fully transparent

  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.cursor = 'pointer';
  mount.appendChild(canvas);

  const scene = new THREE.Scene();
  // scene.background intentionally left unset → renderer's transparent clear takes effect
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 4.4, 6.6);
  camera.lookAt(0, -0.4, 0);

  // Wait for Newsreader before rasterizing labels
  if (document.fonts && document.fonts.load) {
    try { await document.fonts.load('italic 400 180px "Newsreader"'); } catch (e) {}
  }

  // Procedural noise textures for the emission shader
  const noisePerlin   = makeOrganicNoise(256, 4);
  const noiseCellular = makeCellularNoise(256, 28, 22);

  /* --------------------------------------------------------------------------
     Pyramid + DolphinIQ-style emission injection
     -------------------------------------------------------------------------- */
  const BASE_RADIUS = 2.2;
  const HEIGHT = 2.45;
  const { geom, sides } = buildPyramidGeometry(BASE_RADIUS, HEIGHT);

  // Shared uniforms instance — all face materials use the SAME uniforms so a
  // single update per frame drives uTime/uEmissive across all of them.
  const sharedEmissionUniforms = {
    uTime:          { value: 0 },
    uNoisePerlin:   { value: noisePerlin },
    uNoiseCellular: { value: noiseCellular },
    uTxtMix:        { value: 0.5 },
    uEmissionMin:   { value: 0.35 }, // color ramp lower edge
    uEmissionMax:   { value: 0.75 }, // color ramp upper edge
    uEmissionColor: { value: new THREE.Color(PADUA.compare) }, // cycles
    uEmissionStrength: { value: 4.5 }, // multiplier on the color ramp result
  };

  const allFaceMaterials = [];

  const makeFaceMat = (spectrumHex, label) => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: makeFaceTexture(spectrumHex, label),
      metalness: 0.0,
      roughness: 0.55,
      transmission: 0.0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.4,
      sheen: 0.5,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color(PADUA.edge),
      flatShading: true,
      side: THREE.DoubleSide,
    });

    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, sharedEmissionUniforms);

      shader.fragmentShader = `
        uniform float uTime;
        uniform sampler2D uNoisePerlin;
        uniform sampler2D uNoiseCellular;
        uniform float uTxtMix;
        uniform float uEmissionMin;
        uniform float uEmissionMax;
        uniform vec3 uEmissionColor;
        uniform float uEmissionStrength;
      ` + shader.fragmentShader;

      // Inject the DolphinIQ-style noise emission after the standard
      // emissive_fragment chunk. Stretches UVs for repeating noise tiles,
      // animates over time, color-ramps via min/max, multiplies by colored
      // emission, adds to totalEmissiveRadiance.
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <emissivemap_fragment>',
        `
          #include <emissivemap_fragment>
          {
            vec2 noiseUv = vec2(vMapUv.x * 6.0, vMapUv.y * 3.5 + uTime * 0.18);
            float nP = texture2D(uNoisePerlin, noiseUv).r;
            float nC = texture2D(uNoiseCellular, noiseUv).r;
            float mixFactor = clamp(uTxtMix + sin(uTime * 0.8) * 0.18, 0.0, 1.0);
            float n = mix(nP, nC, mixFactor);
            n = clamp((n - uEmissionMin) / (uEmissionMax - uEmissionMin), 0.0, 1.0);
            totalEmissiveRadiance += n * uEmissionColor * uEmissionStrength;
          }
        `
      );

      mat.userData.shader = shader;
    };

    allFaceMaterials.push(mat);
    return mat;
  };

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

  // Subtle edge lines — defines the silhouette without dominating
  const edgeGeom = new THREE.EdgesGeometry(geom, 1);
  const edgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(PADUA.edge),
    transparent: true,
    opacity: 0.25,
  });
  pyramid.add(new THREE.LineSegments(edgeGeom, edgeMat));

  // No inner orb sprite — the emission shader on the surface IS the
  // "light from within" effect (DolphinIQ approach). The orb was occluded
  // by the opaque faces anyway, and additive sprites contaminate alpha
  // outside the pyramid silhouette which creates the visible box.
  // The core point light is kept for subtle internal warmth.
  const coreLight = new THREE.PointLight(new THREE.Color(PADUA.compare), 18, 8, 1.6);
  coreLight.position.set(0, 0, 0);
  root.add(coreLight);
  const orb = { material: { color: new THREE.Color() } }; // stub so tick code still works

  // (No background glow sprite. Additive sprites fill alpha across their
  //  full area in non-premultiplied mode — that contaminates the canvas
  //  alpha and creates the visible "box." The bloom halo around the
  //  pyramid handles the atmospheric glow on its own.)
  const bgGlow = null;

  /* --------------------------------------------------------------------------
     Lighting (kept dim — the emission shader carries the visual mass)
     -------------------------------------------------------------------------- */
  const key = new THREE.DirectionalLight(0xffffff, 0.6);
  key.position.set(0.8, 4, 5.5);
  scene.add(key);
  scene.add(new THREE.AmbientLight(new THREE.Color('#1a0e2a'), 0.6));

  /* --------------------------------------------------------------------------
     Per-face hover target rotations
     -------------------------------------------------------------------------- */
  const FACE_ANGLE_OFFSET = -0.42;
  const faceTargets = sides.map((s) =>
    Math.atan2(-s.normal.x, s.normal.z) + FACE_ANGLE_OFFSET
  );

  // No EffectComposer / no UnrealBloomPass. Postprocessing was the source of
  // the canvas-alpha contamination (OutputPass + internal bloom passes force
  // alpha=1, creating the visible box). Direct renderer.render() preserves
  // the materials' alpha exactly, so the canvas is genuinely transparent.
  // The CSS drop-shadow on the canvas element handles the outer halo by
  // following the canvas's alpha-defined silhouette.
  const composer = null;
  const bloomPass = null;

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
     Panel hover → rotate-to-face + click-to-flash
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

  document.querySelectorAll('.triangle-panel__item').forEach((el) => {
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
     Animation
     -------------------------------------------------------------------------- */
  const clock = new THREE.Clock();
  const orbCyclingColor = new THREE.Color();

  function tick() {
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;

    // Spectrum color cycle
    const cyclePos = (t % ORB_CYCLE_PERIOD_SEC) / ORB_CYCLE_PERIOD_SEC * ORB_PALETTE.length;
    const cIdx = Math.floor(cyclePos) % ORB_PALETTE.length;
    const cNext = (cIdx + 1) % ORB_PALETTE.length;
    const cLocal = cyclePos - Math.floor(cyclePos);
    orbCyclingColor.copy(ORB_PALETTE[cIdx]).lerp(ORB_PALETTE[cNext], cLocal);

    orb.material.color.copy(orbCyclingColor);
    coreLight.color.copy(orbCyclingColor);
    if (bgGlow) bgGlow.material.color.copy(orbCyclingColor);

    // Drive the shared emission uniforms (all face materials use this object)
    sharedEmissionUniforms.uTime.value = t;
    sharedEmissionUniforms.uEmissionColor.value.copy(orbCyclingColor);

    // Click flash
    flash *= 0.92;
    if (flash < 0.001) flash = 0;
    const breathe = !reduceMotion ? (Math.sin(t * 1.2) * 0.08 + 1) : 1;
    coreLight.intensity = 18 * breathe * (1 + flash * 1.6);
    sharedEmissionUniforms.uEmissionStrength.value = 4.5 * breathe + flash * 2.0;

    if (targetY !== null) {
      root.rotation.y += shortestDelta(root.rotation.y, targetY) * 0.12;
    } else if (!reduceMotion) {
      root.rotation.y += dt * 0.32;
    }

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
