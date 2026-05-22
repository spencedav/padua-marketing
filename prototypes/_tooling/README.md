# Canonical components — paste into every new page prompt

These two files are the **single source of truth** for the nav and footer across the redesigned Padua marketing site. Every new page generated in Claude.ai must use them verbatim — no redesigning, no "improvements," no variants. This is how we prevent visual drift across pages.

## Files

| File | What it is | Lines |
|---|---|---|
| `canonical-nav.html` | The top navigation bar, including mega-menu dropdowns, logo, and CTA buttons. Extracted from the approved `services.html` generation. | 116 |
| `canonical-footer.html` | The site footer: multi-column links, social, ISO/onshore certifications, acknowledgement of country, copyright. | 53 |

## How to use when generating a new page in Claude.ai

In every page-generation prompt, include this exact instruction near the top:

> "Use the EXACT nav from `canonical-nav.html` and the EXACT footer from `canonical-footer.html` (both uploaded to this project). Do not redesign these. Do not change copy, links, or class names. The only edit you may make to the nav is to change which `nav-link` has the `active` class — that should reflect the page being generated (e.g., for `/about/who-we-are`, the About nav-item gets `active`; for `/advisers-licensees` or its children like `/services`, the Advisers & Licensees nav-item gets `active`)."

Then upload these two files to the Claude.ai project (Project knowledge → Add content → Files) so the model can read them directly.

## How to update the canonical components

If you ever decide to change the nav or footer (e.g., add a new section, update a link, change copy):

1. **Update this file first** — change `canonical-nav.html` or `canonical-footer.html` to the new version.
2. **Re-upload to Claude.ai project** so future generations use the new version.
3. **Propagate to existing generated pages** — either:
   - Manually update each `.html` file in `padua-marketing/` (tedious, error-prone), OR
   - Run a propagation script: `node prototypes/_tooling/propagate-shared.js` (not yet written — let me know when you need it and I'll build it)

## Active-state convention

The nav has one element that legitimately varies per page: which `nav-link` has the `active` class (changes the visual indicator showing "you are here").

Mapping of page → which nav-item gets `active`:

| Page URL | Active nav-item |
|---|---|
| `/` | (none — homepage shows no active nav item) |
| `/services` | "Advisers & Licensees" (Services is a child) |
| `/advisers-licensees` | "Advisers & Licensees" |
| `/software/*` | "Advisers & Licensees" (Software is a child) |
| `/concierge` | "Advisers & Licensees" |
| `/ready-set-go` | "Advisers & Licensees" |
| `/mortgage-brokers` | (its own nav item — to be added) |
| `/platforms-super-funds`, `/product-providers` | "Platforms & Super Funds" |
| `/investment-managers` | "Investment Managers" |
| `/about/*` | "About" |
| `/news-insights/*` | "About" (News & Insights lives under About) |
| `/book-a-demo`, `/contact-us`, `/contact` | (no active state — these are CTA destinations) |

When generating a page, tell Claude.ai exactly which nav-link should be active based on this table.

## Notes on the current canonical files

- **Logo is base64-encoded inline** in both nav and footer. ~10 KB each. We can extract to `/images/padua-logo.png` later for cleaner pages; for now it's self-contained.
- **All hrefs use real URLs** (e.g., `/services`, `/about/who-we-are`, `/book-a-demo`), not `#` placeholders. Internal links between pages will just work once the corresponding pages exist.
- **CTA button** (`btn-spectrum`) currently points to `/book-a-demo` — make sure that page exists or update to a different CTA target.
- **External link**: the "Log in" button points to `https://home.paduasolutions.com/`. Verify this is the correct app URL.
- **Footer's "Acknowledgement of Country"** is rendered as plain `<p>` — appropriate, not stylized as a banner. Standard Australian convention.

## When to regenerate the canonical files

You should re-extract these from a freshly-generated page if:

- You generate a new page (e.g., the homepage) and decide its nav/footer is better than the current canonical
- You're iterating on the nav design and a recent generation has the version you want to lock in

To regenerate:

```bash
# Replace <source-file> with the file you want to pull canonical nav/footer from
sed -n '<nav-start>,<nav-end>p' <source-file> > canonical-nav.html
sed -n '<footer-start>,<footer-end>p' <source-file> > canonical-footer.html
```

Or just ask Claude Code to do it: "extract canonical nav and footer from `<file>`."
