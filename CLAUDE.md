# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

Expert in technical SEO and high-conversion landing pages. This project is pure HTML/CSS/JS — no frameworks.

## Project

- **Site:** huskypropainting-web
- **Service:** Residential exterior painting
- **Location:** Redding, California
- **Goal:** Generate phone calls and contact form submissions

## Technical Rules

- Do not introduce frameworks or external dependencies
- CSS goes in `/css/`, JS in `/js/`, images in `/images/`
- New pages go in `/pages/`
- Keep `robots.txt` and `sitemap.xml` updated when adding pages

## SEO Rules

- One H1 per page
- Meta title max 60 characters, must include "Redding CA"
- Meta description max 155 characters
- All images need descriptive alt text
- LocalBusiness schema lives in `index.html`

## Conversion Rules

- Primary CTA: phone call button
- Secondary CTA: quote/estimate form
- Images optimized, max 200kb each
- Mobile-first on all CSS changes

## CSS Architecture

All CSS variables (colors, fonts, spacing) are in `css/variables.css` — edit there first. The variable naming is inverted from what you'd expect: `--black` is white (`#ffffff`), `--white`/`--light` are dark (`#1a1a1a`). This is intentional — the theme was switched from dark to light and variable names were preserved.

CSS load order: `variables.css` → `base.css` → `nav.css` → `sections.css`.

## Brand

- Primary color: `--orange: #F96302`
- Fonts: Barlow Condensed (headings) + Barlow (body) via Google Fonts
- Phone: (530) 777-6573
- Domain: huskypropainting.com

## Pending Integrations

1. **GHL webhook** — `js/main.js` line 79: estimate form currently simulates submission. Replace the commented `GHL_WEBHOOK` URL with a real GoHighLevel webhook.
2. **Analytics** — `js/analytics.js`: uncomment and replace `PIXEL_ID` (Meta) and `GA4_ID` (Google Analytics) with real IDs.

## Deployment

Hosted on Vercel. Every push to `main` deploys automatically (~30 seconds). `main` is production — no staging environment.
