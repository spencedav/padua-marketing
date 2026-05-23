# Generation prompt: /concierge

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `concierge-page.html` | `padua-marketing/prototypes/reference/concierge/page.html` |
| *(optional)* `tms process--03.svg`, `tms process--04.svg` | `padua-marketing/prototypes/reference/concierge/images/` |

## Page intent

`/concierge` is the **white-glove framing** of Padua's Transition Management Program (TMP). It's the SERVICE positioning — "we'll do the entire program for you, end-to-end". The companion page `/ready-set-go` covers the same methodology in DEPTH (the four stages: On your mark / Ready / Set / Go). Treat `/concierge` as the executive-summary version, `/ready-set-go` as the detailed version.

## Generation prompt — paste into a new chat

````
Generate a new /concierge page for paduasolutions.com using the v3 prototype's 
visual direction.

GOAL OF PAGE: Position Padua's Concierge as the "we handle everything" 
managed service for advice firms running platform/investment transitions. 
The page should feel premium, calm, and reassuring — "you don't have to 
project-manage this; we do." Convert to "Book a demo" or "Contact us".

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "Advisers & Licensees" — Concierge lives 
  under that audience as a service offering.

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy:
- Eyebrow: "Concierge"
- Headline (display font): something like "We project-manage your 
  transitions, end-to-end" or "Padua Concierge — your transition, our 
  program"
- Sub-paragraph (preserve close to live): 
  "Our technology creates efficiency and scalability, while our expert 
  team project-manage the entire Transition Management Program for you."
- Primary CTA: "Book a demo" → /book-a-demo
- Secondary: "Contact us" → /contact-us

Three methodology pillars (preserve the names exactly — these are signature 
to Padua's TMP brand):

1. **On your mark — Fee Comparison**
   "We provide advice firms with a platform fee comparison ($ & %) of 
   their client's existing platforms & investments against the recommended 
   scenario. This helps the advice firm identify potential cost & benefit 
   enhancements from moving platform or investment strategies and make 
   informed decisions with clear data."

2. **Set — Engagement**
   "We segment the advice firm's client base and get you set for client 
   engagement. We've developed an advice request system that knows when 
   implementation packs are required. We segment the advice firm's clients 
   by costs, benefits, platform, adviser, FUA, advice type, number of 
   products and much more."

3. **Go — Implementation**
   (Reuse from /ready-set-go content) "We produce the implementation pack 
   for each advice firm client, including SOA, application & other 
   transition documentation. We integrate with the advice firm's CRM to 
   push back into the client folder."

(NOTE: The full 4-stage methodology — including "Ready — Analysis" — lives 
on /ready-set-go. On /concierge we condense to 3 stages for the executive-
summary view, OR show 4 with brief copy.)

IMAGE MANIFEST — use these Webflow CDN URLs (verified 200):

Process visualizations (use prominently in the methodology section):
- TMS Process diagram 1: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67ca29ea3ad4333877ef8368_tms%20process--03.svg
- TMS Process diagram 2: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67ca29ea1bf4ebdae7109d64_tms%20process--04.svg

Dashboard screenshot:
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6633148ab59818c47d840303_Screenshot%202024-04-23%20at%201.51.01%E2%80%AFPM.png

Trust signal:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical files — don't duplicate):
- Logo handled via canonical
- Touch icon (favicon — KEEP HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = Advisers & Licensees)
2. Hero (H1 split, NO photo — use spectrum gradient block or stylized 
   dashboard mockup on right)
3. Brief framing section — "What Concierge is, who it's for"
4. Methodology section — 3 stage cards (On your mark / Set / Go), each 
   methodology-colored (purple/pink/red), with brief description and one 
   of the TMS process SVGs as visual
5. Dashboard preview section — using the dashboard screenshot, 
   "Track progress in real time" framing
6. "Why Padua Concierge" — 3-4 trust signals (100% onshore, ISO 27001, 
   end-to-end, expert team)
7. Link to full methodology — "See the full Transition Management Program → 
   /ready-set-go" (soft handoff)
8. CTA banner (S8 — spectrum gradient): "Ready to hand off your next 
   transition?" → Book a demo + Contact us
9. Footer (canonical)

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags (title: "Padua Concierge — Project-managed 
  Transitions | Padua Solutions"; canonical: 
  https://paduasolutions.com/concierge; OG/Twitter cards)
- Responsive breakpoints 991/767/479px
- v3 prototype CSS conventions
- Active nav on Advisers & Licensees
- Favicon URL has hyphens preserved
- All internal hrefs use real URLs

VERIFY BEFORE OUTPUT:
- No invented stats or claims beyond real content above
- Active nav correct
- All hrefs use real URLs
````

Save as `padua-marketing/concierge.html` and tell me.
