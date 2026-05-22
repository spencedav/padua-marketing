# Generation prompt: /about/careers

**Use this prompt in a new Claude.ai chat in the Padua Website project after uploading the reference files.**

## Prep files to upload to Claude.ai project

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-nav.html` |
| `canonical-footer.html` ✅ should already be there | `padua-marketing/prototypes/_tooling/canonical-footer.html` |
| `about-careers-page.html` | `padua-marketing/prototypes/reference/about-careers/page.html` |
| *(optional)* 4 values icons | `padua-marketing/prototypes/reference/about-careers/images/6584cf2a*.png` and `6584cf2b*.png` |
| *(optional)* 2-3 office DSC photos | `padua-marketing/prototypes/reference/about-careers/images/DSC_*.jpg` |

`design-system.md`, `components-inventory.md`, `index.html` (v3 prototype) should already be in the project.

## Generation prompt — paste into a new chat

````
Generate a new /about/careers page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: A careers page that encourages talented people to apply. 
Padua is a humans-first, Australian-onshore, family-rooted business — the 
tone should reflect that: warm, real, no corporate jargon. Visitors should 
feel "I want to work somewhere that feels like this."

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "About" — change any existing `active` class 
  to the "About" nav-link (href="/about/who-we-are")

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy (use verbatim or refine slightly):
- Eyebrow: "Careers"
- Headline (display font): "Discover a rewarding career at Padua"
- Sub-paragraph: "Where you can make a difference, unleash your true 
  potential, and be part of a team that is shaping the future in financial 
  advice."

Positioning:
"Join our team and make a difference. Padua is an equal opportunity 
employer that values diversity."

The 6 career streams on the live page (use these as the categories 
applicants can express interest in):
- Paraplanning
- Contract Paraplanning
- Transition Management
- Technology
- Research
- Internship

The live page is essentially a generic-inquiry careers page — there's no 
public list of specific open roles. So this page is recruitment marketing 
+ a "register interest" form, NOT a job-board.

IMAGE MANIFEST — use these Webflow CDN URLs (already hosted, all return 200):

Office/team photos (life at Padua — use as section backgrounds, photo grid, 
or hero visual):
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/652f73fd0bb4d9041f35e681_DSC_1261.jpg
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/652f73fd781cf5d44a68adb1_DSC_1235.jpg
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/652f73fe1fcddfc32c65f05a_dsc_1432_copy.jpg
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/652f73fe35a5ba29a73d014b_DSC_1549.jpg

Values icons (these are 4 icon illustrations — likely intended for the 
EARS values from the v3 prototype: Empathy / Agility / Reliability / 
Simplicity):
- Values icon 01: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6584cf2a64ff299ccd4f74e9_values-icon-01.png
- Values icon 02: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6584cf2b3991da6913c1eb88_values-icon-02.png
- Values icon 03: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6584cf2a10076d8fcc006d2a_values-icon-03.png
- Values icon 04: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6584cf2b4da896bdb1e485d4_values-icon-04.png

Trust signal:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical files — don't duplicate):
- Logo: 6576818ef2c374d506d75b90_padua-logo-horizontal.svg
- Touch icon (favicon — KEEP THE HYPHENS, don't strip them): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = About)

2. Hero (H1 split layout OR H2 centered — designer's call)
   - Eyebrow: "Careers"
   - Headline: "Discover a rewarding career at Padua"
   - Sub: the full sub-paragraph above
   - CTA: "See open positions ↓" (scrolls to form section)
   - Right side (if H1 split): one of the DSC office photos cropped 
     attractively, OR a spectrum gradient block

3. "Why Padua" section (S4 — two-column with photo or photo grid)
   - Headline like "An Australian-onshore, family-rooted team"
   - Brief content covering: 100% Australian onshore, Kiama HQ, family 
     values, founder-led, the kind of work Padua does
   - Use 1-2 DSC office photos as the visual
   - Brief — this is reinforcement of the brand story, not the centerpiece

4. EARS values section (use the v3 prototype .about-values pattern, 
   BUT this time include the 4 values icons as the visual)
   - 4 cards in a row (mobile: 2x2)
   - Each card: values icon at top (use the 4 values-icon-01/02/03/04 PNGs)
   - Below icon: letter (E/A/R/S) in display font, methodology-color accent
   - Below letter: value name + one-line description
   - Mapping (designer's call which icon → which value, since icon 
     contents aren't documented):
     • E — Empathy: Listen first
     • A — Agility: Move with you
     • R — Reliability: SLAs met
     • S — Simplicity: Cut complexity

5. Career streams section
   - Section heading: "Where you could work with us" or similar
   - Short framing paragraph: Padua has X areas of work, etc.
   - Grid of 6 cards (3-column desktop, 2-column tablet, 1-column mobile)
   - Each card: stream name (display font), 1-2 line description of what 
     the work involves
   - Categories: Paraplanning · Contract Paraplanning · Transition 
     Management · Technology · Research · Internship
   - Don't invent specific job titles — these are streams, not openings

6. "Life at Padua" photo strip (optional)
   - 3-4 of the office DSC photos in a horizontal strip
   - Adds warmth and texture, breaks up the form below

7. Application form section
   - Section eyebrow: "Get started"
   - Section heading: "Join our team"
   - Sub: "Padua is an equal opportunity employer that values diversity. 
     Fill out the form to inquire about career opportunities."
   - Form fields (matching the live page's form):
     • First name (text)
     • Last name (text)
     • Email (email)
     • Phone number (tel)
     • "What are you interested in?" (select dropdown, options: 
       Paraplanning / Contract Paraplanning / Transition Management / 
       Technology / Research / Internship)
     • Further comments (textarea)
     • Submit button (btn-spectrum)
   - Form action: leave as a placeholder — set `<form action="#" 
     onsubmit="event.preventDefault(); alert('Thanks! Your submission has 
     been received.');">` for now. The real form backend (Formspree, 
     HubSpot, etc.) will be wired in later in a single batch across all 
     form-bearing pages.

8. CTA banner (S8 — spectrum gradient)
   - Headline: something like "Have a question first?"
   - Primary CTA: "Get in touch" → /contact-us
   - Secondary: "Read our story" → /about/who-we-are

9. Footer (canonical, no edits)

OUTPUT REQUIREMENTS:
- Single self-contained HTML file
- All CSS inline in <style> in <head>
- Google Fonts only as external dependency (Newsreader + Geist)
- Full SEO meta tags:
  - <title>Careers at Padua — Apply today | Padua Solutions</title>
  - <meta name="description"> (150-160 chars: careers at Padua, the 6 
    work streams, Australian onshore, equal opportunity)
  - <link rel="canonical" href="https://paduasolutions.com/about/careers">
  - OpenGraph (use a DSC office photo as og:image)
  - Twitter Card (summary_large_image)
- Mobile responsive — breakpoints: 991px, 767px, 479px
- Match v3 prototype's CSS architecture: :root variables, semantic class 
  names
- Images via the Webflow CDN URLs above (NOT local images/ paths)
- Favicon link points to ...Padua-touch-icon.png (WITH hyphens preserved)
- Brand voice: warm, real, human. Avoid recruitment clichés ("rockstars", 
  "ninjas", "fast-paced environment"). Use "we" first person.

VERIFY BEFORE OUTPUT:
- No invented job titles, salaries, benefits, perks beyond what's in the 
  brief above (the live page doesn't list specifics, so we won't either)
- No invented stats
- Active nav state: "About" nav-link has class="active"
- All image URLs included exactly as listed above
- Form action is placeholder (not pointing to a real endpoint yet)
- Favicon link has hyphens preserved
- All internal hrefs use real URLs (/about/who-we-are, /about/our-people, 
  /contact-us, etc.)
````

## After save

When you save as `padua-marketing/about/careers.html` and tell me, I'll:
- Diff nav + footer against canonical
- Verify all image URLs return 200
- Fix the recurring touch-icon hyphen-strip if it happens again
- Commit + push + verify live URL

## Note on forms

This page (like `/contact-us` and `/book-a-demo` which we'll do later) will have a placeholder form that doesn't submit anywhere yet. Wiring up the real form backend (Formspree, HubSpot, or whatever CRM Padua uses) is a single batch task we'll do across all 3 form-bearing pages at once — saves us repeating the work.
