# Generation prompt: /product-providers

**Use this prompt in a NEW Claude.ai chat in the Padua Website project after uploading the reference files.**

## Prep files to upload to Claude.ai project

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-nav.html` |
| `canonical-footer.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-footer.html` |
| `product-providers-page.html` (rename if collides) | `padua-marketing/prototypes/reference/product-providers/page.html` |
| *(optional)* 3-4 partner logos for visual context | `padua-marketing/prototypes/reference/product-providers/images/*-logo.*` |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project.

## Generation prompt — paste into a new chat

````
Generate a new /product-providers page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: This is the primary audience landing for platforms, super 
funds, investment managers, insurance companies, and consultants — the 
"B2B serving the B2B" audience. Where /advisers-licensees serves advice 
firms, this page serves the firms that supply the platforms, products, 
and infrastructure those advice firms USE. The page should position Padua 
as the partner that helps these institutions reach advisers and the wider 
advice market through tech-enabled transition services, technology 
integration, and data + research insights.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "Platforms & Super Funds" — change any 
  existing `active` class to the Platforms & Super Funds nav-link 
  (href="/platforms-super-funds"). This page is the umbrella for that 
  audience.

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy (use verbatim or refine slightly):
- Eyebrow: "For Product Providers"
- Headline (display font): something like "Purpose-built solutions for 
  platforms, super funds and investment managers" or "Where product meets 
  the advice market"
- Sub-paragraph (preserved closely from live page): 
  "Product providers including platforms, super funds, investment managers 
  and insurance companies benefit from Padua's tech-enabled transition 
  services, technology integration and development, and data & research 
  insights."
- Primary CTA: "Book a demo" → /book-a-demo
- Secondary: "Contact us" → /contact-us

Three positioning concepts (the page's main framing for what Padua does 
for this audience):

1. Tech-Enabled Services — "We can help you reach your future state, 
   faster. Transition Management — our teams wrap around your business 
   to gain a deep understanding of your requirements and enable financial 
   advisers to deliver clear, compliant and client friendly advice."

2. Software — "Experience a streamlined advice process with our software, 
   empowering you to focus on meaningful client interactions. Our teams 
   wrap around your business to gain a deep understanding of your 
   requirements." (Links to /software for full software story.)

3. Product Solutions — "Providing the product solutions of tomorrow with 
   today's innovation."

Two sub-audience stream cards (these expand the "Product Providers" 
audience into specific buckets):

1. **Platform & investment management solutions**
   "We empower platforms & investment managers with innovative solutions 
   to enhance growth."

2. **Business & compliance consultant solutions**
   "We collaborate with management consultants & practice consultants 
   leveraging our data, technology and transition capabilities."

Trust signal set ("Our trusted partners" — same partner logos as 
/advisers-licensees, slightly different subset on this page):

IMAGE MANIFEST — use these Webflow CDN URLs (all verified 200):

Partner logos (use in a "Our trusted partners" / "Trusted by" grid):
- Invest Blue: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bc7c2c651309362b971_Invest-Blue-logo.png
- Count Group: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432967106c4a51312feed5_count-logo.svg
- Fitzpatricks: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432b303137cb430dca61eb_Fitzpatricks.png
- Findex: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432b57c2c6513093627772_findex.jpeg
- Emerge Paper: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bf4453f23c395598081_emerge-paper.png
- Lifewealth: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65668e6b3b36a4ccecb4100c_lifewealth-white.png

Trust signal:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical files — don't duplicate):
- Logo: 6576818ef2c374d506d75b90_padua-logo-horizontal.svg
- Touch icon (favicon — KEEP THE HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

NOTE: This page intentionally has no dedicated hero photo or illustrations 
(unlike /services with DSC photos, or /advisers-licensees with the Compare 
animation). The hero must be design-driven — use the brand spectrum 
gradient, methodology color blocks, or a stylized abstract visual (e.g., 
the same approach as /advisers-licensees: text on left, gradient block 
on right).

PROPOSED STRUCTURE:

1. Nav (canonical, active = Platforms & Super Funds)

2. Hero (H1 split layout, design-driven — NO photo)
   - Left: eyebrow + headline + sub + CTAs (as above)
   - Right: spectrum-gradient block or stylized methodology-color 
     composition (similar to /advisers-licensees hero)

3. Intro section (S4 — two-column with abstract visual)
   - Brief paragraph expanding the audience positioning: who this serves 
     (platforms, super funds, investment managers, insurance, consultants)
   - Why Padua specifically — onshore, tech-enabled, scaled, established

4. Two-sub-audience picker (similar to v3 prototype's stream cards)
   - Card 1: "Platform & investment management solutions" (methodology 
     color: Compare/pink or Discover/purple)
   - Card 2: "Business & compliance consultant solutions" (different 
     methodology color)
   - Each card: brief positioning + "Learn more →" link 
     (link target: link to anchors within this same page for now — 
     #platforms or #consultants — OR link to /contact-us if no anchor target)

5. Three pillars: what Padua delivers for Product Providers
   Three cards/sections, one for each pillar:
   
   a) Tech-Enabled Services
      - Color: Compare/pink accent
      - Description: from real content above (Transition Management 
        section)
      - CTA link: → /services
   
   b) Software
      - Color: Discover/purple accent
      - Description: from real content above
      - CTA link: → /software
   
   c) Product Solutions
      - Color: Recommend/red accent
      - Description: from real content above
      - CTA link: → /contact-us (no dedicated page exists for this yet)

6. Methodology timeline (S3 pattern)
   - Horizontal Discover → Compare → Recommend → Review
   - Brief reference to how Padua's methodology applies to Product 
     Providers (each step has implication for platform/super fund work)
   - Optional — only if it strengthens the page

7. "Our trusted partners" section (C2 / partner logo grid)
   - Eyebrow: "Trusted by"
   - Headline: "Our trusted partners"
   - 6 partner logos (Invest Blue, Count Group, Fitzpatricks, Findex, 
     Emerge Paper, Lifewealth) in a clean grid
   - Greyscale by default, color on hover (matches v3 .partner pattern)

8. Trust signals strip
   - "100% Australian onshore"
   - "ISO 27001 Certified" (with badge SVG inline)
   - "Tech-enabled, end-to-end"
   - One more defensible signal if appropriate

9. CTA banner (S8 — spectrum gradient)
   - Headline: "Ready to partner with Padua?"
   - Primary CTA: "Book a demo" → /book-a-demo
   - Secondary: "Contact us" → /contact-us

10. Footer (canonical, no edits)

OUTPUT REQUIREMENTS:
- Single self-contained HTML file
- All CSS inline in <style> in <head>
- Google Fonts only as external dependency (Newsreader + Geist)
- Full SEO meta tags:
  - <title>For Product Providers — Platforms, Super Funds, Investment 
    Managers | Padua Solutions</title>
  - <meta name="description"> (150-160 chars covering platforms / super 
    funds / investment managers, tech-enabled transition services, 
    Australian onshore)
  - <link rel="canonical" href="https://paduasolutions.com/product-providers">
  - OpenGraph (use the Padua logo SVG as og:image since no dedicated hero 
    photo)
  - Twitter Card (summary_large_image)
- Mobile responsive — breakpoints: 991px, 767px, 479px
- Match v3 prototype's CSS architecture: :root variables, semantic class 
  names
- Images via the Webflow CDN URLs above (NOT local images/ paths)
- Favicon link points to ...Padua-touch-icon.png (WITH hyphens preserved)
- Brand voice: confident, B2B-formal-but-not-stiff, focused on partnership 
  framing (Padua as a partner, not vendor). Avoid jargon. Use "we" first 
  person.

VERIFY BEFORE OUTPUT:
- No invented case studies, deal sizes, or partner relationships beyond 
  the 6 partner logos listed
- No invented stats or growth numbers
- Active nav state on "Platforms & Super Funds" (NOT "Advisers & 
  Licensees", NOT "About")
- Favicon URL has hyphens preserved
- All internal hrefs use real URLs (/, /services, /advisers-licensees, 
  /software, /book-a-demo, /contact-us, /about/who-we-are, 
  /about/our-people, /about/careers, /mortgage-brokers)
- "Platform & investment management solutions" and "Business & compliance 
  consultant solutions" are presented as TWO sub-audiences, not invented 
  product names
````

## After save

Save as `padua-marketing/product-providers.html` and tell me. I'll diff/verify/deploy.
