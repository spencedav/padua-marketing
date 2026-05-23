# Padua component library

A small, dependency-free CSS library that applies WealthX-inspired visual
sophistication (transparency, frosted glass, soft methodology halos) on top of
Padua's existing brand — methodology spectrum + Newsreader/Geist typography.

## How to use

Drop the bundle into any page after the v3 token CSS:

```html
<link rel="stylesheet" href="/_components/tokens.css" />
<link rel="stylesheet" href="/_components/primitives/pill.css" />
<link rel="stylesheet" href="/_components/primitives/card.css" />
<link rel="stylesheet" href="/_components/primitives/glow.css" />
<link rel="stylesheet" href="/_components/primitives/chip.css" />
<link rel="stylesheet" href="/_components/patterns/stat-card.css" />
<link rel="stylesheet" href="/_components/patterns/methodology-pill.css" />
<link rel="stylesheet" href="/_components/patterns/partner-logo-grid.css" />
<link rel="stylesheet" href="/_components/patterns/feature-card.css" />
<link rel="stylesheet" href="/_components/patterns/cta-banner.css" />
```

For production pages you'll likely concatenate these into one `padua.css` —
that's fine. The order above is intentional: tokens first, primitives, then
patterns that build on the primitives.

## Conventions

- **BEM naming**: `.padua-card`, `.padua-card__title`, `.padua-card--glass`.
- **Methodology coloring** is driven by `data-stage="discover|compare|recommend|review|teal"`.
  Components read `--m-color` / `--m-glow` from the data attribute.
- **Hex+alpha** for color tokens (`#4a308c1a` = 10% alpha) — matches WealthX
  convention. `rgba()` only when alpha is dynamic.
- **Frosted glass** via `backdrop-filter: blur(...)`. Glass tokens already
  bundle the blur and the translucent fill.
- **Motion**: calm, no bounces. Use `--ease-out` + `--duration-base` (280ms).

---

## Primitives

### `padua-pill`
Compact pill / button-shaped element. Used in nav, filters, CTAs.

```html
<a class="padua-pill padua-pill--glass" data-stage="discover">Discover</a>
<a class="padua-pill padua-pill--active">Active</a>
<button class="padua-pill padua-pill--sm">Small</button>
```

Variants: `--glass`, `--glass-light`, `--active`, `--sm`, `--lg`.

### `padua-card`
General-purpose card surface. Includes slots for eyebrow, title, body, footer.

```html
<article class="padua-card padua-card--glass" data-stage="compare">
  <p class="padua-card__eyebrow">Discover</p>
  <h3 class="padua-card__title">Plan smarter, faster.</h3>
  <p class="padua-card__body">…</p>
  <div class="padua-card__footer">
    <a class="padua-card__link" href="#">Read more</a>
  </div>
</article>
```

Variants: `--glass`, `--glass-dark`, `--methodology`, `--lifted`, `--featured`.

### `padua-glow`
Atmospheric halo utility. Apply to any section to give it WealthX-style
ambient color without painting a solid background.

```html
<section class="padua-glow padua-glow--spectrum"> … </section>
<div class="padua-glow padua-glow--discover padua-glow--top-left"> … </div>
```

Variants: `--discover`, `--compare`, `--recommend`, `--review`, `--teal`,
`--spectrum`, `--ink`. Positioning: `--top-left`, `--top-right`,
`--bottom-left`, `--bottom-right`. Intensity: `--subtle`, `--strong`.

### `padua-chip`
Typographic label / eyebrow. Flatter and less interactive than a pill.

```html
<span class="padua-chip" data-stage="discover">Discover</span>
<span class="padua-chip padua-chip--bg" data-stage="compare">Compare</span>
<span class="padua-chip padua-chip--step" data-step="1" data-stage="recommend">Recommend</span>
```

Variants: `--plain`, `--step`, `--bg`.

---

## Patterns

### `padua-stat-card`
Big-number proof point with a soft methodology halo that swells on hover.

```html
<div class="padua-stat-grid">
  <div class="padua-stat-card" data-stage="discover">
    <p class="padua-stat-card__number">73%</p>
    <p class="padua-stat-card__label">Faster discovery</p>
    <p class="padua-stat-card__sub">From client intake to strategy draft.</p>
  </div>
  …
</div>
```

### `padua-methodology-pill-set`
The four-stage methodology shown inline as a horizontal flow.

```html
<div class="padua-methodology-pill-set">
  <span class="padua-methodology-pill" data-stage="discover">Discover</span>
  <span class="padua-methodology-pill-set__arrow">→</span>
  <span class="padua-methodology-pill" data-stage="compare">Compare</span>
  <span class="padua-methodology-pill-set__arrow">→</span>
  <span class="padua-methodology-pill" data-stage="recommend">Recommend</span>
  <span class="padua-methodology-pill-set__arrow">→</span>
  <span class="padua-methodology-pill" data-stage="review">Review</span>
</div>
```

### `padua-partner-grid`
Consolidated partner / licensee / integration logo grid. Replaces the four
ad-hoc copies on /services, /advisers-licensees, /product-providers,
/mortgage-brokers.

```html
<section class="padua-partner-grid">
  <header class="padua-partner-grid__head">
    <p class="padua-partner-grid__eyebrow">Trusted by</p>
    <h2 class="padua-partner-grid__title">Working with Australia's leading licensees.</h2>
  </header>
  <div class="padua-partner-grid__items">
    <div class="padua-partner-grid__item"><img src="…" alt="…" /></div>
    …
  </div>
</section>
```

Variant: `--dark` for ink/spectrum backgrounds.

### `padua-feature-card`
Icon + title + body card. Used in the "Better Quality / Value / Turnaround"
trio on /software, the values grid on /careers, the principles on /who-we-are.

```html
<div class="padua-feature-grid">
  <article class="padua-feature-card" data-stage="discover">
    <span class="padua-feature-card__icon">
      <svg viewBox="0 0 24 24" …>…</svg>
    </span>
    <h3 class="padua-feature-card__title">Better quality.</h3>
    <p class="padua-feature-card__body">…</p>
    <div class="padua-feature-card__footer">
      <a class="padua-feature-card__link" href="#">Learn more</a>
    </div>
  </article>
  …
</div>
```

Variants: `--dark`, `--featured`. Numeric badge: `__icon--num`.

### `padua-team-card`
Headshot + name + optional role/eyebrow. Used on /about/our-people for
Board, Leadership, and Spotlight sections.

```html
<div class="padua-team-grid">
  <article class="padua-team-card padua-team-card--founder">
    <div class="padua-team-card__photo">
      <img src="…" alt="Anne-Marie Esler">
    </div>
    <div class="padua-team-card__body">
      <p class="padua-team-card__eyebrow">Co-founder</p>
      <div class="padua-team-card__name">Anne-Marie Esler</div>
    </div>
  </article>
  …
</div>
```

Grid variant: `padua-team-grid--5` for 5 columns (larger leadership teams).
Card variant: `padua-team-card--founder` adds a subtle pink ring.

### `padua-cta`
Full-width call-to-action banner — Padua's signature page closer. Ships with
its own button primitives (`.padua-btn`, `.padua-btn--primary`, `.padua-btn--ghost`).

```html
<section class="padua-cta padua-cta--spectrum">
  <div class="padua-cta__inner">
    <p class="padua-cta__eyebrow">Get started</p>
    <h2 class="padua-cta__title">Ready when you are.</h2>
    <p class="padua-cta__sub">Book a 20-minute demo with one of our strategists.</p>
    <div class="padua-cta__actions">
      <a class="padua-btn padua-btn--primary" href="/book-a-demo">Book a demo</a>
      <a class="padua-btn padua-btn--ghost" href="/contact-us">Talk to us</a>
    </div>
  </div>
</section>
```

Variants: `--spectrum` (signature), `--ink` (calmer), `--compact` (in-page nudges).

---

## File map

```
_components/
├── tokens.css                        ← extends v3 brand tokens
├── primitives/
│   ├── pill.css
│   ├── card.css
│   ├── glow.css
│   └── chip.css
└── patterns/
    ├── stat-card.css
    ├── methodology-pill.css
    ├── partner-logo-grid.css
    ├── feature-card.css
    ├── team-card.css
    └── cta-banner.css
```

## Roll-out plan

1. Pilot rebuild on `/software` (most varied component types).
2. A/B compare against current — verify the lift is real.
3. Sweeping commit across the remaining 16 pages once approved.
