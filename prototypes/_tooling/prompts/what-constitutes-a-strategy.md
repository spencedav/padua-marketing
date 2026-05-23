# Generation prompt: /what-constitutes-a-strategy-at-padua

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `what-constitutes-a-strategy-page.html` | `padua-marketing/prototypes/reference/what-constitutes-a-strategy/page.html` |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project.

## Page intent

This is a **technical pricing/SOA-counting reference page** for advisers and licensees. It explains how Padua counts "strategies" in Statements of Advice (SOAs) and Records of Advice (ROAs) — important for billing transparency. Visitors are mostly existing customers checking pricing logic, not prospects.

## Generation prompt — paste into a new chat

````
Generate a new /what-constitutes-a-strategy-at-padua page for paduasolutions.com 
using the v3 prototype's visual direction.

GOAL OF PAGE: A technical reference document explaining Padua's strategy-
counting rules for SOAs (Statements of Advice) and ROAs (Records of Advice). 
This drives Padua's pricing transparency for advice firms. Readers are 
mostly existing customers checking billing logic, not prospects.

The page needs to be PRECISE and SCANNABLE — easy to look up a specific 
rule. Don't over-design it.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "Advisers & Licensees" — this page is a 
  technical resource for that audience.

REAL CONTENT TO PRESERVE (verbatim — this is technical pricing logic, 
do not paraphrase):

Headline:
"What constitutes a 'strategy' at Padua?"

Opening paragraph (verbatim):
"The following document explains our guidelines for what constitutes a 
'strategy' within a SOA or ROA: As a general rule, each strategy in the 
SOA or ROA is treated as one (1) strategy. The easiest way to explain 
this is wherever it states 'We recommend you…' this will be treated as 
a strategy."

Two main sections, each with detailed rules:

**Product Recommendations**
- Super, pension or investment product replacement advice is counted as 
  one (1) strategy for a single and two (2) strategies for a couple.
- Personal insurance is treated as one (1) strategy for a single and 
  two (2) strategies for a couple for any combination of Life, TPD, IP 
  and Trauma.
- However, where there are differing strategy recommendations (e.g. 
  apply, cancel, amend, retain), these are treated as separate 
  strategies, but are capped at two (2) strategies for a single, and 
  four (4) strategies for a couple.
- Where an adviser is implementing the same strategy for both members 
  of a couple, it will be treated as one (1) strategy. This applies to 
  estate planning, cash reserve, debt management, joint investment and 
  non-concessional contributions where the frequency and amount are the 
  same and no individual calculations to determine the impact are 
  required.

**Strategy Recommendations**
- Where concessional contributions (salary sacrifice or personal 
  deductible contributions) for a couple are being recommended and the 
  amounts and/or frequency are different and we are required to 
  calculate the impact on individual tax or cashflow position, this is 
  treated as two (2) strategies.
- Product replacement advice and/or Modelling/projections that are 
  aligned to the recommended position are charged at $130 + GST.
- Any additional Modelling/projections (tables or charts) requested by 
  an adviser are charged separately (verify the exact pricing from the 
  source page — preserve verbatim).

Read the full source content from the uploaded page.html and preserve 
EVERY rule exactly. Do NOT paraphrase. If anything appears truncated or 
unclear in the source, FLAG it rather than invent rules.

IMAGE MANIFEST — use these Webflow CDN URLs (verified 200):

Padua brand (in canonical files):
- Touch icon (favicon — KEEP HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = Advisers & Licensees)

2. Hero (H2 — simple, document-style, no spectrum gradient)
   - Eyebrow: "For Advisers" or "Reference document"
   - Headline: "What constitutes a 'strategy' at Padua?"
   - Sub: the opening paragraph (or a condensed version)
   - Background: var(--paper) — clean, document-like (NOT dark ink/spectrum)
   - No CTAs in hero — this is a reference document, not a marketing page

3. Optional: table of contents (auto-generated from the section headings) 
   in a sticky sidebar on desktop, collapsed dropdown on mobile. Helps 
   readers jump to specific rules. Worth doing — this is a long-ish 
   reference document.

4. Document body (long-form, scannable)
   - Container max-width 720px (narrower for legal-style readability)
   - All headings in display font (Newsreader)
   - Body in body font (Geist), 17px, 1.65 line-height
   - Section heading h2 (display font, ~2rem) for "Product Recommendations" 
     and "Strategy Recommendations"
   - Each rule as a card or styled paragraph — visually distinct so readers 
     can quickly scan for a specific rule
   - Use methodology colors as left-border accents on each rule card 
     (alternating purple/pink/red/orange — adds visual rhythm without 
     interfering with the technical content)
   - Pricing numbers ($130 + GST etc.) emphasized in bold

5. Footer callout: "Questions about how a specific strategy is counted? 
   Contact your Padua Advice Guide or get in touch →" → /contact-us

6. Footer (canonical)

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags:
  - <title>What constitutes a 'strategy' at Padua? | Padua Solutions</title>
  - <meta name="description"> (150-160 chars: How Padua counts strategies 
    in SOAs and ROAs — pricing transparency guidelines for advice firms)
  - <link rel="canonical" 
    href="https://paduasolutions.com/what-constitutes-a-strategy-at-padua">
  - OG/Twitter tags fine (this is searchable content advisers may share 
    via Slack/email)
  - Favicon
- Responsive 991/767/479px
- v3 prototype CSS conventions
- Active nav on Advisers & Licensees
- Favicon URL has hyphens preserved
- All internal hrefs use real URLs

VERIFY BEFORE OUTPUT:
- All rules preserved verbatim — no paraphrasing or "clarifying"
- Pricing figures preserved exactly
- Section ordering matches source
- Active nav correct
````

Save as `padua-marketing/what-constitutes-a-strategy-at-padua.html` and tell me.
