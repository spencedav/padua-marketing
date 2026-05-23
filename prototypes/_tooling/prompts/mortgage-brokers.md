# Generation prompt: /mortgage-brokers

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `mortgage-brokers-page.html` | `padua-marketing/prototypes/reference/mortgage-brokers/page.html` |
| *(optional)* 2-3 partner logos | `padua-marketing/prototypes/reference/mortgage-brokers/images/*-logo.*` |

## Page intent

Audience landing page for **mortgage brokers**. Featured product on this page: **Padua WealthX** (Padua's open-banking product). Note that WealthX is mentioned in the nav's Software dropdown but isn't featured on the redesigned `/software` page (which features Padua Home / Discover / Compare / Recommend instead). This page is where WealthX lives prominently.

## Generation prompt — paste into a new chat

````
Generate a new /mortgage-brokers page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: Audience landing page for mortgage brokers. Position Padua 
WealthX (the open-banking product) as the value proposition for this 
audience — it gives brokers clear insights into clients' income, expenses, 
assets and liabilities, and generates referral opportunities back to 
advice firms.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state — mortgage brokers don't have their own 
  top-level nav item, so the closest match is "Advisers & Licensees" 
  (the broader B2B-advice audience). Set `active` on Advisers & Licensees.

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy:
- Eyebrow: "For Mortgage Brokers"
- Headline (display font): something like "Open-banking insights for 
  mortgage brokers" or "Padua WealthX — built for brokers"
- Sub-paragraph (preserve close to live): 
  "Padua WealthX provides a secure open-banking experience that gives 
  clients clear insights into their income, expenses, assets and 
  liabilities, and also generates valuable referral opportunities."
- Primary CTA: "Sign up to Padua WealthX" or "Book a demo" → /book-a-demo
- Secondary: "Contact us" → /contact-us

The 3 pillars (same as /product-providers — Padua's standard B2B framing):

1. **Padua WealthX** (FEATURED on this page — give it the most space)
   "Secure open-banking that gives clients clear insights into their 
   income, expenses, assets and liabilities — and generates referral 
   opportunities back to advice firms. The fastest way to build a complete 
   client financial picture."
   - Methodology color: Compare/pink or a dedicated WealthX color 
     (sub-brand color is #ff6f2c per design system — feel free to use 
     this orange as the WealthX accent if appropriate)
   - CTA: "Sign up to Padua WealthX" or "Learn more"

2. **Software** (briefer)
   "Experience a streamlined advice process with our software, empowering 
   you to focus on meaningful client interactions."
   - Link → /software

3. **Product Solutions** (briefer)
   "Providing the product solutions of tomorrow with today's innovation."
   - Generic positioning — link → /contact-us

Two sub-audience streams (same as /product-providers — Padua's positioning 
also serves these adjacent segments):
- "Platform & investment management solutions" → relevant audience
- "Business & compliance consultant solutions"

(These are softer here — the main focus of the page is WealthX for 
mortgage brokers, not multi-audience selling. Optional.)

IMAGE MANIFEST — use these Webflow CDN URLs (verified 200):

Partner logos (use in "Our trusted partners" grid):
- Invest Blue: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bc7c2c651309362b971_Invest-Blue-logo.png
- Count Group: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432967106c4a51312feed5_count-logo.svg
- Fitzpatricks: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432b303137cb430dca61eb_Fitzpatricks.png
- Findex: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432b57c2c6513093627772_findex.jpeg
- Emerge Paper: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65432bf4453f23c395598081_emerge-paper.png
- Lifewealth: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65668e6b3b36a4ccecb4100c_lifewealth-white.png

Trust signal:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical files):
- Touch icon (favicon — KEEP HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

NOTE: This page has no dedicated WealthX product screenshot in the pulled 
references. Use the spectrum gradient + WealthX-themed color blocks for 
the hero and product feature section. If a designer screenshots WealthX 
later, swap in.

PROPOSED STRUCTURE:

1. Nav (canonical, active = Advisers & Licensees)
2. Hero (H1 split — text + spectrum gradient block / abstract visual)
3. WealthX feature section (the centerpiece — give it ~40% of page space)
   - Eyebrow: "Featured product"
   - Heading: "Padua WealthX"
   - Description (from real content)
   - Capability list (4-6 bullets: open banking, income/expense insights, 
     assets/liabilities, referral generation, secure, etc.)
   - CTA: "Sign up to Padua WealthX"
4. Three-pillar overview (briefer than /product-providers — WealthX is 
   featured separately above so the 3 pillars are condensed)
5. Two sub-audience streams (compact)
6. Partner logos grid ("Our trusted partners")
7. Trust signals strip (100% Onshore, ISO 27001)
8. CTA banner (S8 — spectrum gradient)
9. Footer (canonical)

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags (title: "For Mortgage Brokers — Padua WealthX 
  Open Banking | Padua Solutions"; canonical: 
  https://paduasolutions.com/mortgage-brokers; OG/Twitter)
- Responsive 991/767/479px
- v3 prototype CSS conventions
- Active nav on Advisers & Licensees
- Favicon URL has hyphens preserved
- All hrefs use real URLs

VERIFY BEFORE OUTPUT:
- No invented WealthX features beyond what's stated above
- No invented stats
- Active nav correct
````

Save as `padua-marketing/mortgage-brokers.html` and tell me.
