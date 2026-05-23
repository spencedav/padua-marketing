# Generation prompt: /terms

**⚠️ This is a STUB / placeholder page. The current live Padua site does NOT have a `/terms` page** — but nav/footer link to it, so it needs to exist. Padua's legal team should provide the real Terms & Conditions content before launch. Until then, this page renders a holding message.

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project.

## Generation prompt — paste into a new chat

````
Generate a new /terms placeholder page for paduasolutions.com using the 
v3 prototype's visual direction.

GOAL OF PAGE: A short, polite placeholder for Terms & Conditions that 
acknowledges the page exists, explains it's being finalised by Padua's 
legal team, and gives visitors a way to reach Padua if they need terms 
in the meantime. The real legal content will be swapped in later when 
Padua's legal team provides it.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- No active nav state (Terms is a footer link only)

CONTENT (write fresh — no live page to preserve):

Hero:
- Eyebrow: "Legal"
- Headline: "Terms & Conditions"
- Sub: "Our terms are being finalised by Padua's legal team. In the 
  meantime, get in touch if you need the current draft."

Body (short, professional):
- Brief paragraph: "Padua Solutions Pty Ltd (ABN 93 167 243 745) is an 
  Australian-owned financial technology company. Our services are 
  provided in accordance with our standard engagement terms, which can 
  be requested by contacting us directly."
- Brief list of what topics the full Terms will eventually cover:
  • Acceptance of terms
  • Services Padua provides
  • Confidentiality of client data (also covered in /privacy-policy)
  • Limitation of liability
  • Governing law (New South Wales, Australia)
  • Changes to terms
- A direct contact line for terms requests: "Email legal@paduasolutions.com.au 
  or call +61 2 9241 1900 to request the current engagement terms."
  (NOTE: I haven't verified that legal@ email or that phone number exist 
  on Padua's live site — flag if you find different contact details in 
  uploaded reference files. If unsure, just route to /contact-us instead.)

DO NOT INVENT:
- Specific terms language (e.g., specific liability caps, specific 
  governing law clauses beyond "New South Wales, Australia") — this is 
  a placeholder ONLY. Real legal language must come from Padua's lawyer.

PROPOSED STRUCTURE:

1. Nav (canonical, no active state)
2. Hero (H2 — simple, document-style, var(--paper) background)
3. Brief intro paragraph (the ABN line + engagement-terms note)
4. "What our Terms cover" bulleted list (the 6 topics above)
5. Contact callout: "Need our current engagement terms?" → /contact-us
6. Footer (canonical)

Visual treatment: identical to /privacy-policy (legal-document style — 
container max-width 720px, clean Newsreader headings, Geist body, no 
spectrum gradient or methodology colors used as decoration).

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags:
  - <title>Terms & Conditions | Padua Solutions</title>
  - <meta name="description">: "Padua's Terms & Conditions are being 
    finalised. Contact Padua to request the current engagement terms."
  - <meta name="robots" content="noindex,nofollow"> — stub pages should 
    not be indexed
  - <link rel="canonical" href="https://paduasolutions.com/terms">
  - Skip OG/Twitter (no value); favicon yes
- Responsive 991/767/479px
- v3 prototype CSS conventions
- All internal hrefs use real URLs
- Favicon URL has hyphens preserved

VERIFY BEFORE OUTPUT:
- The page reads as a polite placeholder, not as actual legal terms
- No fabricated legal language
- Robots noindex set
````

Save as `padua-marketing/terms.html` and tell me.

**Reminder for Spencer:** before launch, Padua's legal team should provide real Terms & Conditions content. Swap that in by replacing the body content of this page (keep the nav/footer/SEO structure as-is).
