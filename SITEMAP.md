# Padua Marketing — Sitemap & Navigation Map

Last updated: 2026-05-23. Pages live at `https://padua-marketing.spencer-davis-c6d.workers.dev/`.

## Live page tree

```
/
├── /services                          (Services overview)
├── /advisers-licensees                (Audience landing)
│   ├── /software                      (Product suite — Padua Home / Discover / Compare / Recommend)
│   ├── /ready-set-go                  (Transition Mgmt — 4-stage methodology + two-track:
│   │                                   self-managed OR Concierge done-for-you. /concierge
│   │                                   merged in here 2026-05-28, 301-redirected.)
│   └── /mortgage-brokers              (Audience-adjacent — features Padua WealthX)
├── /product-providers                 (Audience landing — Platforms, Super Funds, Investment Mgrs, Insurance, Consultants)
├── /about/
│   ├── /about/who-we-are              (Founder story + EARS values)
│   ├── /about/our-people              (Team — Board / Leadership / Spotlight)
│   └── /about/careers                 (Recruitment + 6 streams)
├── /contact-us                        ⚠️ NOT YET BUILT (prompt ready, HubSpot iframe)
├── /book-a-demo                       ⚠️ NOT YET BUILT (prompt ready, HubSpot Meetings)
└── /404 (custom branded error page)
```

**11 live pages + 1 404 page. 2 pages still to generate.**

## How to navigate to each page (from the nav bar)

The dark nav bar at the top of every page works the same way — hover the parent text to open a dropdown, then click a dropdown item.

| Target page | How to get there from the nav |
|---|---|
| **/** (Homepage) | Click the **Padua logo** (top-left) |
| **/services** | Hover **"Advisers & Licensees"** → click *"Tech-enabled paraplanning"* in the Services column |
| **/advisers-licensees** | Hover **"Advisers & Licensees"** → click *"Portal overview"* in the Padua Portal column |
| **/software** | Hover **"Advisers & Licensees"** → click any item in the Software column (currently all of them point at `/software/<product>` which 404 — see Optimization #1) |
| **/concierge** | ⚠️ Not in the nav. Reach via internal links from `/services` or `/ready-set-go` |
| **/ready-set-go** | ⚠️ Not in the nav. Reach via internal links from `/services` or `/concierge` |
| **/mortgage-brokers** | ⚠️ Not in the nav. No internal link from any other page currently |
| **/product-providers** | Hover **"Platforms & Super Funds"** → top-level click works (or via dropdown items) |
| **/about/who-we-are** | Hover **"About"** → click *"Who we are"* |
| **/about/our-people** | Hover **"About"** → click *"Our people"* |
| **/about/careers** | Hover **"About"** → click *"Careers"* |
| **/book-a-demo** | "Book a demo" spectrum button (top-right of nav). Currently 404. |
| **/contact-us** | Currently no nav link points exactly here (nav has `/contact` instead — see Optimization #4). |

## Nav active-state map

Every page sets `class="nav-link active"` on one nav item to highlight where you are:

| Page | Active nav item |
|---|---|
| `/` | (none — homepage shows no active state) |
| `/services` | Advisers & Licensees |
| `/advisers-licensees` | Advisers & Licensees |
| `/software` | Advisers & Licensees |
| `/concierge` | Advisers & Licensees |
| `/ready-set-go` | Advisers & Licensees |
| `/mortgage-brokers` | Advisers & Licensees |
| `/product-providers` | Platforms & Super Funds |
| `/about/who-we-are` | About |
| `/about/our-people` | About |
| `/about/careers` | About |
| `/contact-us` (future) | Contact |
| `/book-a-demo` (future) | (none — it's a CTA destination) |

## Every internal nav/footer link, by destination

| Link target | Status | Used in |
|---|---|---|
| `/` | ✅ Live (homepage) | nav logo, footer, internal links |
| `/services` | ✅ Live | nav, footer, internal cross-links |
| `/advisers-licensees` | ✅ Live | nav, footer |
| `/software` | ✅ Live | nav top-level, internal links |
| `/software/wealthx` | ❌ 404 | nav Software dropdown |
| `/software/wealthreview` | ❌ 404 | nav Software dropdown |
| `/software/steveai` | ❌ 404 | nav Software dropdown |
| `/software/wealthai` | ❌ 404 | nav Software dropdown |
| `/software/wealthdata` | ❌ 404 | nav Software dropdown |
| `/software/fund-administration` | ❌ 404 | nav Investment Managers dropdown |
| `/product-providers` | ✅ Live | internal links |
| `/platforms-super-funds` | ❌ 404 | nav top-level |
| `/investment-managers` | ❌ 404 | nav top-level |
| `/media-advertising` | ❌ 404 | nav Investment Managers dropdown |
| `/concierge` | ✅ Live | NOT in nav |
| `/mortgage-brokers` | ✅ Live | NOT in nav |
| `/ready-set-go` | ✅ Live | NOT in nav |
| `/about/who-we-are` | ✅ Live | nav, footer |
| `/about/our-people` | ✅ Live | nav, footer |
| `/about/careers` | ✅ Live | nav, footer |
| `/news-insights` | ❌ 404 | nav, footer (still on Webflow CMS) |
| `/events` | ❌ 404 | nav About dropdown |
| `/resources` | ❌ 404 | nav About dropdown |
| `/security` | ❌ 404 | nav About dropdown |
| `/advice-guides` | ❌ 404 | footer |
| `/rafa` | ❌ 404 | footer |
| `/fund-administrators` | ❌ 404 | footer |
| `/contact` | ❌ 404 | nav, footer |
| `/contact-us` | ⏳ Prompt ready | (none currently — see Opt #4) |
| `/book-a-demo` | ⏳ Prompt ready | nav CTA button, internal CTAs |
| `/privacy` | ❌ 404 | footer |
| `/terms` | ❌ 404 | footer |
| `#watch` | ⚠️ Only works on `/` | nav featured-link |
| `/services#transition` | ✅ Works (anchor on /services) | nav |
| `https://home.paduasolutions.com/` | ✅ External (app login) | nav "Log in" |

## What hits the 404 page

Every dead link above lands on our branded `404.html` (purple gradient page with cards pointing back to live pages). It's friendly, not broken-looking — but ideally there should be zero clicks landing on it.

## Cross-references between pages (internal CTAs)

Each page links forward to others:

- **/services** → `/advisers-licensees`, `/book-a-demo`, `/contact-us`, `/services#transition`
- **/advisers-licensees** → `/services`, `/software`, `/book-a-demo`
- **/software** → `/book-a-demo`, `/contact-us`, `/services`
- **/concierge** → `/ready-set-go`, `/book-a-demo`, `/contact-us`
- **/ready-set-go** → `/concierge`, `/book-a-demo`, `/contact-us`
- **/mortgage-brokers** → `/software`, `/contact-us`, `/book-a-demo`
- **/product-providers** → `/services`, `/software`, `/book-a-demo`, `/contact-us`
- **/about/who-we-are** → `/about/our-people`, `/about/careers`, `/book-a-demo`, `/contact-us`
- **/about/our-people** → `/about/careers`, `/book-a-demo`, `/contact-us`
- **/about/careers** → `/about/who-we-are`, `/contact-us`
