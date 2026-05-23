# Generation prompt: /software

**Use this prompt in a NEW Claude.ai chat in the Padua Website project after uploading the reference files.**

## Prep files to upload to Claude.ai project

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-nav.html` |
| `canonical-footer.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-footer.html` |
| `software-page.html` (rename if collides) | `padua-marketing/prototypes/reference/software/page.html` |
| *(optional)* 3-4 key product screenshots | `padua-marketing/prototypes/reference/software/images/Home.png`, `Recommend-strategies.png`, `compare-screen-v2.png`, `Padua-Product-Compare.svg` |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project.

## Important — discrepancy you'll see

The canonical nav's "Software" mega-menu lists 5 sub-products (WealthX, WealthReview, SteveAI, WealthAI, Wealth Data), but the **actual live `/software` page features only 4 products under methodology names** (Padua Home, Discover, Compare, Recommend). The live page is the source of truth — use the 4 methodology-aligned products for this page generation. We'll reconcile the nav separately later.

## Generation prompt — paste into a new chat

````
Generate a new /software page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: The flagship product showcase. Visitors should understand 
that Padua's software covers the four stages of advice (Home / Discover / 
Compare / Recommend), how each product helps an adviser, and that real 
advice firms (Invest Blue, others) rely on this software. The page should 
convince an adviser that "I want this stack" and convert to "Book a demo".

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "Advisers & Licensees" — change any existing 
  `active` class to the Advisers & Licensees nav-link 
  (href="/advisers-licensees"). Software lives under that audience.

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy:
- Eyebrow: "Tech-Enabled Paraplanning"
- Headline (display font): "Padua Software is unlimited for advisers and 
  support staff" (or refine to something punchier)
- Sub: "Using our Tech-Enabled Solutions, reduce your tech stack now."
- Primary CTA: "Book a demo" → /book-a-demo
- Secondary CTA: "Contact us" → /contact-us

Brand framing concept (signature to this page):
"The unattainable triangle is attainable with Padua."
This refers to the classic Quality / Cost / Speed (Turnaround) triangle 
that's normally a "pick two" trade-off. Padua claims to solve all three.

Three differentiator cards (matches v3 prototype's diff-section pattern):
1. Better Quality — "Our team of experts uses our technology to help you 
   generate high quality advice — each advice output generated to meet 
   your client's unique needs."
2. Better Value — "By leveraging our Software, we pass the savings on to 
   you, ensuring you get the best value."
3. Better Turnaround — "We understand that saving time means saving money. 
   Our dedicated team ensure your plans are turned around quickly."

The 4 products (in this order, each gets its own section):

1. **Padua Home** — The product hub. "A comprehensive tool for tracking 
   client engagements and the advice given, with visual insights at every 
   step." Use the Home.png screenshot.

2. **Discover** — Digital fact-finding. "Discover enables transparent 
   digital fact-finding with comprehensive API integration with your CRM." 
   Methodology color: Purple.

3. **Compare** — Platform/investment comparison. "Easily compare your 
   clients' platforms and investments against recommended and alternative 
   positions." Stats: **1.8k+ Platforms · 22k+ Investments**. Use the 
   compare-screen-v2.png screenshot. Methodology color: Pink/Magenta.

4. **Recommend** — Strategy engine. "Recommend allows you to make strategy 
   recommendations across 850+ technical strategies." Use the 
   Recommend-strategies.png screenshot. Methodology color: Red.

Two testimonials (reuse from /advisers-licensees — same quotes appear on 
both pages):

Testimonial 1:
"We've been able to leverage Padua's expertise and interactive software, 
with our internal offering, to ensure we provide our clients with quality 
advice, in an efficient manner. Their efficiency has played a key role in 
the quality of our service offering to our clients."
— Sarah Humm, National Adviser Support Manager

Testimonial 2:
"Padua has always been a dependable partner in providing Invest Blue with 
an efficient and flexible outsourced paraplanning solution. With easy-to-
use technology, Padua provides us with what our business values most; 
high-quality advice documents and fast turnaround times."
— Nick Stannard, Head of Advice & Compliance, Invest Blue

IMAGE MANIFEST — use these Webflow CDN URLs (all verified 200):

Product logos (white-on-dark, intended for use on dark/colored backgrounds):
- Padua Home (logo): https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/664d7988439f2faf5bc586f7_home-logo.svg
- Discover (logo): https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/664eedfd4e22eb81f4af3c24_discover-logo-white.svg
- Compare (logo): https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/664d792c3b0badd749e04115_Padua-Product-Compare.svg
- Recommend (logo): https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66502571eb964a084dc9ddd5_recommend-logo-white.svg

Product screenshots (use prominently in each product's section):
- Padua Home screen: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/652f7224fdea641a755edd88_Home.png
- Compare screen: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67649e498c56de41125e557b_compare-screen-v2.png
- Recommend screen: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65dfb237dcb19a8c7896fb9c_Recommend-strategies.png
- (Discover doesn't have a dedicated screen — use the brand spectrum 
  gradient + Discover logo on a methodology-purple background, OR 
  reuse the Padua Home screen with a Discover-themed overlay)

Triangle SVGs (use in the "Unattainable triangle" / differentiators 
section — these are signature brand visuals):
- Unattainable triangle (centerpiece, illustrates the Q/C/T trade-off): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d111929108642818ba2d22_unattainable-triangle-final.svg
- Quality triangle: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66c42b290ae0a979bf19ffba_quality-triangle.svg
- Cost triangle: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d111ac0f8cf11f3b8cfefd_cost-triangle.svg
- Turnaround triangle: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d111acb727c54a0d1e85e5_turnaround-triangle.svg

Partner logos (use in a "Trusted by" row):
- Invest Blue: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bc7c2c651309362b971_Invest-Blue-logo.png
- Findex: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432b57c2c6513093627772_findex.jpeg

Trust signal:
- ISO 27001 Certified Badge: 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical files — don't duplicate):
- Logo: 6576818ef2c374d506d75b90_padua-logo-horizontal.svg
- Touch icon (favicon — KEEP THE HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = Advisers & Licensees)

2. Hero (H1 split layout — text + product visual)
   - Eyebrow: "Tech-Enabled Paraplanning"
   - Headline + sub (above)
   - Primary CTA + secondary CTA (above)
   - Right side: a stylized product mockup (e.g., the Padua Home screenshot 
     on a tilted laptop frame, with subtle methodology-spectrum glow behind)

3. "The unattainable triangle is attainable" section
   - Display-font headline: "The unattainable triangle is attainable with 
     Padua."
   - Brief paragraph: introduce the Q/C/T trade-off concept — "Quality, 
     cost, turnaround — pick two? Not with Padua."
   - Center the `unattainable-triangle-final.svg` prominently (the 
     signature illustration)
   - This is a hero-style brand moment, give it room

4. Three differentiator cards (matches v3 .diff-card pattern)
   - Better Quality (using `quality-triangle.svg` as the icon, Discover/
     purple accent)
   - Better Value (using `cost-triangle.svg` as the icon, Compare/pink 
     accent)
   - Better Turnaround (using `turnaround-triangle.svg` as the icon, 
     Recommend/red accent)
   - Each: triangle icon + headline + description (from above)

5. Product showcase — 4 sections, alternating side
   Each product gets its own section, alternating image-left / image-right 
   for visual rhythm. Each section:
   - Methodology-color accent strip OR background tint
   - Product logo (white on the methodology color, or full color on white)
   - Product name (display font, large)
   - Description (1-2 sentences from real content above)
   - Stats (where applicable — Compare has 1.8k+ / 22k+; Recommend has 850+ 
     strategies)
   - "Book a demo" CTA link → /book-a-demo
   - Product screenshot (large, prominent)
   
   Order:
   - Padua Home (no specific methodology color — neutral)
   - Discover (purple)
   - Compare (pink/magenta) + the 1.8k+ Platforms / 22k+ Investments stats
   - Recommend (red) + 850+ technical strategies stat

6. Two testimonials (display-font italic, side-by-side desktop, stacked 
   mobile)
   - Sarah Humm and Nick Stannard quotes from above
   - Optional small partner logos beside each (Invest Blue logo with 
     Nick's quote)

7. Trust strip — "Trusted by Australian advice firms"
   - Partner logos (Invest Blue + Findex are what we have)
   - ISO 27001 badge inline
   - "100% Australian onshore" pill

8. CTA banner (S8 — spectrum gradient)
   - Headline: "Ready to reduce your tech stack?" or similar
   - Primary CTA: "Book a demo" → /book-a-demo
   - Secondary: "Talk to us" → /contact-us

9. Footer (canonical, no edits)

OUTPUT REQUIREMENTS:
- Single self-contained HTML file
- All CSS inline in <style> in <head>
- Google Fonts only as external dependency (Newsreader + Geist)
- Full SEO meta tags:
  - <title>Padua Software — Home, Discover, Compare, Recommend | Padua 
    Solutions</title>
  - <meta name="description"> (150-160 chars covering the 4 products, the 
    unattainable triangle, Australian onshore)
  - <link rel="canonical" href="https://paduasolutions.com/software">
  - OpenGraph (use Recommend-strategies.png or Home.png as og:image)
  - Twitter Card (summary_large_image)
- Mobile responsive — breakpoints: 991px, 767px, 479px
- Match v3 prototype's CSS architecture: :root variables, semantic class 
  names
- Images via the Webflow CDN URLs above (NOT local images/ paths)
- Favicon link points to ...Padua-touch-icon.png (WITH hyphens preserved)
- Brand voice: confident, product-led, technical-but-accessible. The page 
  is selling capability — show, don't tell.

VERIFY BEFORE OUTPUT:
- 4 products (NOT 5 — ignore the nav's WealthX/etc. names, use the live 
  page's Padua Home / Discover / Compare / Recommend)
- Real testimonials with attributed names (no inventions)
- Real stats only (1.8k+ Platforms, 22k+ Investments, 850+ strategies, 
  100% onshore)
- Active nav state on "Advisers & Licensees"
- Favicon URL has hyphens preserved
- All internal hrefs use real URLs (/, /services, /advisers-licensees, 
  /book-a-demo, /contact-us, /about/who-we-are, /about/our-people, 
  /about/careers)
````

## After save

Save as `padua-marketing/software.html` and tell me. I'll diff/verify/deploy.
