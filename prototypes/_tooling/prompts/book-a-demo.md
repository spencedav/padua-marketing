# Generation prompt: /book-a-demo

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `book-a-demo-page.html` | `padua-marketing/prototypes/reference/book-a-demo/page.html` |

## After generation — TWO PLACEHOLDERS to replace

Form has `{PORTAL_ID}` and `{FORM_GUID}` placeholders. After you create the Demo Request form in HubSpot, send me both values and I'll swap them in before deploying.

## Generation prompt — paste into a new chat

````
Generate a new /book-a-demo page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: Conversion page — a visitor who clicks any "Book a demo" 
CTA from anywhere on the site lands here. The page should make booking a 
demo feel low-friction, signal what's in it for the visitor, and capture 
enough info for the sales team to triage the lead in HubSpot.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state — Book a demo is a top-level CTA button in the 
  nav (the spectrum "btn btn-spectrum" link in nav-actions), NOT a 
  nav-link. So there's no active class to add. Don't add `active` 
  anywhere unless there's a natural target (there isn't for this page).

REAL CONTENT TO PRESERVE / WRITE:

This page's content is mostly the form itself — the live page is minimal. 
Write supporting copy in Padua voice.

Hero:
- Eyebrow: "Book a demo"
- Headline (display font): "See the better way" or "Walk through the 
  Padua Portal" — designer's call, keep it inviting
- Sub-paragraph: "Tell us a bit about your practice and we'll set up a 
  30-minute walkthrough of the Padua Portal with someone from our 
  relationship team. You'll see the platform, the methodology, and where 
  it fits alongside what you already use."

What you'll see (3 bullet list — what to expect on the demo):
- The Padua Portal end-to-end (Discover → Compare → Recommend → Review)
- How tech-enabled paraplanning + transition management actually work
- The pricing model and what's included

The demo team — soft trust signal — "Demos are run by Padua's relationship 
management team, not pre-sales BDRs."

Trust line at the bottom of the page: "100% Australian onshore. ISO 27001 
certified."

IMAGE MANIFEST — use these Webflow CDN URLs (verified 200):

- Padua logo (in canonical nav/footer — don't duplicate)
- Touch icon (favicon — KEEP HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

NOTE: This page has no specific photos/illustrations in the pulled 
reference. The hero should be design-driven (spectrum gradient + form on 
right OR centered single-column form), matching the v3 prototype 
aesthetic.

PROPOSED STRUCTURE:

1. Nav (canonical, no active state)

2. Hero (H3 pattern — heading + sub + the form is the action)
   - Eyebrow + headline + sub (above)
   - Two-column layout: left = "what you'll see" bullets + trust line, 
     right = the form (or full-width centered form with bullets above)

3. Demo request form — HUBSPOT FORM SUBMISSION

   Use this EXACT form opening tag (DO NOT change the placeholders — 
   they will be replaced post-generation):

   <form 
     class="demo-form" 
     action="https://forms.hubspot.com/uploads/form/v2/{PORTAL_ID}/{FORM_GUID}" 
     method="POST" 
     enctype="multipart/form-data">

   Form fields (use these EXACT name attributes — HubSpot expects them):

   - First name: <input name="firstname" type="text" required>
   - Last name: <input name="lastname" type="text" required>
   - Work email: <input name="email" type="email" required>
   - Business / Licensee: <input name="company" type="text" required>
   - I am a (select): 
     <select name="role_or_audience" required>
       <option value="">Select one</option>
       <option value="Adviser">Adviser</option>
       <option value="Licensee">Licensee / Dealer Group</option>
       <option value="Platform or Super Fund">Platform or Super Fund</option>
       <option value="Investment Manager">Investment Manager / Fund Administrator</option>
       <option value="Mortgage Broker">Mortgage Broker</option>
       <option value="Other">Other</option>
     </select>
   - What would you like to discuss (optional): 
     <textarea name="message"></textarea>
   - Submit: <button type="submit" class="btn btn-spectrum">Request a demo</button>

   HubSpot returns its default thank-you redirect after submission.

   Style the form fields to match v3 prototype's .contact-form pattern 
   (the dark-background, rounded-corner version on a spectrum-gradient 
   section).

4. Trust strip at bottom (optional but recommended):
   - "100% Australian onshore"
   - "ISO 27001 Certified" + the badge SVG inline
   - "No pre-sales BDRs — talk to the actual relationship team"

5. Footer (canonical)

NOTE: No CTA banner on this page — the form IS the CTA. Don't add an 
additional "Book a demo" call-to-action at the bottom (would be 
redundant).

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags:
  - <title>Book a Demo — See Padua in Action | Padua Solutions</title>
  - <meta name="description"> (150-160 chars: book a demo, Padua Portal, 
    paraplanning, transition management, Australian onshore)
  - <link rel="canonical" href="https://paduasolutions.com/book-a-demo">
  - OpenGraph (use Padua logo as og:image)
  - Twitter Card (summary_large_image)
- Responsive breakpoints 991/767/479px
- v3 prototype CSS conventions
- No active nav class (Book a demo is a top-right CTA, not a nav-link)
- Favicon URL has hyphens preserved
- All internal hrefs use real URLs

VERIFY BEFORE OUTPUT:
- Form action contains the literal placeholders {PORTAL_ID} and 
  {FORM_GUID} (not real values)
- Form field name attributes are HubSpot-standard
- "I am a" dropdown has the 6 options listed above (no inventions)
- No invented features, demo lengths, or guarantees
- No active nav class
````

Save as `padua-marketing/book-a-demo.html` and tell me. Send the HubSpot Portal ID + Form GUID with it and I'll swap the placeholders before deploying.
