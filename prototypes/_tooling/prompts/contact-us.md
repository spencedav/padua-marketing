# Generation prompt: /contact-us

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `contact-us-page.html` | `padua-marketing/prototypes/reference/contact-us/page.html` |

## HubSpot integration — uses existing live-site iframe (no new setup)

The current Padua /contact-us page on Webflow uses HubSpot's iframe form embed:
```
https://share.hsforms.com/1cldVqo2QQj-MogO67ZkVqgbxqnx
```

We reuse this exact iframe in the new page. **No HubSpot setup, no new form to create, no IDs to track.** Lead-flow continues to land in HubSpot CRM exactly as it does today.

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

4. Contact form — HUBSPOT IFRAME EMBED (reuses the existing live-site 
   HubSpot form — no new HubSpot setup needed)

   Use this EXACT iframe embed (the same HubSpot share-form URL the 
   current Padua site uses):

   <div class="contact-form-wrap">
     <iframe 
       src="https://share.hsforms.com/1cldVqo2QQj-MogO67ZkVqgbxqnx" 
       class="hubspot-iframe" 
       title="Contact Padua Solutions"
       style="width:100%; min-height:600px; border:0; display:block;"
       loading="lazy"
       allow="autoplay; encrypted-media">
     </iframe>
   </div>

   Style the surrounding wrapper to match the v3 prototype's .contact-form 
   container styling (dark background or rounded card around the iframe). 
   The form inside the iframe is HubSpot-styled — that's expected and 
   matches the current live experience.

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
- HubSpot iframe src URL is exactly:
  https://share.hsforms.com/1cldVqo2QQj-MogO67ZkVqgbxqnx
- No invented contacts — only Brett Canning (+ Samuel if certain)
- No invented phone numbers beyond the real ones above
- Active nav on Contact (not Advisers & Licensees, not About)
````

Save as `padua-marketing/contact-us.html` and tell me — no extra HubSpot config needed since we're using the existing iframe.
