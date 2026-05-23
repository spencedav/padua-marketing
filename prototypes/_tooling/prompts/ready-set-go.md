# Generation prompt: /ready-set-go

**Use this prompt in a NEW Claude.ai chat in the Padua Website project.**

## Prep files to upload

| File | From repo path |
|---|---|
| `canonical-nav.html` ✅ already there | — |
| `canonical-footer.html` ✅ already there | — |
| `ready-set-go-page.html` | `padua-marketing/prototypes/reference/ready-set-go/page.html` |
| *(optional)* TMS process SVGs, Book analysis SVG, dashboard screenshot | `padua-marketing/prototypes/reference/ready-set-go/images/` |

## Page intent

`/ready-set-go` is the **detailed methodology page** for Padua's Transition Management Program. Companion to `/concierge` (which is the executive-summary "we manage it for you" framing). This page is where the FULL 4-stage methodology lives: **On your mark → Ready → Set → Go**. Best understood as the "how it works" page.

## Generation prompt — paste into a new chat

````
Generate a new /ready-set-go page for paduasolutions.com using the v3 
prototype's visual direction.

GOAL OF PAGE: Detailed methodology page for Padua's Transition Management 
Program (TMP). The four stages — On your mark / Ready / Set / Go — get 
proper space here. Visitors should leave understanding the FULL operating 
model and feeling confident in Padua's process. Convert to "Book a demo" 
or "Book Analysis Services" (the page's primary CTA).

REQUIRED — USE CANONICAL COMPONENTS VERBATIM:
- Use the EXACT nav from canonical-nav.html
- Use the EXACT footer from canonical-footer.html
- Set the ACTIVE nav state on "Advisers & Licensees" — Ready, Set, Go 
  lives under that audience.

REAL CONTENT TO PRESERVE (from the existing live page):

Hero copy:
- Eyebrow: "Transition Management Program"
- Headline (display font): "Ready, Set, Go" — keep this exact phrasing 
  (it's the brand name for the methodology)
- Sub-paragraph (close to live): 
  "Our technology creates efficiency and scalability, while our expert 
  team project-manage the entire Transition Management Program for you."
- Primary CTA: "Book Analysis Services" → /book-a-demo (or could use a 
  dedicated #analysis anchor on this page)
- Secondary: "Contact us" → /contact-us

The 4-stage methodology (THIS is the centerpiece of the page — each gets 
proper space with real copy and visual):

1. **On your mark — Fee Comparison** (Methodology color: Discover/Purple)
   "We provide advice firms with a platform fee comparison ($ & %) of 
   their client's existing platforms & investments against the recommended 
   scenario. This helps the advice firm identify potential cost & benefit 
   enhancements from moving platform or investment strategies and make 
   informed decisions with clear data."

2. **Ready — Analysis** (Methodology color: Compare/Pink)
   "We help the advice firm understand their client advice data, including 
   potential CRM & portfolio information gaps. We provide advice firms 
   with a detailed analysis of each of their client's accounts — the 
   existing platform & investments against any recommended scenario, 
   highlighting the specific tax & other impacts of transitioning. Advice 
   firms will also receive insights into the platform or investment 
   strategy transition effectiveness, summarised in interactive charts 
   and graphs."

3. **Set — Engagement** (Methodology color: Recommend/Red)
   "We segment the advice firm's client base and get you set for client 
   engagement. We've developed an advice request system that knows when 
   implementation packs are required. We segment the advice firm's clients 
   by costs, benefits, platform, adviser, FUA, advice type, number of 
   products and much more."

4. **Go — Implementation** (Methodology color: Review/Orange)
   "We produce the implementation pack for each advice firm client, 
   including SOA, application & other transition documentation. We 
   integrate with the advice firm's CRM to push back into the client 
   folder or file where available. Monitor progress with a user-friendly, 
   dashboard-style view."

IMAGE MANIFEST — use these Webflow CDN URLs (verified 200):

Process visualizations (use prominently in the methodology section):
- TMS Process diagram 1 (use in 'On your mark' or 'Ready' section): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67ca29ea3ad4333877ef8368_tms%20process--03.svg
- TMS Process diagram 2 (use in 'Set' or 'Go' section): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/67ca29ea1bf4ebdae7109d64_tms%20process--04.svg

Book Analysis illustration:
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66330c5faeb0ea52493dae25_Book%20analysis.svg

Dashboard screenshot (use in 'Go — Implementation' section):
- https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/6633148ab59818c47d840303_Screenshot%202024-04-23%20at%201.51.01%E2%80%AFPM.png

Trust signal:
- ISO 27001 Certified Badge: https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/66d1202b1681fafb47acb27d_ISO%2027001%20Certified%20Badge.svg

Padua brand (in canonical files):
- Touch icon (favicon — KEEP HYPHENS): 
  https://cdn.prod.website-files.com/64dc507cffef202bc73d11dc/65836b6efef6ba9fee59b1d8_Padua-touch-icon.png

PROPOSED STRUCTURE:

1. Nav (canonical, active = Advisers & Licensees)
2. Hero (H1 split — text + Book Analysis SVG illustration, OR text 
   + abstract spectrum gradient)
3. Brief intro section — "What Ready, Set, Go is" (1-2 paragraphs)
4. The 4-stage methodology (the page centerpiece)
   - Either: a horizontal timeline visualization showing all 4 stages 
     at once (matching v3 prototype's process-timeline pattern S3) — 
     then 4 detailed sections below
   - OR: 4 stacked sections (alternating image-left/image-right) — one 
     per stage, with real copy + a visual (TMS process SVG or dashboard 
     screenshot)
   
   Order: On your mark (purple) → Ready (pink) → Set (red) → Go (orange)
   Each stage gets its methodology color as accent.

5. Dashboard preview — use the dashboard screenshot, emphasis on the 
   "Go" stage's monitoring view
6. Companion service callout — link to /concierge with framing like 
   "Want us to manage the entire program for you? See Concierge →"
7. Trust signals strip (100% Onshore / ISO 27001 / Tech-enabled / End-to-end)
8. CTA banner (S8 — spectrum gradient): "Ready to start your next 
   transition?" → Book Analysis + Contact us
9. Footer (canonical)

OUTPUT REQUIREMENTS:
- Single self-contained HTML, inline CSS, Google Fonts only
- Full SEO meta tags (title: "Ready, Set, Go — Transition Management 
  Program | Padua Solutions"; canonical: 
  https://paduasolutions.com/ready-set-go; OG/Twitter)
- Responsive 991/767/479px
- v3 prototype CSS conventions, methodology color tokens
- Active nav on Advisers & Licensees
- Favicon URL has hyphens preserved
- All hrefs use real URLs
- Methodology colors used CONSISTENTLY across the 4 stages (Discover-
  purple, Compare-pink, Recommend-red, Review-orange — in that order, 
  matching the brand's signature spectrum sequence)

VERIFY BEFORE OUTPUT:
- All 4 stage descriptions preserved closely from the real content above
- No invented stats or claims
- Methodology stage names preserved EXACTLY ("On your mark", "Ready", 
  "Set", "Go")
- Active nav correct
- All hrefs use real URLs
````

Save as `padua-marketing/ready-set-go.html` and tell me.
