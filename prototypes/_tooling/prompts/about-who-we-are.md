# Generation prompt: /about/who-we-are

**Use this prompt in a new Claude.ai chat in the Padua Website project after uploading the reference files.**

## Prep files to upload to Claude.ai project (if not already there)

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ should already be uploaded | `padua-marketing/prototypes/_tooling/canonical-nav.html` |
| `canonical-footer.html` ✅ should already be uploaded | `padua-marketing/prototypes/_tooling/canonical-footer.html` |
| `about-who-we-are-page.html` | `padua-marketing/prototypes/reference/about-who-we-are/page.html` |
| (optional, for visual context) `our-why-2x.png` | `padua-marketing/prototypes/reference/about-who-we-are/images/69363dff23a85b83ba6c2f65_0da60cacc5f7165fed6b8103cdc2ef03_our-why-2x.png` |
| (optional) `padua-how-2x.png` | `padua-marketing/prototypes/reference/about-who-we-are/images/693667d840442f25e9d46d59_padua-how-2x.png` |
| (optional) `24.jpg` (office/team photo) | `padua-marketing/prototypes/reference/about-who-we-are/images/652f73fd0a043e1ac8092d5c_24.jpg` |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project from earlier.

## Generation prompt — paste into a new chat

````
Generate a new /about/who-we-are page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: Tell the Padua origin story. Build trust through the founder 
narrative (Anne-Marie and Matthew Esler), the Italian family connection (named 
after their brother Anthony and the city of Padua), the Australian-owned and 
Kiama-headquartered identity, and the company's "Why" and "How". This is a 
brand/credibility page — visitors should leave feeling Padua is human, 
intentional, and trustworthy.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html (uploaded to this project)
- Use the EXACT footer from canonical-footer.html (uploaded to this project)
- Set the ACTIVE nav state on "About" — change the existing `active` class 
  from "Advisers & Licensees" to the "About" nav-link (the one with 
  href="/about/who-we-are")

REAL CONTENT TO PRESERVE (from the existing live page):

Mission positioning (use as is or refine slightly):
"Padua connects financial advisers with highly skilled human resources and 
intelligent, proprietary technology."

Founder story (use verbatim or close — this is the brand's heart):
"We're Anne-Marie and Matthew Esler, founders of Padua, a company that, 
despite its Italian name, is 100% Australian-owned and operated. Named in 
tribute to our brother Anthony and the city of Padua in Italy, we're deeply 
rooted in family values, with our Head Office in Kiama, New South Wales."

Two named structural concepts to feature with their illustrations:
- "Our Why" — the underlying motivation for Padua's existence (the illustration 
  visualizes this conceptually)
- "Padua How" — the operational model / what Padua does (the illustration 
  shows the methodology)

EARS values framework (from the v3 prototype — these are Padua's stated 
values, use them):
- E — Empathy: Listen first
- A — Agility: Move with you
- R — Reliability: SLAs met
- S — Simplicity: Cut complexity

Trust signals to include:
- 100% Australian-owned and operated
- Head Office: Kiama, NSW (regional pride is part of the brand)
- ISO 27001 Certified

IMAGE MANIFEST — use these exact Webflow CDN URLs (already hosted, return 200):

Conceptual illustrations (FEATURED — these are the main visuals on this page):
- "Our Why" diagram: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/69363dff23a85b83ba6c2f65_0da60cacc5f7165fed6b8103cdc2ef03_our-why-2x.png
- "Padua How" diagram: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/693667d840442f25e9d46d59_padua-how-2x.png

Hero/section photo (office or team — use as background or accent):
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/652f73fd0a043e1ac8092d5c_24.jpg

Trust signal:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (already in canonical-nav.html and canonical-footer.html — 
do not duplicate):
- Logo: handled by canonical components

PROPOSED STRUCTURE:

1. Nav (canonical, active = About)

2. Hero (H2 — centered hero pattern, NOT split-with-photo)
   - Eyebrow: "About Padua"
   - Headline (display font): "Connecting advisers with skilled people and 
     intelligent technology"
     (or similar — use the mission positioning above)
   - Sub: brief one-line elaboration about the mission
   - Subtle: the Italian/Australian dual identity is a signature feature. 
     Don't bury it.
   - No CTA buttons in hero — this is a story page, lead readers into the 
     story instead

3. Founder story section (S4 — two-column or full-width narrative)
   - Pull-quote treatment for the "We're Anne-Marie and Matthew Esler..." 
     passage. Display-font italic, methodology purple accent.
   - Could be styled as a brand-defining moment, not just another paragraph
   - Photo option: use the 24.jpg office photo OR a stylized abstract 
     spectrum gradient block, designer's choice — match the v3 prototype's 
     about-visual aesthetic

4. "Our Why" section (S4 — two-column with illustration on one side)
   - Use the `our-why-2x.png` illustration on one side
   - Text on other side: brief framing of WHY Padua exists (the macro 
     problem — financial advice shortage, complexity, cost barriers)
   - Tone: aspirational but concrete

5. "Padua How" section (S4 — two-column with illustration, alternate side)
   - Use the `padua-how-2x.png` illustration on the OTHER side from "Our Why" 
     (left-right alternation for visual rhythm)
   - Text on other side: brief framing of HOW Padua delivers (the methodology, 
     the people + tech combination)
   - Bridge to the EARS values

6. EARS values section (matches v3 prototype's .about-values grid pattern)
   - 4 cards in a row (mobile: 2x2)
   - Each card: huge display-font letter (color-coded: E=purple/Discover, 
     A=pink/Compare, R=red/Recommend, S=orange/Review)
   - Below letter: short name + one-line description
   - This visually echoes the methodology spectrum

7. Trust + identity section (S5-style stats strip, or alternative layout)
   - "100% Australian owned and operated"
   - "Head Office: Kiama, NSW" (sense of place matters here)
   - "ISO 27001 Certified" (with the badge SVG inline)
   - "Family values, founder-led"
   - Could be 3-4 cards or a horizontal strip — designer's choice

8. (Optional) "Meet the team" teaser
   - One sentence + link to /about/our-people
   - "Want to meet the people behind Padua? View our team →"
   - This is a soft handoff to the team page, not the main content

9. CTA banner (S8 — spectrum gradient)
   - Headline: "Ready to build something with us?"  (or similar — soft, 
     story-aligned, not aggressive sales)
   - Primary CTA: "Book a demo"
   - Secondary: "Get in touch" → /contact-us

10. Footer (canonical, no edits)

OUTPUT REQUIREMENTS (matching prior generations):
- Single self-contained HTML file
- All CSS inline in <style> in <head>
- Google Fonts only as external dependency (Newsreader + Geist)
- Full SEO meta tags:
  - <title>About Padua — Who we are | Padua Solutions</title>
  - <meta name="description" content="..."> (150-160 chars covering the 
    founder story, Australian-owned, Kiama HQ)
  - <link rel="canonical" href="https://paduasolutions.com/about/who-we-are">
  - OpenGraph (use the 24.jpg as og:image)
  - Twitter Card (summary_large_image)
- Mobile responsive — breakpoints: 991px, 767px, 479px
- Match v3 prototype's CSS architecture: :root variables, semantic class 
  names
- Images via the Webflow CDN URLs above (NOT local images/ paths)
- Brand voice: "we" first person, active, concrete, warm but professional. 
  This page especially leans WARMER than the services/advisers-licensees 
  pages because it's the brand-story page.

VERIFY BEFORE OUTPUT:
- No invented facts about Anne-Marie or Matthew (only use what's in the 
  content provided)
- No invented stats
- Active nav state: "About" nav-link has class="active" (NOT "Advisers & 
  Licensees" — that's only for the services and advisers-licensees pages)
- All internal hrefs use real URLs (/about/our-people, /about/careers, 
  /contact-us, /book-a-demo, etc.)
- The illustrations (our-why-2x, padua-how-2x) are the visual centerpiece 
  of the middle sections — make them prominent, not afterthoughts
````
