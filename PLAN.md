# Next-level plan — taking the prototype to production

## Current state (2026-05-23)

13 prototype pages live on Cloudflare via `padua-marketing.spencer-davis-c6d.workers.dev`. Designer-shipped HTML → GitHub → Cloudflare auto-deploy pipeline working. HubSpot integrations (contact form + Brett's Meetings calendar) verified live. Branded 404 page catches missing routes.

**The redesign is now a real, navigable, brand-consistent prototype. It is not yet a production-ready site.**

This document maps the work between "prototype" and "ready to point paduasolutions.com.au at." Phases are sequenced for impact-per-effort and dependencies. Most can be reordered or parallelized.

---

## Phase 1 — Decisions in DECISIONS.md (10 minutes of your time)

Resolve the 6 outstanding nav/footer decisions (A through F in `DECISIONS.md`). Either reply with picks or say "apply defaults". This eliminates the last ~10 broken nav links per page and adds the 3 unreachable pages back into the navigation.

**Cost:** 10 min decision time + 5 min me applying. **Impact:** site feels finished, not in-progress.

---

## Phase 2 — Polish + production hygiene (1 day)

Boring but load-bearing for a "real site":

### Mandatory before launch
- **`sitemap.xml`** — generated from the 13 pages, served at `/sitemap.xml`, submitted to Google Search Console
- **`robots.txt`** — allow Googlebot, point at the sitemap, block staging if applicable
- **OG images per page** — currently most pages use the Padua logo SVG for `og:image`. Better: 1200×630 PNG per page showing the page content. ~3-5 designed images cover the audience pages; rest can be a brand-consistent default.
- **Page-level loading performance** — audit with Lighthouse. Targets: ≥95 Performance, ≥95 Accessibility, ≥95 SEO. Already in decent shape (static HTML + Cloudflare edge) but worth verifying.
- **Mobile QA** — open every page on a real iPhone + Android. Touch interactions, font sizing, viewport behavior. Designer-shipped HTML is responsive but real-device testing always reveals 2-3 issues.

### Nice-to-have but recommended
- **Cloudflare Web Analytics** — one-line snippet, free, privacy-friendly. Track real traffic before launch so you have a baseline.
- **Custom 404 enhancements** — make it actually log to analytics so you know which non-existent URLs people are hitting.
- **Security headers** — set CSP, X-Frame-Options, Strict-Transport-Security via Cloudflare. ~10 min of config.

**Cost:** ~1 focused day of work. **Impact:** site is technically launch-ready, won't embarrass on Lighthouse / SEO audits.

---

## Phase 3 — Connect the CMS (the "hybrid plan")

This is the original decision: keep Webflow's CMS, proxy it through Cloudflare so visitors see one unified site.

### Steps
1. **Cloudflare Worker proxy** at the edge. Routes `/news-insights/*`, `/our-people/*` (if we drop the static About/Our People page), `/research-corner/*` to fetch from `paduasolutions.com.au/<path>` and return the response. Worker rewrites the `<link rel="canonical">` to the new domain to avoid duplicate content.
2. **Webflow side** — set `noindex` on the `.webflow.io` subdomain so Google indexes the new domain only.
3. **Test pagination, search, filtering** within the proxied CMS — these often break with naive proxies.
4. **Update the nav/footer** to point `/news-insights` at the real (now-working) URL.

**Cost:** half-day to build, half-day to test. **Impact:** the CMS just works at the new domain without migrating 137 items, preserves all SEO history on existing articles.

---

## Phase 4 — Custom domain + DNS migration

The big switchover. Several ways to do it:

### Option A — Replace `paduasolutions.com.au` entirely
Point the apex domain at Cloudflare. The new static site becomes the production site. Old Webflow site becomes only accessible via `.webflow.io` (or is decommissioned for marketing pages, kept only for CMS proxied through).
**Pros:** clean switchover, one URL. **Cons:** highest blast radius — if something's wrong with the new site, every visitor sees it.

### Option B — Parallel at `v2.paduasolutions.com.au` or similar
Point a subdomain at the new site. Existing `paduasolutions.com.au` stays on Webflow. Move marketing on a per-page basis (Cloudflare DNS handles per-path routing).
**Pros:** lowest risk, easy rollback, can A/B test traffic. **Cons:** confusing URLs short-term, harder to keep both up to date.

### Option C — Beta period at the workers.dev URL
Keep `paduasolutions.com.au` on Webflow until ready. Send select stakeholders to the workers.dev URL for review. Switch when approved.
**Pros:** zero customer impact during prep. **Cons:** no real customer feedback until launch.

**Recommendation:** Option B during beta → Option A on cutover. Beta the redesign at `v2.paduasolutions.com.au` for 1-2 weeks of stakeholder review, then DNS swap to A.

**Cost:** ~1 day of DNS config + testing. **Impact:** customers see the new site. The point of all this.

---

## Phase 5 — Content gaps + missing pages

A few page-shaped holes:

- **Privacy policy** + **Terms** — legal pages. Either copy from Padua's current ones or get them re-written. Required for a real site.
- **`/news-insights` listing page redesign** — currently we proxy to Webflow's existing listing page. Could redesign that in the new style and have the proxy only serve individual articles.
- **Search** — current Webflow has a `/search` page. Either: keep the Webflow search (proxy through), or add a static search via Algolia / Pagefind / a simple JSON index. Pagefind is free and works well with static sites.
- **CMS detail page templates** — if we ever fully migrate the CMS off Webflow, we'd need:
  - News article template (1 design, used by 44+ items)
  - Research corner template
  - OYM comparison template
  - Tag listing template
  - Team member detail template (if we want individual /our-people/<name> pages)

**Cost:** Legal pages: 1 hour. Search: 0.5-2 days depending on approach. CMS templates: only if migrating off Webflow, days-to-weeks.

---

## Phase 6 — Real production-grade lifting

Once the site is live and being used:

### Analytics depth
- **Cloudflare Web Analytics** (basic) — already mentioned
- **GA4** if marketing needs it (heavier, privacy implications, but standard)
- **Hotjar / Microsoft Clarity** for session recordings + heatmaps. Free tier on Clarity. **Massively** valuable for early redesign — you see what visitors actually do.
- **HubSpot tracking script** — captures pageviews against contact records for sales

### A/B testing
- Cloudflare A/B testing (built into the platform) or Optimizely / VWO
- Test: hero copy variants, CTA button text, methodology positioning
- Especially worth on `/`, `/services`, `/book-a-demo` (highest-stakes pages)

### SEO depth
- **Google Search Console** verified, sitemap submitted, monitor crawl errors weekly
- **Structured data (JSON-LD)** — `Organization`, `LocalBusiness` (Sydney + Kiama offices), `Service`, `Person` (for team page), `Article` (for news posts via the proxy)
- **Internal linking audit** — make sure every page has 2-3 contextual links to related pages (improves dwell time, helps Google understand site structure)
- **Backlink-aware redirects** — Google Search Console tells you which URLs have backlinks. Make sure those redirect properly post-migration.

### Performance
- **Cloudflare Polish + Mirage** for automatic image optimization (already discussed)
- **Critical CSS extraction** — inline above-the-fold CSS, defer the rest. Pages will get to first-paint in <1s.
- **HTTP/3, Brotli, ALPN** — Cloudflare gives you these by default. Verify they're on.

---

## Phase 7 — Workflow + maintainability

How do you keep adding pages after launch?

### Designer pipeline
- **Standardize the designer's HTML output** — give them a template that matches your canonical components (nav, footer, design system). Their next page comes pre-aligned.
- **Component documentation** — extend `components-inventory.md` with code snippets for each section pattern. Designers reference it, paste section markup directly.
- **CI on PR** — when you push HTML, GitHub Action runs: HTML validator, link checker, Lighthouse, screenshot diff. ~15-min setup, prevents shipping broken pages.

### Build step
Currently everything is hand-edited HTML. Pro: simple. Con: changes to shared elements (nav, footer) require updating 13 files.

Options:
- **Stay flat HTML** — accept the cost of multi-file edits. Use sed/python scripts (we've done this 3+ times already).
- **Tiny build step** — Eleventy, Astro, or vanilla Node script that compiles `_layouts/base.html` + page content into the final HTML. ~half day setup. After: edit nav once, all 13 pages regenerate.
- **Component server-rendered** — Cloudflare Worker that assembles pages at request time from shared partials. Most flexible, most moving parts.

**Recommendation:** **Eleventy.** Smallest possible build step. Files stay HTML-shaped (designers can still read them). Build runs in ~1 second. Worth doing before you have 30+ pages.

### Content management for non-developers
The whole reason this project exists. Two approaches:

- **Decap CMS** (free, Git-based) — non-technical users edit content through a web form, changes commit to GitHub, Cloudflare auto-deploys. Sanity for B2B sites. ~2 hours to set up after Eleventy.
- **Headless CMS (Sanity, Storyblok, Contentful)** — non-technical users have a polished editor. Content is fetched at build time. ~half day setup for Sanity (free tier).

**Recommendation:** **Decap CMS** in first phase (cheap, Git-versioned, "good enough"). Migrate to **Sanity** later if PO finds Decap too plain.

---

## Phase 8 — Pre-launch / launch checklist

When you're ready to flip the DNS:

- [ ] All decisions in `DECISIONS.md` resolved
- [ ] Phase 2 polish done (sitemap, robots, OG images, mobile QA, headers)
- [ ] Phase 3 CMS proxy live (or alternative: news redirect plan)
- [ ] Phase 5 legal pages live (`/privacy`, `/terms`)
- [ ] Lighthouse scores ≥95 on every page across all 4 categories
- [ ] Real-device QA on iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari
- [ ] All HubSpot integrations tested end-to-end (form submit → contact in HubSpot, demo book → calendar event for Brett)
- [ ] Google Search Console verified, sitemap submitted
- [ ] Backlink-redirect map (which old URLs from Webflow need 301 redirects)
- [ ] Stakeholder sign-off (Tim, Neil, anyone with veto)
- [ ] Cloudflare Web Analytics tracking before/after
- [ ] DNS swap plan + rollback plan (be able to revert in 5 min if needed)

---

## Phase 9 — Post-launch iteration

After the new site is live:

### Week 1-2: monitoring
- Daily Search Console check for crawl errors
- Daily Cloudflare Analytics check for traffic anomalies
- Daily HubSpot check for lead drop-off (sometimes form integration silently breaks)

### Month 1: optimization
- Hotjar/Clarity recordings — what are visitors actually doing?
- Bounce rate by page — which pages aren't holding people?
- Conversion rate to demo / contact form
- Mobile vs desktop behavior gap

### Month 2-3: iteration
- A/B test the homepage hero (copy + CTA)
- A/B test the methodology framing on `/services`
- Add the next 5-10 missing pages identified from feedback

### Month 4+: scale-up
- Decap or Sanity CMS for non-technical edits
- Designer/agency relationship — how do new pages keep flowing?
- Quarterly SEO audit
- Quarterly content refresh of the highest-traffic 5 pages

---

## My top 5 suggestions if you only do 5 things

If you've got limited bandwidth and need to pick five high-impact moves:

1. **Resolve `DECISIONS.md` and let me apply.** Eliminates ~130 broken nav links across the site instantly.
2. **Set up Cloudflare Worker proxy for `/news-insights/*`.** Solves the biggest remaining content gap and validates the hybrid architecture in practice.
3. **Add Microsoft Clarity** (free session recordings). You will be shocked what visitors actually do. Worth $0 and 5 minutes.
4. **Move to Eleventy as a tiny build step.** Future page edits propagate from one template, not 13 files. Saves you hours every time you change the nav.
5. **Custom domain at `v2.paduasolutions.com.au`** for stakeholder review. Even before official launch, get internal eyes on it under a real domain. Drives the last 5% of polish that you can't see without real-domain context.

If you do all five, you go from "fast prototype" to "production-grade, maintainable, measurable site" in roughly 2-3 days of focused work.

---

## What this prototype proved (worth saying)

You built 13 brand-consistent, navigable, image-rich pages with HubSpot CRM integration in ~2 days of conversational work. The same scope on Webflow would have taken weeks of manual rebuilding. The static + CDN + AI generation approach demonstrably works for B2B marketing sites.

The technical bet was right. From here on, the work is content, polish, and ops — not architecture.
