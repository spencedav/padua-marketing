# Generation prompt: /contact-us

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `contact-us-page.html` | `padua-marketing/prototypes/reference/contact-us/page.html` |

## After generation — TWO PLACEHOLDERS to replace

The generated form will have placeholders `{PORTAL_ID}` and `{FORM_GUID}` in the `<form action="...">` URL. After you create the Contact form in HubSpot:

1. Note your HubSpot **Portal ID** (e.g., `26442345` — appears in HubSpot URL or Account settings)
2. Note the **Form GUID** for the Contact form (a long string like `abc12345-67de-89fg-h1ij-23klmn456789`)
3. Replace both placeholders in the final HTML before deploying

I (Claude Code) will do this swap mechanically when you give me the two values — just paste them when you say "saved" and I'll handle it.

## Generation prompt — paste into a new chat

````
Generate a new /contact-us page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: A clear, helpful "get in touch" page. Visitors should find:
(1) the right office for them, (2) the right phone number, (3) a named 
human contact, and (4) a way to send a message that lands in Padua's CRM.

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "Contact" — find the Contact link in the 
  canonical nav (the simple text link, no dropdown) and give it class 
  "active".

REAL CONTENT TO PRESERVE (from the existing live page):

Hero:
- Eyebrow: "Contact us"
- Headline (display font): "Let's talk about your practice" or "Get in 
  touch" — designer's call, keep warm

General phone: **1300 162 892**

Offices (use exactly):
- **Sydney**: Level 14, 323 Castlereagh Street, Sydney NSW 2000
- **Kiama**: 2 Manning Street, Kiama NSW 2533

Email: **hello@paduasolutions.com.au**

Relationship Management Team (real people, real numbers — DO NOT invent 
extra names):
- **Brett Canning** — General Manager – Sales — 0498 673 739
- **Samuel [last-name truncated in our reference; use just first name 
  "Samuel" or omit the second contact entirely if the source isn't 
  certain]** — role TBD — phone TBD

If Samuel's full details aren't certain, OMIT the second contact entirely 
rather than invent. One named human is fine.

IMAGE MANIFEST — use these Webflow CDN URLs (verified 200):

Relationship Management headshots (NOTE: served from CMS site ID 
654b0db04fb918f226e44702, NOT the main site ID):
- Brett Canning: https://cdn.prod.website-files.com/654b0db04fb918f226e44702/693f854660cdacc96b7b884e_relationships-brett.png
- Samuel: https://cdn.prod.website-files.com/654b0db04fb918f226e44702/693f8515af6d38cd86b348e3_relationships-samuel.png

(Only show Samuel's headshot if you're showing his contact details.)

Trust:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical):
- Touch icon (favicon — KEEP HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = Contact)

2. Hero (H2 — centered hero pattern, no photo)
   - Eyebrow: "Contact us"
   - Headline: "Let's talk about your practice" (or similar warm phrasing)
   - Sub: "Whether you want a walkthrough of the platform or to talk 
     through a specific workflow, we'd love to hear from you." (Use this 
     phrasing — established on the v3 prototype.)

3. Two-column layout
   LEFT side: contact information block
   - Phone (general): 1300 162 892 — large, clickable (tel: link)
   - Email: hello@paduasolutions.com.au — clickable (mailto: link)
   - Office cards (Sydney + Kiama, each with a small icon if appropriate)
   - Relationship Management Team cards (Brett Canning's headshot, name, 
     role, phone — and Samuel's if certain)

   RIGHT side: contact form (see below)

4. Contact form — HUBSPOT FORM SUBMISSION

   The form must submit to HubSpot's form submission endpoint. Use this 
   EXACT form opening tag:

   <form 
     class="contact-form" 
     action="https://forms.hubspot.com/uploads/form/v2/{PORTAL_ID}/{FORM_GUID}" 
     method="POST" 
     enctype="multipart/form-data">

   These placeholders {PORTAL_ID} and {FORM_GUID} will be replaced with 
   real values after HubSpot form is created. Do NOT change them in the 
   output. Output them literally as shown.

   Form fields (use these EXACT name attributes — HubSpot expects them):
   - First name: <input name="firstname" type="text" required>
   - Last name: <input name="lastname" type="text" required>
   - Work email: <input name="email" type="email" required>
   - Company / Licensee: <input name="company" type="text">
   - Message: <textarea name="message" required></textarea>
   - Submit: <button type="submit" class="btn btn-spectrum">Send message</button>

   HubSpot returns its default thank-you redirect after submission. Don't 
   add custom JS submit handling — let HubSpot handle it.

   Style the form fields to match the v3 prototype's .contact-form 
   styling (dark background, rounded corners, focus states).

5. Footer (canonical)

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags:
  - <title>Contact Padua Solutions | Padua Solutions</title>
  - <meta name="description"> (150-160 chars: contact, Sydney, Kiama, 
    Australian onshore, phone)
  - <link rel="canonical" href="https://paduasolutions.com/contact-us">
  - OpenGraph (use Padua logo as og:image)
  - Twitter Card (summary_large_image)
- Responsive breakpoints 991/767/479px
- v3 prototype CSS conventions
- Active nav on Contact
- Favicon URL has hyphens preserved
- All hrefs use real URLs (/, /book-a-demo, etc.)
- Phone numbers use tel: links (tel:1300162892, tel:0498673739)
- Email uses mailto: link (mailto:hello@paduasolutions.com.au)

VERIFY BEFORE OUTPUT:
- Form action contains the literal placeholders {PORTAL_ID} and 
  {FORM_GUID} (not real values, not removed)
- Form field name attributes are HubSpot-standard (firstname, lastname, 
  email, company, message)
- No invented contacts — only Brett Canning (+ Samuel if certain)
- No invented phone numbers beyond the real ones above
- Active nav on Contact (not Advisers & Licensees, not About)
````

Save as `padua-marketing/contact-us.html` and tell me. Send me the HubSpot Portal ID + Form GUID at the same time and I'll swap the placeholders before deploying.
