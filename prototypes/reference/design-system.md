# Padua Solutions — Design System

Extracted from `https://www.paduasolutions.com` (CSS variables + cross-page analysis, 2026-05-22).
**Use this document as the primary design reference when generating new pages.**

## Brand methodology

Padua's brand and product are organized around a 4-stage advice methodology:

| Stage | Color | Hex (primary) | Meaning |
|---|---|---|---|
| **Discover** | Purple | `#3b2383` | First step — uncover client needs |
| **Compare** | Pink/Magenta | `#a3156b` | Compare options side-by-side |
| **Recommend** | Red | `#d21433` | Make the strategic recommendation |
| **Review** | Orange | `#f56600` | Ongoing review of the plan |

These four colors plus a **Teal** accent (`#007282`) form the brand spectrum. The v3 prototype's gradient (`linear-gradient(135deg, #4a308c 0%, #ab2178 28%, #eb2e4d 52%, #f59436 78%, #f5d534 100%)`) is a smoothed version of these methodology colors.

## Full color ramps (50-900)

Every brand color has a full ramp. Use `--<color>-500` as default; lighter for backgrounds, darker for hover/emphasis.

**Purple (Discover)**
```
--purple-900: #2f1c69    --purple-300: #b1a7cd
--purple-800: #352076    --purple-200: #cec8e0
--purple-700: #3b2383  ← primary
--purple-600: #584496    --purple-150: #e2deec
--purple-500: #7665a8    --purple-100: #ebe9f3
--purple-400: #9386bb    --purple-50:  #f5f4f9
```

**Pink (Compare)**
```
--pink-900: #821156      --pink-300: #daa1c4
--pink-800: #931360      --pink-200: #e3b9d3
--pink-700: #a3156b  ← primary
--pink-600: #ac2c7a      --pink-150: #edd0e1
--pink-500: #b54489      --pink-100: #f6e8f0
--pink-400: #c873a6      --pink-50:  #faf3f8
```

**Red (Recommend)**
```
--red-900: #a81029       --red-300: #eda1ad
--red-800: #bd122e       --red-200: #f4c4cc
--red-700: #d21433  ← primary
--red-600: #d93752       --red-150: #f8dce0
--red-500: #e05b70       --red-100: #fae7eb
--red-400: #e67e8f       --red-50:  #fdf3f5
```

**Teal (accent)**
```
--teal-900: #005b68      --teal-300: #99c7cd
--teal-800: #006775      --teal-200: #bfdce0
--teal-700: #007282  ← primary (--teal-primary)
--teal-600: #268795      --teal-150: #cce3e6
--teal-500: #5fa6b0      --teal-100: #e5f1f2
--teal-400: #73b1ba      --teal-50:  #f2f8f9
```

**Review (orange — only `--review-primary` defined, no full ramp)**
```
--review-primary: #f56600
--review-dark:    #c45200
--review-hover:   #f67d26
--review-accent:  #fee8d9
--review-background: #fef7f2
--review-border:  #f9ab73
```

## Semantic color aliases

```
--default:      #212121
--white:         white
--black:         black
--dark-bg:       #18103a   ← deep purple-blue, used on dark sections

--discover-primary:   var(--purple-700)
--discover-dark:      var(--purple-900)
--discover-background: var(--purple-50)
--discover-accent:    var(--purple-150)
--discover-border:    var(--purple-400)
--discover-hover:     var(--purple-600)

--compare-primary:    var(--pink-700)
--compare-dark:       var(--pink-900)
--compare-background: var(--pink-50)
--compare-accent:     var(--pink-150)
--compare-border:     var(--pink-400)
--compare-hover:      var(--pink-600)

--recommend-primary:  var(--red-700)
--recommend-dark:     var(--red-900)
--recommend-background: var(--red-50)
--recommend-accent:   var(--red-150)
--recommend-border:   var(--red-400)
--recommend-hover:    var(--red-600)

--teal-primary:       var(--teal-700)
--teal-dark:          var(--teal-900)
--teal-background:    var(--teal-50)
--teal-accent:        var(--teal-150)
--teal-border:        var(--teal-400)
--teal-hover:         var(--teal-600)
--teal-light:         #009082
```

## Grey scale

```
--grey-900: #212121  ← --default
--grey-800: #424242
--grey-700: #616161
--grey-500: #9e9e9e
--grey-400: #bdbdbd
--grey-300: #e0e0e0
--grey-200: #eee
--grey-100: #f5f5f5
--grey-50:  #fafafa
```

## Sub-brand colors

Padua has product sub-brands with their own primaries:

- **WealthX** (open banking product): `--wealthx-primary: #ff6f2c`, dark `#f5611c`, bg `#fff8f4`, accent `#ffd4c0`, border `#ff9a6b`
- **WealthData** (insights product): `--wealthdata-primary: #1756a3`

(Other products — SteveAI, WealthAI, WealthReview — appear in nav copy but don't have their own CSS variables defined, suggesting they share the parent brand colors.)

## Typography

**Display font:** Quincy CF (a commercial Connary Fagen font). Fallback: `sans-serif`.
- Variants in use: `Quincy Cf`, `Quincy Cf Extra`, `Quincy Cf Text`
- Used for all headings (h1-h5) and the logo
- **For prototypes:** use `Newsreader` (Google Fonts) as a stand-in since Quincy CF requires a license. Replace `font-family: 'Newsreader'` with `'Quincy CF'` once licensed fonts are uploaded.

**Body font:** Likely Roboto (loaded via WebFont loader: `Roboto:300,400,500,600,700`). The v3 prototype uses **Geist** as a more modern substitute — either is fine for prototyping.

**Type scale (rem-based, root = 16px):**
```
--h1:      3.1rem  (49.6px)
--h2:      3rem    (48px)
--h3:      2.5rem  (40px)
--h4:      2rem    (32px)
--h5:      1.4rem  (22.4px)
--p:       1.125rem (18px)
--label:   1rem    (16px)
--button-label: 0.9rem (14.4px)
--nav-text: 1rem   (16px)
--_sizes---p-smaller: 0.95rem (15.2px)
```

## Layout

```
--container: 1280px   ← Max width of main content
```

Common padding patterns observed in HTML:
- `padding-section-small` — used 38× across pages, the standard vertical section padding
- `container` — 59× — wraps content inside sections

## Component patterns observed

The site uses **Webflow's UntitledUI (UUI) component kit** as its base (you'll see `uui-*` classes everywhere), with Padua brand styling layered on top. Key patterns observed across all 14 pulled pages:

### Global

- **Navigation:** `uui-navbar04_*` family — has mega-menu dropdowns for "Solutions" (Advisers, Software, Services), "Products" (WealthX, etc.), "About". Headers + descriptions in each dropdown item.
- **Footer:** `footer04_*` family — multi-column footer with social links, certifications (ISO 27001 badge), acknowledgement of country.

### Buttons
- `.btn-text` — text link with arrow (most common, 102×)
- `.text-button-teal` — teal-colored text button (83×)
- `.uui-button-tertiary-gray-2` — secondary button (UntitledUI)
- Spectrum gradient buttons appear only in v3 prototype, not on live site (live uses solid teal/dark buttons)

### Cards (observable across pages)
- **Service cards:** `service-card`, `service-card.home-card`, `service-card.discover-card`, `service-card.compare-card` — color-coded by methodology stage
- **News article cards:** in news-insights listing
- **Team member cards:** in about/our-people
- **Partner logo cards:** in product-providers + homepage

### Sections
- **Padding:** `padding-section-small` (38× usage) is the standard
- **Grid layouts:** `w-layout-grid` for arranged content
- **Cells:** `w-layout-cell` for grid items

## Voice/tone (inferred from content)

From scanning page copy across all 14 pulled pages:

- **Professional but approachable** — financial services tone without being stuffy
- **"We" first-person** — Padua refers to itself as "we", not "Padua Solutions" or third-person
- **Active voice, present tense**
- **Concrete, not corporate** — emphasizes practical outcomes ("save 5 hours per SOA", "deliver advice end-to-end") over abstract value props
- **Australia-first** — repeatedly references onshore delivery, Australian regulations, Sydney/Kiama locations, ISO 27001 certification

## How to use this document

When generating a new page in Claude.ai or Claude Code:

1. Reference these tokens by name (e.g., "use `--purple-700` for the Discover-themed section")
2. Match the type scale exactly — don't invent new sizes
3. Use the methodology color associations consistently (Discover = purple, etc.)
4. Quincy CF for display headings (Newsreader as prototype substitute)
5. Reference existing component patterns by name where possible (e.g., "follow the `service-card.discover-card` styling")

For visual reference, look at any of the pulled pages in `prototypes/reference/<page-name>/page.html`.
