# Generation prompt: /privacy-policy

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `privacy-policy-page.html` | `padua-marketing/prototypes/reference/privacy-policy/page.html` |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype, refreshed) should already be in the project.

## Generation prompt — paste into a new chat

````
Generate a new /privacy-policy page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: A clear, complete, scannable privacy policy. This is a 
legal/compliance page — the priority is preserving the source content 
accurately and making it readable. Light visual treatment, not heavy 
design.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- No active nav state (Privacy is a footer-only link, not in the main nav)

REAL CONTENT TO PRESERVE (verbatim — legal text must not be rewritten):

This is a legal compliance document. The full text exists on the live page 
at /privacy-policy. Preserve EVERY paragraph and EVERY heading exactly as 
written. Do NOT paraphrase, summarize, or "improve" the legal copy.

The page is structured roughly as:
- Hero: "Privacy Policy" + brief intro paragraph
- Section: "What is Personal Information and why do we collect it?"
- Section: "Sensitive Information"
- Section: "Third Parties"
- Section: "Disclosure of Personal Information"
- Section: "Access to your Personal Information"
- Section: "Maintaining the Quality of your Personal Information"
- Section: "Policy Updates"
- Section: "Privacy Policy Complaints and Enquiries"
- Contact details for privacy enquiries

Key opening paragraph (preserve verbatim):
"Padua is committed to providing quality financial technology services to 
you and this policy outlines our ongoing obligations in respect of how we 
manage your Personal Information. We have adopted the National Privacy 
Principles (NPPs) contained in the Privacy Act 1988 (Cth). The NPPs govern 
the way in which we collect, use, disclose, store, secure and dispose of 
your personal information."

Read the full source content from privacy-policy-page.html (uploaded to 
this project) and preserve it section-by-section. If anything is unclear 
or appears truncated, FLAG it — do not invent legal copy.

PROPOSED STRUCTURE:

1. Nav (canonical, no active state — Privacy is a footer link only)

2. Hero (H2 centered — simple, no spectrum gradient)
   - Eyebrow: "Legal"
   - Headline: "Privacy Policy"
   - Sub: Last-updated date if visible in source, otherwise omit
   - Background: var(--paper) — clean, document-like

3. Document body (long-form text)
   - Container max-width 720px (narrower than usual — legal docs are 
     easier to read in a single column)
   - All headings in display font (Newsreader)
   - Body in body font (Geist), 17px, 1.65 line-height
   - Section headings as h2 (display font, 2rem)
   - Sub-section headings as h3 if present in source
   - Lists preserved as <ul> with proper bullet spacing
   - "https://" URLs in the source rendered as clickable <a> with subtle 
     methodology-color underline
   - Email + phone in contact section rendered as mailto: + tel: links

4. Soft contact callout near bottom: "Questions about how we handle your 
   data? Contact us." → /contact-us

5. Footer (canonical)

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags:
  - <title>Privacy Policy | Padua Solutions</title>
  - <meta name="description"> (150-160 chars: Padua's privacy policy 
    covering how we collect, use, store and dispose of personal 
    information under the Australian Privacy Act 1988)
  - <meta name="robots" content="noindex,nofollow"> — privacy policies 
    typically deindexed (not useful in search results); flag if you 
    disagree
  - <link rel="canonical" href="https://paduasolutions.com/privacy-policy">
  - Skip OG/Twitter tags (low-value social-share content) — favicon yes
- Responsive 991/767/479px
- v3 prototype CSS conventions
- No CTA banner at the bottom (inappropriate for a legal page)
- All hrefs use real URLs

VERIFY BEFORE OUTPUT:
- All legal text preserved verbatim — no paraphrasing
- All URLs from the source (e.g., https://www.oaic.gov.au/) preserved 
  exactly
- Contact details preserved exactly (email + phone)
- Section ordering matches the source page
````

Save as `padua-marketing/privacy-policy.html` and tell me. Note: this is 
a legal page — if Padua's legal team has an updated version, swap that 
in before launch.
