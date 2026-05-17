# OILS Website — Deployment & Handoff Guide

**Oil Industry Link & Services (Pvt) Company**
Fuel Station Equipment Specialists | Harare, Zimbabwe

---

## Project Structure

```
oils-website/
├── index.html              ← The complete website (single file)
├── robots.txt              ← SEO: instructs search engine crawlers
├── sitemap.xml             ← SEO: tells Google about your pages
├── assets/
│   ├── favicon.svg         ← Browser tab icon
│   └── images/
│       ├── hero-station.webp   ← Hero background (night, 81KB)
│       └── about-station.webp  ← About section (day station, 103KB)
└── README.md               ← This file
```

---

## Deployment Options

### Option A: Netlify (Recommended — Free)
1. Go to https://netlify.com and create a free account
2. Drag and drop the entire `oils-website/` folder onto the Netlify dashboard
3. Your site is live instantly at a `*.netlify.app` URL
4. To use your own domain (oils.co.zw): Settings → Domain Management → Add custom domain
5. Netlify handles HTTPS automatically — no configuration needed

### Option B: GitHub Pages (Free)
1. Create a GitHub account and a new repository named `oils-website`
2. Upload all files maintaining the folder structure
3. Go to Settings → Pages → Source: main branch → root folder → Save
4. Site goes live at `yourusername.github.io/oils-website`

### Option C: cPanel / Shared Hosting (e.g. Afrihost, Dandemutande)
1. Log into cPanel → File Manager
2. Navigate to `public_html/`
3. Upload all files maintaining structure
4. Site is immediately live at your domain

---

## Post-Deployment Checklist

### Immediate (Before Sharing the Link)
- [ ] Open on mobile (iPhone + Android) and check layout
- [ ] Click every WhatsApp button — confirm they open with correct number
- [ ] Click "Send Enquiry" form — confirm it opens your email client
- [ ] Test on slow 3G to verify images load fast (they will — WebP optimised)

### Within First Week
- [ ] Submit to Google Search Console: https://search.google.com/search-console
  - Verify ownership (HTML tag method)
  - Submit sitemap: `https://www.oils.co.zw/sitemap.xml`
- [ ] Create a Google Business Profile: https://business.google.com
  - Add address: 12 St Lucia Avenue, Marlborough, Harare
  - Category: "Industrial Equipment Supplier" or "Fuel Station Equipment"
  - Add your website URL
  - This is FREE and puts you on Google Maps

### Within First Month
- [ ] Update `sitemap.xml` with your real domain URL
- [ ] Update `robots.txt` Sitemap line with your real domain
- [ ] Update `<link rel="canonical">` in index.html with your real domain
- [ ] Update `og:url` and `og:image` meta tags with your real domain
- [ ] Update Schema.org `url` field in index.html with your real domain

---

## How to Update Contact Information

Open `index.html` in any text editor (Notepad, VS Code, etc.) and search for:
- `+263 772 946 253` — to update phone number 1
- `+263 773 358 574` — to update phone number 2
- `info@oils.co.zw` — to update email
- `263772946253` — appears in all WhatsApp links (the number without + or spaces)

**WhatsApp links format:** `https://wa.me/263772946253?text=...`
To change the number, replace `263772946253` with the new number (country code + number, no spaces or +).

---

## How to Update Services Copy

Open `index.html`, find the `<!-- SERVICES SECTION -->` comment block.
Each service card follows this structure:
```html
<div class="service-card">
  <div class="service-card-icon">...</div>
  <h3>Service Name</h3>
  <p>Service description copy here.</p>
</div>
```
Edit the `<h3>` and `<p>` text as needed. Do not change the class names.

---

## Logo

The logo is currently rendered as an inline SVG in the navigation — this was done because the logo image file was not available as a web-ready asset. 

**To replace with the actual logo image:**
1. Export your logo as a PNG or WebP (transparent background, minimum 200px wide)
2. Save it to `assets/images/oils-logo.png`
3. In `index.html`, find `<a href="#" class="nav-logo">` and replace the SVG block with:
   ```html
   <img src="assets/images/oils-logo.png" alt="OILS Logo" height="44" width="auto">
   ```

---

## SEO Summary

The site is pre-configured with:
- Unique `<title>` and `<meta description>` targeting Zimbabwe fuel station keywords
- Open Graph tags for WhatsApp/Facebook link previews
- Twitter Card meta tags
- Schema.org LocalBusiness structured data (Google rich results)
- Semantic HTML5 landmarks (nav, section, footer with aria-labels)
- Fast-loading WebP images with explicit width/height attributes
- robots.txt and sitemap.xml ready for Google Search Console

**Target keywords already embedded in copy:**
- "fuel station equipment Zimbabwe"
- "fuel pump installation Harare"
- "fuel dispenser calibration"
- "service station construction Zimbabwe"
- "fuel pump repairs"
- "fuel management systems"

---

## Technical Notes for the Developer

- **No dependencies, no npm, no build step.** Pure HTML/CSS/JS.
- The contact form uses `mailto:` — it opens the user's default email app.
  If the client later wants server-side form submission (to avoid email client dependency),
  integrate Formspree (free tier: formspree.io) — just add `action="https://formspree.io/f/YOUR_ID"` 
  to the `<form>` tag and remove the JS submit handler.
- Google Fonts are loaded from CDN. For offline/faster loading, self-host the WOFF2 files.
- The WhatsApp FAB (floating button) uses the international WhatsApp URL scheme.
- Intersection Observer is used for scroll animations (no GSAP dependency needed).
- All animations respect `prefers-reduced-motion` media query for accessibility.

---

*Built by Sebastian Madziwanzira for OILS, May 2025.*
