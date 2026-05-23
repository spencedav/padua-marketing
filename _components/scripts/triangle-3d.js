/* =============================================================================
   PADUA TRIANGLE 3D — Three.js glass tetrahedron
   =============================================================================
   Auto-attaches to any element with id="padua-tri3d". Replaces the static
   "unattainable triangle" SVG with a slowly drifting glass tetrahedron with
   refraction, IBL lighting, and mouse parallax. Methodology palette tints
   the glass through attenuation.

   Honors prefers-reduced-motion: skips auto-rotation, keeps the static pose.

   Inspired by ohzi.io — built for the Padua software page.
   =========================================================================== */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const PADUA = {
  discover:  0x4a308c,
  compare:   0xab2178,
  recommend: 0xeb2e4d,
  review:    0xf59436,
  yellow:    0xf5d534,
  teal:      0x007282,
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function init() {
  const mount = document.getElementById('padua-tri3d');
  if (!mount) return;

  // -- renderer + canvas
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  // -- scene + camera
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.4, 5.4);
  camera.lookAt(0, 0, 0);

  // -- environment (room IBL — no external HDR needed)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;

  // -- glass tetrahedron — toNonIndexed gives flat facet shading
  const tetraGeom = new THREE.TetrahedronGeometry(1.6, 0).toNonIndexed();
  tetraGeom.computeVertexNormals();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.04,
    transmission: 1.0,
    thickness: 1.2,
    ior: 1.5,
    attenuationColor: new THREE.Color(PADUA.discover),
    attenuationDistance: 2.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.05,
    specularIntensity: 1.0,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  const tetra = new THREE.Mesh(tetraGeom, glassMat);
  tetra.rotation.x = -0.35;
  tetra.rotation.y = 0.6;
  scene.add(tetra);

  // -- inner "spectrum core" — a tiny inner solid that the glass refracts.
  // This gives the tetra a colored glow when light passes through.
  const coreGeom = new THREE.IcosahedronGeometry(0.55, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.0,
  });
  // Build a vertex-colored shader so the core has a soft spectrum gradient
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
    const t = (y + 0.55) / 1.1;
    const idx = Math.min(palette.length - 1, Math.floor(t * (palette.length - 1)));
    const next = Math.min(palette.length - 1, idx + 1);
    const local = t * (palette.length - 1) - idx;
    const c = palette[idx].clone().lerp(palette[next], local);
    colors.push(c.r, c.g, c.b);
  }
  coreGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  coreMat.vertexColors = true;
  coreMat.opacity = 0.85;
  const core = new THREE.Mesh(coreGeom, coreMat);
  core.scale.setScalar(0.5);
  scene.add(core);

  // -- methodology accent point lights at the vertices, for caustic-ish highlights
  const accentLights = [];
  [
    [PADUA.discover,  [ 1.8,  1.6,  1.4]],
    [PADUA.compare,   [-1.8,  1.4,  0.8]],
    [PADUA.recommend, [ 0.0, -1.8,  1.6]],
    [PADUA.review,    [ 1.2,  0.4, -1.8]],
  ].forEach(([color, pos]) => {
    const light = new THREE.PointLight(color, 28, 8, 1.6);
    light.position.set(...pos);
    scene.add(light);
    accentLights.push(light);
  });

  // Soft fill from above so the glass reads cleanly
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(2, 4, 3);
  scene.add(keyLight);

  // -- responsive sizing
  function resize() {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(mount);

  // -- mouse parallax (pointer position relative to mount, eased)
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
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }, { threshold: 0 });
  io.observe(mount);

  // -- animation loop
  const clock = new THREE.Clock();
  let raf = 0;

  function tick() {
    raf = requestAnimationFrame(tick);
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

    // Apply parallax as an offset to base rotation
    tetra.rotation.y += pointer.x * 0.0025;
    tetra.rotation.x += pointer.y * 0.0015;

    renderer.render(scene, camera);
  }
  tick();

  // -- cleanup on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(raf);
    renderer.dispose();
    pmrem.dispose();
    tetraGeom.dispose();
    coreGeom.dispose();
    glassMat.dispose();
    coreMat.dispose();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
