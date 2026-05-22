# /services page reference

Captured 2026-05-22 from `https://www.paduasolutions.com/services` for use as Claude.ai design context when generating new prototype pages.

## Contents

| Folder/File | What it is |
|---|---|
| `services.html` | Full rendered HTML of the live /services page (65 KB) |
| `images/` | 33 image files — all assets referenced by the page (logos, photos, illustrations, icons) |
| `css/` | Webflow's compiled CSS for the live site (the design language reference) |
| `_image_urls.txt` | List of every image URL referenced on the page (in case originals need to be re-fetched) |
| `_css_urls.txt` | List of every CSS URL referenced |
| `README.md` | This file |

## Image breakdown

The 33 image files are actually **14 unique source images**, each with multiple responsive variants (-p-500, -p-800, -p-1080, -p-1600, -p-2000, -p-2600). For visual reference purposes you can probably ignore the variants and look at the base file of each.

Unique images include:
- Padua logo (horizontal SVG)
- Padua touch icon (PNG)
- Padua services illustrations (SVG)
- ISO 27001 Certified Badge (SVG)
- Compare animation illustration (PNG)
- DSC photos (DSC_1334, DSC_1158 — likely team/office photography)
- Partner logos: Invest Blue, iress xplan, Lifewealth
- Sales team photo
- Arrow-up shadow icon
- Vectors wrapper SVG

## How to use this with Claude.ai

When generating a new prototype page that should match Padua's existing design language:

1. Upload this entire folder to a Claude.ai Project (or attach `services.html` + a selection of `images/*` files to the chat).
2. Prompt Claude with something like:
   > "Here's the existing /services page from paduasolutions.com — `services.html` plus all its referenced images and CSS. Match the visual language, brand tone, and component patterns when generating my new prototype for [page name]."
3. For brand assets you want to reuse on the new page (logos, certifications), reference them either by their original CDN URL (still hosted by Webflow) or commit them into `padua-marketing/assets/`.

## Stable Webflow CDN URLs

If you want to use these images in a new live page without copying them into your repo, every image URL above is publicly hosted at:

```
https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/<filename>
```

where `64dc507cffef202bc73d11dc` is Padua's prod Webflow site ID. These URLs are stable as long as the prod Webflow site exists. See `_image_urls.txt` for the full list of original URLs.

## Caveat

This is the **rendered Webflow output**, which includes wrapper divs, jQuery, Webflow's runtime JS, and other platform-specific markup. When using as design reference, focus on the visual/structural intent, not the exact HTML. Claude can easily extract the design language and rewrite cleanly to match the v3 prototype's conventions.
