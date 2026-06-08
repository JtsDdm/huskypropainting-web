# CLAUDE.md

## Role
Expert in technical SEO and high-conversion landing pages. Pure HTML/CSS/JS — no frameworks.

## Project
- Site: huskypropainting.com
- Service: Residential exterior & interior painting
- Location: Redding, California (Shasta County)
- Goal: Phone calls and contact form submissions
- Deployment: Vercel — push to `main` = production in ~30s
- Local dev: `python3 -m http.server 8080` from project root

## Brand
- Primary color: `--orange: #F96302`
- Fonts: Barlow Condensed (headings) + Barlow (body)
- Phone: (530) 777-6573
- License: CSLB #1131340
- Logo: `/images/Branding/lobo.png` — husky head, orange flat on white (portrait)
- Logo circular: `/images/Branding/logo-circular.png` — circular badge version (generated)

## ⚠️ CSS Gotcha — Global Site Only
In the shared CSS (`/css/`), variable names are INVERTED:
- `--black` = white (#ffffff)
- `--white` and `--light` = dark (#1a1a1a)
**This does NOT apply to `/pages/get-free-estimate.html`** — that page has its own self-contained CSS with normal variable names (`--white: #ffffff`, `--dark: #111318`).

## File Structure
```
/pages/          — service + location pages (use shared /css/ and /js/)
/blog/           — articles
/css/            — variables.css → base.css → nav.css → sections.css
/js/             — analytics.js, main.js
/images/         — max 200kb each (see image map below)
/images/Branding/— logo files
/pics/           — original client photos (batch 1)
/pics2/          — original client photos (batch 2, 20 photos — real job photos)
/.env            — API keys (never commit — in .gitignore)
```

## Integrations Status
| Integration | Status | Details |
|---|---|---|
| GA4 | ✅ Live | ID: `G-CPGRKPT6ZS` — in `js/analytics.js` |
| Google Ads | ⏳ Pending | Replace `AW-XXXXXXXXX` and `CONVERSION_LABEL` in `js/analytics.js` |
| Meta Pixel | ⏳ Pending | Uncomment and replace `PIXEL_ID` in `js/analytics.js` |
| GHL CRM | ✅ Live | Survey widget ID: `UbYQqZBNDnJzQhLnbxnX` (iframe in landing page) |
| Ideogram API | ✅ Live | Key in `.env` as `IDEOGRAM_API_KEY` |

## Landing Page — `/pages/get-free-estimate.html`
Standalone page (self-contained CSS, no shared stylesheets). Used for paid traffic (Google Ads). `noindex, nofollow`.

### Sections in order:
1. **Header** — sticky, dark bg, `lobo.png` logo, phone number + icon
2. **Hero** — dark bg, `lp-hero.jpg` at `opacity:.18`, lead form (GHL survey)
3. **Trust Bar** — orange bg, 4 items with Ideogram-generated icons (`icon-trust1–4.png`)
4. **Promo** — dark bg, `bg-promo-texture.jpg` at `opacity:.30`, pricing card ($4,850 starting)
5. **Our Work Gallery** — 6 real photos in 3-col grid, `bg-ourwork-pattern.png` at `opacity:.30`
6. **How It Works** — dark bg, 5 steps with circular Ideogram icons (`icon-step1–5.png`)
7. **Reviews** — 3 verified Angi reviews (Randy Lachney, David J., Maria R.)
8. **Final CTA** — orange bg, phone link + Ideogram icon, second copy of GHL survey form
9. **Footer** — dark bg, 3 meta items with Ideogram footer icons (`icon-footer1–3.png`)
10. **Mobile Sticky CTA** — fixed bottom bar, phone number

### Icon technique (trust bar + footer):
Icons are white-on-black PNGs from Ideogram. Use `mix-blend-mode: screen` to make the black bg transparent and keep white icons visible on any colored background.

### Form embed:
```html
<iframe src="https://api.leadconnectorhq.com/widget/survey/UbYQqZBNDnJzQhLnbxnX"
  style="border:none;width:100%;" scrolling="no" title="survey"></iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```

## Image Map — `/images/`
### Landing page photos (real job photos from `/pics2/`, compressed ≤200kb)
| File | Source | Content |
|---|---|---|
| `lp-hero.jpg` | `1775162525160.jpg` | Two Husky Pro vans + crew at blue house |
| `lp-work1.jpg` | `1775164933505.jpg` | Painter on ladder, garage trim action |
| `lp-work2.jpg` | `20251208_113159.jpg` | Blue stucco house — finished result |
| `lp-work3.jpg` | `1775447376085.jpg` | Painter at teal house garage doors |
| `lp-work4.jpg` | `1775441996784.jpg` | Tan/olive house — finished result |
| `lp-work5.jpg` | `1775447038021.jpg` | Teal/aqua house — finished result |
| `lp-work6.jpg` | `1775165796186.jpg` | Brown house with porch swing |

### Ideogram-generated icons (generated via API, orange or white-on-black)
| File | Used in | Description |
|---|---|---|
| `icon-trust1.png` | Trust bar — Free Estimate | Calendar + lightning bolt |
| `icon-trust2.png` | Trust bar — Licensed & Insured | Certificate/badge |
| `icon-trust3.png` | Trust bar — 5-Year Warranty | Shield + checkmark |
| `icon-trust4.png` | Trust bar — Local & Trusted | Handshake |
| `icon-step1.png` | How It Works step 1 | Phone + calendar |
| `icon-step2.png` | How It Works step 2 | Clipboard + magnifier |
| `icon-step3.png` | How It Works step 3 | Pressure washer |
| `icon-step4.png` | How It Works step 4 | Paint roller + house |
| `icon-step5.png` | How It Works step 5 | House + sun + stars |
| `icon-footer1.png` | Footer — license | Badge/seal with star |
| `icon-footer2.png` | Footer — location | Map pin |
| `icon-footer3.png` | Footer — phone / CTA section | Phone handset thin line |
| `icon-phone.png` | Header phone button | Orange circle + white handset |
| `bg-promo-texture.jpg` | Promo section bg | Paint drips texture, dark |
| `bg-ourwork-pattern.png` | Our Work section bg | Paint tools repeat pattern |

### Generating new images with Ideogram
```bash
source .env
curl -s -X POST "https://api.ideogram.ai/generate" \
  -H "Api-Key: $IDEOGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"image_request": {"prompt": "...", "aspect_ratio": "ASPECT_1_1", "model": "V_2", "style_type": "DESIGN", "magic_prompt_option": "OFF"}}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data'][0]['url'])"
```
Aspect ratios: `ASPECT_1_1` (icons/square), `ASPECT_16_9` (backgrounds)
After download, compress with: `sips -Z 900 input.png --out output.png && sips -s formatOptions 70 output.png`

## Technical Rules
- No frameworks or external dependencies
- Keep `robots.txt` and `sitemap.xml` updated when adding pages
- Every new location page needs its own LocalBusiness Schema (see schema template below)
- Every new service page needs FAQ schema
- Images: max 200kb each — use `sips` on macOS to compress

## SEO Rules
- One H1 per page — must include city name on location pages
- Meta title: max 60 chars, must include "Redding CA" or target city
- Meta description: max 155 chars, include phone number
- All images: descriptive alt text with location context
- Location pages: minimum 600 words with local references (neighborhoods, landmarks)
- Internal links: every location page links to relevant service pages and vice versa

## Schema Template — LocalBusiness
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
- Secondary CTA: GHL survey form (widget ID: `UbYQqZBNDnJzQhLnbxnX`)
- Every page ends with a CTA section before footer

## Pages — Status
| Page | Status | Notes |
|---|---|---|
| `index.html` | ✅ Live | Homepage |
| `pages/get-free-estimate.html` | ✅ Live | Paid traffic landing page |
| `pages/exterior-painting.html` | ✅ Live | Service page |
| `pages/interior-painting.html` | ✅ Live | Service page |
| `pages/commercial-painting.html` | ✅ Live | Service page |
| `pages/redding-ca.html` | ✅ Live | Location page |
| `pages/anderson-ca.html` | ✅ Live | Location page |
| `pages/palo-cedro-ca.html` | ✅ Live | Location page |
| `pages/shasta-lake-ca.html` | ✅ Live | Location page |
| `pages/cottonwood-ca.html` | ✅ Live | Location page |
| `pages/red-bluff-ca.html` | ✅ Live | Location page |
| `pages/chico-ca.html` | ✅ Live | Location page |
| `pages/bella-vista-ca.html` | ✅ Live | Location page |
| `pages/shasta-ca.html` | ✅ Live | Location page |
| `pages/lake-redding-ca.html` | ✅ Live | Location page |
| `about.html` | ✅ Exists | Needs Chris photos + license copy |
| `gallery.html` | ✅ Exists | Needs real photos populated |
| `reviews.html` | ✅ Exists | Needs structured data |
| `faq.html` | ⏳ Needed | FAQ schema, featured snippets |
| `privacy.html` | ✅ Exists | — |
| `terms.html` | ✅ Exists | — |
