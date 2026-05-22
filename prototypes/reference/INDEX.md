# Padua Site — Reference Material

Local mirror of the live `paduasolutions.com` site, organized for use as design + content context when generating new prototype pages.

Pulled 2026-05-22 from `https://www.paduasolutions.com`.

## Start here

| File | What it is |
|---|---|
| **[design-system.md](design-system.md)** | Brand colors (full ramps), typography scale, methodology naming, semantic tokens. **Read first.** |
| **[components-inventory.md](components-inventory.md)** | Catalog of every reusable component pattern observed across 15 pages — nav, footer, hero variants, card types, section patterns. Use this to compose new pages from named components. |

## Pulled pages (15 unique-design pages + 1 sample per CMS template)

Each folder contains:
- `page.html` — rendered HTML from the live site
- `images/` — all image assets the page references (deduped to highest-resolution variant)
- `_deduped_image_urls.txt` — original CDN URLs (in case you need to re-fetch)

### Static / unique-design pages

| Folder | URL | What it's for |
|---|---|---|
| [`home/`](home/) | `paduasolutions.com/` | Homepage |
| [`services/`](services/) | `/services` | Paraplanning + Transition services overview |
| [`software/`](software/) | `/software` | WealthX, WealthData, etc. product family |
| [`advisers-licensees/`](advisers-licensees/) | `/advisers-licensees` | Audience-specific page for advisers |
| [`mortgage-brokers/`](mortgage-brokers/) | `/mortgage-brokers` | Audience-specific page for mortgage brokers |
| [`product-providers/`](product-providers/) | `/product-providers` | Platforms / super funds / investment managers |
| [`concierge/`](concierge/) | `/concierge` | Concierge service detail |
| [`ready-set-go/`](ready-set-go/) | `/ready-set-go` | Specific service offering |
| [`book-a-demo/`](book-a-demo/) | `/book-a-demo` | Demo request form page |
| [`contact-us/`](contact-us/) | `/contact-us` | Contact form page |
| [`about-who-we-are/`](about-who-we-are/) | `/about/who-we-are` | About — company story |
| [`about-our-people/`](about-our-people/) | `/about/our-people` | About — team |
| [`about-careers/`](about-careers/) | `/about/careers` | Careers / hiring |

### CMS template samples (1 example per layout)

| Folder | URL | Template |
|---|---|---|
| [`sample-news-article/`](sample-news-article/) | `/news-insights/qar-and-the-golden-age-of-advice-podcast-episode` | News article detail (template for all 44 news posts) |
| [`sample-tag-research/`](sample-tag-research/) | `/tags/research` | Tag listing (template for all tag/category pages) |

## What's NOT pulled (and why)

- **The other 43 news articles** — they all share the news-article template; one sample is enough for design reference. If you need real article copy for a specific layout, ask me.
- **OYM comparison pages** — only 3 exist (`/oym/mynorth-vs-bt`, `/oym/mynorth-vs-exapnd`, `/oym/north-vs-macquarie---dimensional-portfolios`); haven't pulled any yet. Pull on demand.
- **Other tag pages** (commentary, data-trends, news-events, podcast, technology) — all use the same template as `sample-tag-research/`.
- **`/search`** — functional, no design value.
- **`/privacy-policy`** — basic legal text page, low design value.
- **CMS-driven listing pages** (`/news-insights`, `/product-updates`) — would need to be pulled if you want to see how listings paginate, but the layouts are basic grids of news cards.

## Webflow CDN URLs

Every image is also hosted at Webflow's CDN at the URL stored in each folder's `_deduped_image_urls.txt`. The pattern is:

```
https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/<filename>
```

(where `64dc507cffef202bc73d11dc` = Padua's prod Webflow site ID).

You can reference these URLs directly in new pages without downloading the images. They're stable as long as the prod Webflow site exists.

## Shared CSS

`services/css/padua-solutions.webflow.shared.1a6240eee.min.css` is Webflow's compiled stylesheet for the entire site — same file used by every page. Reference it once if you want to inspect the rendered design language directly. The [design-system.md](design-system.md) has already extracted the important parts.

## Use with Claude.ai

To use this folder as context in a Claude.ai Project:

**Minimal upload (highest signal-to-noise):**
1. `design-system.md`
2. `components-inventory.md`
3. The `index.html` at the parent `padua-marketing/` root (your v3 prototype — defines the *new* visual direction)
4. 2-3 `page.html` files from this folder (e.g., `services/page.html`, `home/page.html`, `about-who-we-are/page.html`) for content/voice reference

**Fuller upload (more context, hits file limit faster):**
- Everything above PLUS images you want Claude to be aware of as reusable brand assets (logo SVGs, partner logos, the ISO 27001 badge)

## When to refresh this material

- **If the live site changes** significantly (new pages, redesigned sections): re-run the pull script `prototypes/_tooling/pull_padua_page.sh` for affected pages.
- **If you add a new component pattern in your redesign:** update `components-inventory.md`.
- **If brand colors / typography change:** update `design-system.md`.

This folder represents a snapshot in time. Date stamps in commits will show when each pull happened.
