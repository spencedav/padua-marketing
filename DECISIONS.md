# Pending nav + footer decisions

After the safe URL repointing fixes (already applied), every page has exactly the same 10 internal links that still 404. Each one is a content/structural decision that needs your input. None of them are urgent.

**Reply with letter+number** (e.g., "A1, B3, C1, D1, E2") and I'll apply your picks across all pages + the canonical components.

---

## A. Three live pages are missing from the nav

`/concierge`, `/ready-set-go`, and `/mortgage-brokers` are real, live pages — but unreachable from the nav. They're only findable via internal cross-links from other pages.

### A1 — Add them under existing dropdowns (recommended)
- Under **"Advisers & Licensees" mega-menu → Services column**, add:
  - "Concierge" → `/concierge`
  - "Ready, Set, Go" → `/ready-set-go`
- Add a new top-level nav item **"Mortgage Brokers"** between "Advisers & Licensees" and "Platforms & Super Funds" — its own audience landing.

### A2 — Leave them off the nav
Discoverable only via in-page CTAs. Cleaner nav, but cold-load visitors who land on a different page can't find them.

### A3 — Custom mix
Tell me which ones to add and where.

---

## B. Software dropdown labels mismatch the actual `/software` page

Current nav dropdown lists 5 product names: **WealthX / WealthReview / SteveAI / WealthAI / Wealth Data**. But the live `/software` page features 4 different products under methodology names: **Padua Home / Discover / Compare / Recommend**.

All 5 nav items now correctly point at `/software` (after the safe fix), so clicks work. But the dropdown labels still show the *older* product names.

### B1 — Keep old names in nav
Matches what existing customers might remember from the current Padua site. All clicks land on `/software` and they discover the new methodology naming there.

### B2 — Rename nav labels to match `/software` page
Update dropdown to: Padua Home / Discover / Compare / Recommend. Consistent but loses brand recognition of WealthX/etc. for existing customers.

### B3 — Show both (recommended)
Nav dropdown shows the new methodology name as primary, old product name as `<small>` subtitle. E.g.:
```
Discover
  Open banking & fact-find  (formerly WealthX)
```
Soft transition for existing customers.

### B4 — Drop the dropdown entirely
Software becomes a simple top-level link with no dropdown. Cleanest, least informative.

---

## C. About dropdown has placeholder items pointing to non-existent pages

The About dropdown has three items that 404: **Events**, **Resources**, **Security**. (These also 404 on the live Padua site — so this isn't a regression, but it is an opportunity to clean up.)

### C1 — Remove all three (recommended)
Cleaner About dropdown. The items they remove leave behind: Who we are, Our people, Careers, News & Insights — that's enough.

### C2 — Keep as "coming soon"
They hit the branded 404 which directs visitors back to live pages. Preserves the original Padua nav structure exactly.

### C3 — Repoint to existing content
- "Security" → `/about/who-we-are` (which mentions ISO 27001 certification)
- "Events" + "Resources" → remove

### C4 — Build stub pages for these
Write a 1-page "coming soon" placeholder for each, with a CTA. More work, but no dead links.

---

## D. Footer has 5 dead links

`/advice-guides`, `/rafa`, `/fund-administrators`, `/privacy`, `/terms`

### D1 — Remove all five
Cleanest footer. But `/privacy` and `/terms` are typically required pre-launch for a real business site.

### D2 — Remove the 3 marketing-y links; keep + stub Privacy + Terms (recommended)
Drop `/advice-guides`, `/rafa`, `/fund-administrators`. Build stub `privacy.html` and `terms.html` with placeholder copy ("Privacy policy coming — contact us in the meantime") so the links work.

### D3 — Build all 5 as stub pages
More work, no dead links, but stub content isn't useful and signals incompleteness.

### D4 — Keep everything as-is
Same as the current live Padua site. Footer has dead links. Bad UX.

---

## E. `/news-insights` integration

The nav and footer link to `/news-insights`. This is supposed to be the Webflow CMS content (44 articles). Currently 404 on the static site.

### E1 — Leave the link as `/news-insights` until we set up the Cloudflare Worker proxy
This is the proper long-term plan (hybrid: static marketing + Webflow CMS proxied). Currently broken; we'd ship the proxy in a follow-up. Recommend this if you commit to building the proxy soon.

### E2 — Temporarily point at the Webflow URL `https://www.paduasolutions.com/news-insights`
External link, works right now. When proxy is ready, swap back to `/news-insights`. Ugly URL bar (different domain) but no dead link in the meantime.

### E3 — Remove from nav/footer for now
Don't link to News at all until the proxy is ready. Cleaner but readers can't find the news section.

### E4 — Set up the proxy now
~30 min of work (Cloudflare Worker that fetches `paduasolutions.com/news-insights/*` and returns the response). Then `/news-insights` works natively. Larger scope but solves the issue permanently.

---

## F. `/contact` vs `/contact-us`

Nav and footer currently link to `/contact` (matches the original Padua site nav). But the page we built is at `/contact-us`. So clicks from the nav hit a 404.

### F1 — Update all nav + footer links to `/contact-us` (recommended)
Matches the actual page URL. One link substitution.

### F2 — Rename our page from `/contact-us` to `/contact`
Same end result, different direction. Webflow site has both URLs (slight duplication) so either works. `/contact` is shorter.

### F3 — Build both
Make `/contact.html` a duplicate of `/contact-us.html`. Both work.

---

## Quick-answer suggestion

If you just want sensible defaults: **A1, B3, C1, D2, E1, F1**.

I can apply that set with one command — say "apply defaults" and it's done in ~2 minutes. Otherwise just tell me your picks.
