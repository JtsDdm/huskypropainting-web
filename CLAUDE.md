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
- License: CSLB #1131340

### ⚠️ Two phone numbers — do not mix them
| Number | Used on | Purpose |
|---|---|---|
| **(530) 777-6573** `tel:+15307776573` | Organic site: `index.html`, service pages, location pages, blog, WhatsApp link on landings | Main business line |
| **(530) 522-6431** `tel:+15305226431` | **Paid landing pages only** (the 5 listed below) | AI phone agent / call tracking for Google Ads |

Never swap one for the other. The organic number on a paid landing breaks call attribution;
the tracking number on an organic page sends real customers to the AI agent.
WhatsApp on the landings intentionally points to the main number: `https://wa.me/15307776573`.

- Logo: `/images/Branding/lobo.png` — husky head, orange flat on white (portrait)
- Logo circular: `/images/Branding/logo-circular.png` — circular badge version (generated)

## ⚠️ CSS Gotcha — Global Site Only
In the shared CSS (`/css/`), variable names are INVERTED:
- `--black` = white (#ffffff)
- `--white` and `--light` = dark (#1a1a1a)
**This does NOT apply to the 5 paid landing pages** — each is self-contained with normal variable names (`--white: #ffffff`, `--dark: #111318`).

## File Structure
```
/pages/          — service + location pages (shared /css/ + /js/) AND the 5 paid landings (self-contained)
/blog/           — articles
/css/            — variables.css → base.css → nav.css → sections.css
/js/             — analytics.js, main.js, gclid-capture.js
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
| Google Ads | ✅ Live | ID `AW-18235385879` in `js/analytics.js`. Labels: phone `nnNaCPruitEcEJfQp_dD`, form `blU9CIH9usgcEJfQp_dD`. **`js/analytics.js` is the only gtag loader** — no page hardcodes a gtag snippet |
| Meta Pixel | ❌ Not implemented | No Meta code in `js/analytics.js` (the README reference to `PIXEL_ID` is stale) |
| GHL CRM | ✅ Live | **Form** widget ID: `BCBxB8UhwNJGJPzIodqH` — used by all 5 landings. Chat widget loader on `index.html` |
| Ideogram API | ✅ Live | Key in `.env` as `IDEOGRAM_API_KEY` |

### Conversion tracking — how it fires (`js/analytics.js`)
Every page loads `js/analytics.js` as the **first tag inside `<head>`**, and it is the single place
gtag.js is loaded and configured (GA4 `G-CPGRKPT6ZS` + Ads `AW-18235385879`).
**Never re-add an inline `gtag('config', 'AW-…')` snippet to a page** — it double-fires the Ads
page_view and loads gtag.js twice.
- **Phone clicks**: any `a[href^="tel:"]` click → GA4 `generate_lead` + Google Ads conversion (`firePhoneConversion()`).
- **Form submits**: listens for the `postMessage` LeadConnector sends from the iframe → GA4 `generate_lead` only. The Ads conversion for forms is fired by GHL automation server-side — **do not add a client-side fire here or it double-counts**.
- **UTM/gclid capture**: UTMs + gclid saved to `sessionStorage` for CRM attribution across navigation.
- **`js/gclid-capture.js`**: appends `?gclid=` to the GHL iframe `src` so the click ID reaches the CRM. Loaded only by the 5 landings. It targets the iframe by the widget ID `BCBxB8UhwNJGJPzIodqH` — **if the GHL widget ID ever changes, this file must be updated too or gclid attribution silently breaks**.

## ⚠️ Indexation Rules — read before touching `sitemap.xml`
The 5 paid landing pages are `noindex, nofollow` **on purpose** and must NEVER be added to `sitemap.xml`.
Listing a noindex URL in the sitemap sends Google contradictory signals and triggers
"Submitted URL marked noindex" errors in Search Console.

- Paid landings: `noindex, nofollow`, **no** canonical tag, **not** in sitemap, no internal links from indexable pages (they are intentionally orphaned — traffic arrives from ads).
- Organic pages: indexable, self-referencing canonical, in sitemap, internally linked.
- Do **not** add `Disallow:` to `robots.txt` for the landings — blocking crawl would stop Google from ever reading the `noindex`.

Their keywords (painters redding, house painters redding, etc.) are already targeted organically by
`pages/redding-ca.html` and the service pages. Indexing the landings would cannibalize those.

## Paid Landing Pages — 6 total
Standalone pages (self-contained CSS, no shared stylesheets, no site nav). Google Ads traffic only.
All are `noindex, nofollow`, use the **(530) 522-6431** tracking number, embed the GHL form
`BCBxB8UhwNJGJPzIodqH`, load `js/gclid-capture.js`, and carry a WhatsApp button to the main number.

| Page | H1 | Ad group / keyword |
|---|---|---|
| `get-free-estimate.html` | Transform Your Home. Boost Your Curb Appeal. | Generic / offer-led |
| `painters-redding.html` | Redding's Trusted Painters. | painters redding |
| `house-painters-redding.html` | House Painters in Redding, CA. | house painters redding |
| `exterior-painters-redding.html` | Exterior Painters in Redding, CA. | exterior painters redding |
| `painting-contractors-redding.html` | Painting Contractors in Redding CA. | painting contractors redding |
| `painting-company-redding.html` | Redding Painting Company. | painting company redding |

The 5 keyword landings are structural clones of `get-free-estimate.html` — same sections, same CSS,
only the H1, title, meta description and hero copy differ. **Change one, and check whether the
other five need the same change** (there is no shared stylesheet to propagate it for you).

### Sections in order (identical across all 5):
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

### Form embed (current — GHL **form**, not survey):
```html
<iframe src="https://api.leadconnectorhq.com/widget/form/BCBxB8UhwNJGJPzIodqH"
  id="inline-BCBxB8UhwNJGJPzIodqH"
  style="border:none;width:100%;" scrolling="no" title="Free Estimate"></iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```
The `id` matters: `js/gclid-capture.js` looks it up to inject the gclid.
(The old survey widget `UbYQqZBNDnJzQhLnbxnX` is no longer used anywhere.)

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
- Keep `robots.txt` and `sitemap.xml` updated when adding pages — **but only indexable pages go in the sitemap** (see Indexation Rules above)
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
- Secondary CTA: GHL form (widget ID: `BCBxB8UhwNJGJPzIodqH`)
- Every page ends with a CTA section before footer
- Use the right phone number for the page type (see Brand section) — this is the single easiest thing to get wrong

## Pages — Status
Indexed = in `sitemap.xml`. Landings are deliberately excluded.

| Page | Status | Indexed | Notes |
|---|---|---|---|
| `index.html` | ✅ Live | ✅ | Homepage |
| `pages/get-free-estimate.html` | ✅ Live | 🚫 noindex | Paid landing — generic offer |
| `pages/painters-redding.html` | ✅ Live | 🚫 noindex | Paid landing — "painters redding" |
| `pages/house-painters-redding.html` | ✅ Live | 🚫 noindex | Paid landing — "house painters redding" |
| `pages/exterior-painters-redding.html` | ✅ Live | 🚫 noindex | Paid landing — "exterior painters redding" |
| `pages/painting-contractors-redding.html` | ✅ Live | 🚫 noindex | Paid landing — "painting contractors redding" |
| `pages/painting-company-redding.html` | ✅ Live | 🚫 noindex | Paid landing — "painting company redding" |
| `thank-you.html` | ✅ Live | 🚫 noindex | Post-submission page |
| `pages/exterior-painting.html` | ✅ Live | ✅ | Service page |
| `pages/interior-painting.html` | ✅ Live | ✅ | Service page |
| `pages/commercial-painting.html` | ✅ Live | ✅ | Service page |
| `pages/redding-ca.html` | ✅ Live | ✅ | Location page — full LocalBusiness + FAQPage schema, ~1,300 words. Use as the template for new location pages |
| `pages/anderson-ca.html` | ✅ Live | ✅ | Location page |
| `pages/palo-cedro-ca.html` | ✅ Live | ✅ | Location page |
| `pages/shasta-lake-ca.html` | ✅ Live | ✅ | Location page |
| `pages/cottonwood-ca.html` | ✅ Live | ✅ | Location page |
| `pages/red-bluff-ca.html` | ✅ Live | ✅ | Location page |
| `pages/chico-ca.html` | ✅ Live | ✅ | Location page |
| `pages/bella-vista-ca.html` | ✅ Live | ✅ | Location page |
| `pages/shasta-ca.html` | ✅ Live | ✅ | Location page |
| `pages/lake-redding-ca.html` | ✅ Live | ✅ | Location page |
| `blog/` + 6 articles | ✅ Live | ✅ | Index + 6 posts |
| `about.html` | ✅ Exists | ✅ | Needs Chris photos + license copy |
| `gallery.html` | ✅ Exists | ✅ | Needs real photos populated |
| `reviews.html` | ✅ Exists | ✅ | Needs structured data |
| `faq.html` | ⏳ Needed | — | FAQ schema, featured snippets |
| `privacy.html` | ✅ Exists | ✅ | — |
| `terms.html` | ✅ Exists | ✅ | — |
