# Generation prompt: /about/our-people

**Use this prompt in a new Claude.ai chat in the Padua Website project after uploading the reference files.**

## Prep files to upload to Claude.ai project

| File | From repo path | Notes |
|---|---|---|
| `canonical-nav.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-nav.html` | |
| `canonical-footer.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-footer.html` | |
| `about-our-people-page.html` | `padua-marketing/prototypes/reference/about-our-people/page.html` | Real content from live page |
| *(optional)* 3-4 sample team headshots | `padua-marketing/prototypes/reference/about-our-people/images/*.jpg` | Pick 3-4 for visual reference (different aspect ratios / lighting); skip if context budget is tight |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project.

## Generation prompt — paste into a new chat

````
Generate a new /about/our-people page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: A "meet the team" page that humanizes Padua. The team page 
matters for brand trust — for B2B buyers, knowing the actual people behind 
the company removes risk. The page should feel warm, real, and well-organized.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "About" — change any existing `active` class 
  to the "About" nav-link (href="/about/who-we-are")

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy (use as-is or refine slightly):
- Eyebrow: "Team Spotlight"
- Headline (display font): "Welcome to our family"
- Sub-paragraph: "We're proud to introduce you to some of the talented 
  people who make Padua a place of collaboration and achievement."

The live site groups the team into THREE sections — preserve this structure:

1. **Board** (founders + board members, no titles shown on live site — just 
   names. Treat them as the founding/governance team):
   - Anne-Marie Esler  (co-founder — established in /about/who-we-are story)
   - Matthew Esler  (co-founder — established in /about/who-we-are story)
   - Gareth Turner
   - Peter O'Connell
   - Matt Sheehan

2. **Leadership Team** (heads of departments — titles ARE shown on live site):
   - Helen Roelofsen — Head of Concierge Services
   - Brett Canning — Head of Sales & Relationship Management
   - Rudy Haddad — Head of Research, Data & Technical Advice
   - Erin Egan — Head of HyperCare

3. **Team Spotlight** (other team members shown by name + title):
   - Simon Dawe — Delivery Executive
   - Josh Marley — (title not on live site; leave title blank or use generic 
     "Padua Team")
   - Amir Moghami — (title not on live site; leave blank or generic)

CRITICAL: do NOT invent roles for anyone whose role isn't listed above. If 
a role wasn't on the live page, leave it blank or use a generic "Padua Team" 
label. Real bios should never be invented under any circumstances.

IMAGE MANIFEST — use these Webflow CDN URLs (already hosted, all return 200):

Board (5 headshots):
- Anne-Marie Esler: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699546a176bf5d4e8d486bc1_anne-marie.jpg
- Matthew Esler: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699517dc75824922aa5497b7_matthew-esler.jpg
- Gareth Turner: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699523b8048443520bcdfe10_gareth-turner.jpg
- Peter O'Connell: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6995392e34a6ed7d726f2e09_peter-oconnell.jpg
- Matt Sheehan: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/69953ee30dbb7f90bf16eabd_matt-sheehan-2023.jpg

Leadership Team (4 headshots):
- Helen Roelofsen: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/69950dbf21bc65020713efab_helen-roelofsen.jpg
- Brett Canning: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699553829289fe67d59523c8_brett-canning.jpg
- Rudy Haddad: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699555f26d98951e7f901b19_rudy-haddad.jpg
- Erin Egan: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/69963d3531bc6e9dc9985058_erin-egan-crop.jpg

Team Spotlight (3 headshots):
- Simon Dawe: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/69954c938b3a30e2efeadc61_simon-dawe.jpg
- Josh Marley: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699512e79b5ea6f88d78bf88_josh-marley.jpg
- Amir Moghami: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/699635f08eb8418ba375d975_amir-moghami.jpg

Padua brand (in canonical-nav.html and canonical-footer.html — don't duplicate):
- Logo: 6576818ef2c374d506d75b90_padua-logo-horizontal.svg
- Touch icon (for the favicon — note the hyphens, don't strip them): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = About)

2. Hero (H2 — centered hero pattern)
   - Eyebrow: "Team Spotlight"
   - Headline: "Welcome to our family"
   - Sub: the welcome sentence
   - No CTAs in hero — let the team carry the page

3. Board section
   - Section eyebrow: "Board"
   - Section heading (h2): something like "The people who built Padua" or 
     "Our board" — designer's call
   - Grid of 5 cards (3-column desktop, 2-column tablet, 1-column mobile)
   - Each card: large rounded-corner headshot, name (display font), no role 
     (intentionally blank on live page for Board members)
   - Subtle styling: warm but understated, with thin border or soft shadow
   - Anne-Marie and Matthew specifically: feature them slightly more 
     prominently (e.g., first two cards in the grid, slightly larger, or 
     with a small "Co-founder" eyebrow above their names)

4. Leadership Team section
   - Section eyebrow: "Leadership Team"
   - Section heading (h2): something like "Heads of practice" or 
     "Leadership team"
   - Grid of 4 cards (4-column desktop, 2-column tablet, 1-column mobile)
   - Each card: rounded headshot, name (display font), title (smaller, 
     methodology-color accent — possibly Compare/pink for visual rhythm)

5. Team Spotlight section
   - Section eyebrow: "Team Spotlight"
   - Section heading (h2): "Meet the team" or "Team Spotlight"
   - Grid of 3 cards (3-column desktop, 2-column tablet, 1-column mobile)
   - Each card: same pattern as Leadership Team
   - If a title is blank for someone, just show name (don't insert placeholder)

6. Values / culture beat (optional but recommended)
   - One short section bridging team → values
   - Could pull in the EARS values briefly OR mention culture concepts 
     like "100% Australian onshore", "family-led", "Kiama-headquartered"
   - Keep it short — the team grid IS the page's content

7. Careers teaser
   - One sentence: "We're always interested in talented people. View our 
     open roles →" → link to /about/careers
   - Soft pivot, not aggressive

8. CTA banner (S8 — spectrum gradient)
   - Headline: "Want to work with us?" or similar (gentle, story-aligned)
   - Primary CTA: "Book a demo" → /book-a-demo
   - Secondary: "Get in touch" → /contact-us

9. Footer (canonical, no edits)

OUTPUT REQUIREMENTS:
- Single self-contained HTML file
- All CSS inline in <style> in <head>
- Google Fonts only as external dependency (Newsreader + Geist)
- Full SEO meta tags:
  - <title>Our People — Meet the Padua team | Padua Solutions</title>
  - <meta name="description"> (150-160 chars about the team, founders, 
    onshore Australian focus)
  - <link rel="canonical" href="https://paduasolutions.com/about/our-people">
  - OpenGraph (use one of the team photos as og:image, e.g., the Esler 
    co-founder photo)
  - Twitter Card (summary_large_image)
- Mobile responsive — breakpoints: 991px, 767px, 479px
- Match v3 prototype's CSS architecture: :root variables, semantic class names
- Images via the Webflow CDN URLs above (NOT local images/ paths)
- Favicon link: use the Padua-touch-icon URL with hyphens preserved 
  (don't strip them)
- Brand voice: "we" first person, active, warm. This is a humanizing page 
  — the team is the content, so the writing around them should be 
  understated and let the people shine.

VERIFY BEFORE OUTPUT:
- No invented roles or bios for anyone not explicitly listed above
- No invented stats
- Active nav state: "About" nav-link has class="active"
- All 12 team headshot URLs included exactly as listed above
- Favicon link points to ...Padua-touch-icon.png (WITH hyphens)
- All internal hrefs use real URLs (/about/who-we-are, /about/careers, 
  /contact-us, /book-a-demo, etc.)
````

## After save

When you save as `padua-marketing/about/our-people.html` and tell me, I'll:
- Diff nav + footer against canonical (verify active state moved to "About")
- Verify all 12 team headshot URLs return 200
- Fix the recurring touch-icon hyphen-strip if it happens again
- Commit + push + verify live URL serves
