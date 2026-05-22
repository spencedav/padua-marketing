# Padua Solutions — Components Inventory

Observable component patterns across the 15 pulled live-site pages.
**Use this as a checklist when generating new pages so you re-use existing patterns instead of inventing new ones.**

The live site is built on **Webflow's UntitledUI (UUI) component kit** with Padua brand styling on top. Most components carry UUI class prefixes (`uui-*`) — when extracting/recreating, you can simplify those class names to whatever fits your new architecture.

## Global components (every page)

### 1. Navigation bar (`uui-navbar04_*`)

**Where it appears:** all pages
**Pattern:** sticky top nav with mega-menu dropdowns

Structure:
- Padua logo (horizontal SVG: `6576818ef2c374d506d75b90_padua-logo-horizontal.svg`)
- 4 mega-menu dropdowns:
  - **Solutions** → links by audience (Advisers & Licensees, Mortgage Brokers, Product Providers, Software)
  - **Services** → Concierge, Ready Set Go, what-constitutes-a-strategy
  - **About** → Who We Are, Our People, Careers, News & Insights
  - (Sometimes) a 4th: **Products** showcasing WealthX, WealthData, etc.
- Search icon
- "Book a Demo" CTA button (right)

Each dropdown item has a heading + description (`uui-navbar04_item-heading` + `uui-navbar04_text-wrapper`).

### 2. Footer (`footer04_*`)

**Where it appears:** all pages
**Pattern:** multi-column footer with newsletter, links, legal

Structure:
- Brand column: logo + tagline + acknowledgement of country
- Link columns: Solutions / Services / About / Resources
- Social links row (`footer04_social-link` × 5 social icons)
- Bottom strip: ISO 27001 badge, ABN, copyright, Privacy/Terms links

### 3. "Back to top" arrow button (`67eb1b887850766b62faab85_ArrowUp-shadow.svg`)

Floating bottom-right arrow that returns to top of page. Visible after scroll.

## Hero patterns

### H1. Standard text hero with split layout
**Pages:** `/services`, `/concierge`, `/mortgage-brokers`, `/advisers-licensees`
- Left: large heading (h1) + sub-paragraph + 1-2 CTAs (primary + secondary)
- Right: hero photo or illustration (often the `Compare- animation.png` or DSC office photos)
- Background: usually white or `--purple-50`

### H2. Centered hero
**Pages:** `/about/who-we-are`, `/about/careers`
- Centered heading + supporting paragraph
- No image; just generous whitespace
- Sometimes followed by anchor links to in-page sections

### H3. Hero with embedded form
**Pages:** `/book-a-demo`, `/contact-us`
- Left: heading + value props (bullet list)
- Right: contact/demo form (fields + submit)

### H4. CMS detail hero (news article, OYM comparison)
**Pages:** `/news-insights/<article>`, `/oym/<comparison>`
- Eyebrow tag (date / category)
- Article title (h1)
- Author + read time
- Featured image below

## Card components

### C1. Service card (color-coded by methodology stage)
**Class family:** `.service-card.discover-card`, `.service-card.compare-card`, `.service-card.recommend-card`, `.service-card.review-card`, `.service-card.home-card`

- Color-coded background or accent matching the stage (purple/pink/red/orange)
- Icon at top
- Title (h3 or h4)
- Description paragraph
- Optional CTA link with arrow

### C2. Partner logo card
**Pages:** `/services`, homepage, `/product-providers`

- Grid of partner/integration logos: Invest Blue, IRESS Xplan, Lifewealth, etc.
- White background with subtle border
- Logos are SVG/PNG, monochrome

### C3. Team member card
**Pages:** `/about/our-people`

- Headshot (rounded corners)
- Name (bold)
- Role
- Short bio paragraph
- Optional LinkedIn link

### C4. News article card
**Pages:** `/news-insights` listing, related-articles sections

- Article hero image
- Tag (e.g., "Research", "News", "Technology") with color from methodology palette
- Title
- Date + read time
- Excerpt

### C5. Feature card with stat
**Pages:** `/services`, `/software`, `/concierge`

- Large stat (e.g., "5 days", "100%") in display font, methodology color
- Stat label (small caps)
- Supporting paragraph
- Sometimes a triangle/icon at top (matches v3 prototype's diff-card pattern)

## Section patterns

### S1. Hero (already covered in Hero patterns)

### S2. "What we do" / value props grid
- 3-4 cards in a row
- Each card: icon + heading + paragraph
- Methodology-themed (purple/pink/red/orange) where relevant

### S3. Process timeline / methodology display
**Pages:** `/services`, `/advisers-licensees`, homepage
- Horizontal stepped layout: Discover → Compare → Recommend → Review
- Each step has its color + a description
- Sometimes shown as a literal animated SVG (the `Compare- animation.png` is the visual asset)

### S4. Two-column with image
**Pages:** `/services`, `/concierge`, `/about/who-we-are`
- Heading + paragraph + CTA on one side
- Photo/illustration on the other
- Alternates left/right between sections

### S5. Stats strip
**Pages:** `/services`, homepage
- Horizontal row of 3-4 stats
- Each: large number (display font) + label
- Background often `--purple-50` or `--teal-50`

### S6. Testimonial / quote
**Pages:** `/services`, `/advisers-licensees`
- Pull quote in italic display font
- Citation: name + role + company
- Sometimes accompanied by client headshot

### S7. Trust/credentials section
**Pages:** all major template pages
- ISO 27001 certified badge (SVG: `66d1202b1681fafb47acb27d_ISO 27001 Certified Badge.svg`)
- "100% Australian onshore" text claim
- Partner logos row

### S8. CTA banner (gradient background)
**Pages:** every page near footer
- Spectrum/gradient background (purple → pink → red → orange)
- White heading
- Primary CTA button (white background, dark text)
- Secondary ghost CTA (white border, white text)

### S9. Article body (CMS detail pages)
- Rich text content
- Inline images
- Pull quotes
- Author bio sidebar
- Related articles at bottom

### S10. Form section
**Pages:** `/book-a-demo`, `/contact-us`
- Field rows: First name + Last name (2-col)
- Email (full)
- Business / Licensee (full)
- "I am a" select (Adviser / Licensee / Platform / Investment Manager / Other)
- Message textarea
- Submit button (primary)

## Utility / micro-components

- **Eyebrow text:** small caps tagline above headings (`.eyebrow` in v3 prototype style; `text-block-3` on live site)
- **Arrow icon:** SVG arrow used in text links (`.arrow-icon` — 66× across pages)
- **Tag pill:** small rounded pill with methodology color background, used on news/research cards
- **Dropdown icon:** chevron caret in nav (`uui-dropdown-icon-2`)

## Recommended component priority for prototype rebuild

If you're rebuilding the site in static HTML and want to focus on the most reusable patterns first:

| Priority | Component | Reason |
|---|---|---|
| 🔴 P0 | Navigation (Global) | Every page uses it; defines brand presence |
| 🔴 P0 | Footer (Global) | Same as above |
| 🔴 P0 | CTA banner (S8) | Every page has one near the bottom |
| 🟠 P1 | Service cards (C1) | Methodology-themed, used on 5+ pages |
| 🟠 P1 | Standard hero (H1) | Most pages have this structure |
| 🟠 P1 | Two-column with image (S4) | Recurring section pattern |
| 🟡 P2 | Stats strip (S5) | Adds credibility, used in marketing pages |
| 🟡 P2 | Process timeline (S3) | Showcases methodology |
| 🟡 P2 | Partner logos (C2) | Trust-building |
| 🟢 P3 | Testimonial (S6) | Nice-to-have for specific pages |
| 🟢 P3 | News card (C4) | Only used on news listing |
| 🟢 P3 | Team card (C3) | Only used on /about/our-people |

## How to use this inventory

When asking Claude.ai or Claude Code to generate a new page:

```
"Build a new /pricing page using:
- Standard hero (H1) with photo on the right
- Stats strip (S5) — 4 stats
- Service cards (C1) with each card themed for one methodology stage
- Two-column with image (S4) section
- CTA banner (S8) before footer

Use the design system tokens from design-system.md. Use Padua voice and tone."
```

That format gives the AI structured, named references rather than vague "make a pricing page."
