# CLAUDE.md

## Role
Expert in technical SEO and high-conversion landing pages. Pure HTML/CSS/JS — no frameworks.

## Project
- Site: huskypropainting.com
- Service: Residential exterior & interior painting
- Location: Redding, California (Shasta County)
- Goal: Phone calls and contact form submissions
- Deployment: Vercel — push to `main` = production in ~30s

## File Structure
- Pages: `/pages/` — service and location pages
- Blog: `/blog/` — articles
- CSS: `/css/` — variables.css → base.css → nav.css → sections.css
- JS: `/js/` — analytics.js, main.js
- Images: `/images/` — max 200kb each

## ⚠️ CSS Gotcha — Read First
Variable names are INVERTED from what you expect:
- `--black` = white (#ffffff)
- `--white` and `--light` = dark (#1a1a1a)
This is intentional — theme flipped but var names preserved.
Always check variables.css before writing color values.

## Technical Rules
- No frameworks or external dependencies
- Keep robots.txt and sitemap.xml updated when adding pages
- Every new location page needs its own LocalBusiness Schema (see schema template below)
- Every new service page needs FAQ schema

## SEO Rules
- One H1 per page — must include city name on location pages
- Meta title: max 60 chars, must include "Redding CA" or target city
- Meta description: max 155 chars, include phone number
- All images: descriptive alt text with location context
- Location pages: minimum 600 words with local references (neighborhoods, landmarks)
- Internal links: every location page links to relevant service pages and vice versa

## Schema Template — LocalBusiness (use on every location page)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Husky Pro Painting",
  "telephone": "(530) 777-6573",
  "url": "https://huskypropainting.com",
  "areaServed": { "@type": "City", "name": "[CITY], CA" },
  "priceRange": "$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "12" }
}
```

## Conversion Rules
- Primary CTA: phone call button — always visible on mobile
- Secondary CTA: estimate form (GHL webhook — see js/main.js line 79)
- Every page ends with a CTA section before footer

## Pending Integrations (do not remove these comments)
1. GHL webhook — js/main.js line 79: replace GHL_WEBHOOK_URL with real endpoint
2. Meta Pixel — js/analytics.js: uncomment and replace PIXEL_ID
3. GA4 — js/analytics.js: uncomment and replace GA4_ID

## Pages Needed (create in /pages/)
- /about.html — company story, license number, photos of Chris
- /gallery.html — before/after project photos
- /reviews.html — expanded testimonials with structured data
- /faq.html — FAQ schema, target featured snippets
- /get-free-estimate.html — dedicated landing page for paid traffic

## Brand
- Primary color: --orange: #F96302
- Fonts: Barlow Condensed (headings) + Barlow (body)
- Phone: (530) 777-6573
- License: [11]