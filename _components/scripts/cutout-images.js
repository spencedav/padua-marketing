/* =============================================================================
   PADUA CUTOUT-IMAGES — strip a near-uniform background from any <img>
   marked with data-cutout, replacing its src with a transparent version.
   =============================================================================
   How it works:
     1. For each <img data-cutout>, wait for it to load.
     2. Draw it to an offscreen canvas, sample the four corner pixels to
        infer the background color (assumed near-uniform at the edges).
     3. For each pixel, compare its color to the bg sample. Pixels within
        the tolerance band become fully transparent; pixels in the feather
        band fade between transparent and opaque.
     4. Replace img.src with the canvas dataURL.

   Requires CORS-friendly image hosts (e.g. Webflow CDN) and
   crossorigin="anonymous" on the <img>. If CORS isn't allowed, the canvas
   gets tainted and getImageData throws — we catch and leave the image
   unchanged so the page still renders.

   Tunables via data-attrs on the img:
     data-cutout-tolerance   (default 38) — distance below which a pixel is fully bg
     data-cutout-feather     (default 22) — distance above tolerance where alpha ramps in
   =========================================================================== */

const DEFAULTS = { tolerance: 38, feather: 22 };

function waitForLoad(img) {
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return new Promise((resolve, reject) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', reject, { once: true });
  });
}

async function cutout(img) {
  await waitForLoad(img);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return;

  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  // May throw SecurityError if the image is cross-origin without CORS headers.
  let imageData;
  try {
    imageData = ctx.getImageData(0, 0, w, h);
  } catch (err) {
    console.warn('[padua-cutout] canvas tainted (CORS), leaving image as-is:', img.src);
    return;
  }
  const data = imageData.data;

  // Sample bg from 4 corners + 4 edge midpoints, averaged
  const samplePoints = [
    [2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3],
    [Math.floor(w / 2), 2], [Math.floor(w / 2), h - 3],
    [2, Math.floor(h / 2)], [w - 3, Math.floor(h / 2)],
  ];
  let sumR = 0, sumG = 0, sumB = 0;
  for (const [x, y] of samplePoints) {
    const i = (y * w + x) * 4;
    sumR += data[i]; sumG += data[i + 1]; sumB += data[i + 2];
  }
  const bgR = sumR / samplePoints.length;
  const bgG = sumG / samplePoints.length;
  const bgB = sumB / samplePoints.length;

  const tolerance = Number(img.dataset.cutoutTolerance) || DEFAULTS.tolerance;
  const feather = Number(img.dataset.cutoutFeather) || DEFAULTS.feather;
  const t2 = tolerance * tolerance;
  const f2 = (tolerance + feather) * (tolerance + feather);

  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bgR;
    const dg = data[i + 1] - bgG;
    const db = data[i + 2] - bgB;
    const distSq = dr * dr + dg * dg + db * db;
    if (distSq < t2) {
      data[i + 3] = 0; // fully transparent
    } else if (distSq < f2) {
      const dist = Math.sqrt(distSq);
      const k = (dist - tolerance) / feather;
      data[i + 3] = Math.round(k * data[i + 3]);
    }
  }
  ctx.putImageData(imageData, 0, 0);
  img.src = cv.toDataURL('image/png');
}

function init() {
  const imgs = document.querySelectorAll('img[data-cutout]');
  imgs.forEach((img) => {
    cutout(img).catch((err) => {
      console.warn('[padua-cutout] failed', img.src, err);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
