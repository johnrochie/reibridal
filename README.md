# REI Bridal Website

A luxury bridal boutique website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
git clone <your-repo-url>
cd rei-bridal

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout + SEO
│   ├── gowns/
│   │   ├── page.tsx        # All gowns listing
│   │   └── [id]/page.tsx   # Individual gown detail
│   ├── designers/
│   │   └── page.tsx        # Designers listing
│   ├── gallery/
│   │   └── page.tsx        # Gallery
│   ├── about/
│   │   └── page.tsx        # About us
│   ├── contact/
│   │   └── page.tsx        # Contact form
│   ├── appointments/
│   │   └── page.tsx        # Booking page
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Search engine directives
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navigation
│   │   └── Footer.tsx      # Footer + CTA
│   └── ui/
│       └── CookieBanner.tsx
├── lib/
│   ├── config.ts           # ⭐ Site config (name, address, social links)
│   └── data.ts             # ⭐ All editable content (gowns, designers, gallery)
└── styles/
    └── globals.css
```

---

## ✏️ How to Edit Content

Gown and designer catalogue records live in **Sanity Studio** (`/studio`). Do not put image paths or gown facts in React components.

Each gown is one document with many classified image references. Factual fields (sizes, price, silhouette, fabric, availability, description) have a content status. Only **confirmed** values appear as public facts. Incomplete records are allowed — prefer empty over invented data.

Phase 1 can run without Sanity by using the local sample in `src/lib/catalogue/local-seed.ts` (existing Jane Aston photography already in the repo). That sample does not invent fabric, price, or silhouette.

### Photography ingest

The 1GB source library stays outside Git. Scan it locally:

```bash
npm run photos:ingest -- --source /path/to/photo-library --out ./media/ingest --contact-sheet
```

This lists files, records dimensions, flags obvious duplicates, suggests designer/gown matches (high/medium/low), and writes optimised WebP/JPEG copies. Originals are never modified. Ingest output is gitignored.

### Production image storage

Images are referenced as `{ provider, key }`. Providers: Sanity, local sample, Cloudinary, Vercel Blob, Supabase, S3. Switch storage by changing the reference, not the React tree.

### Updating Site Info

Edit `src/lib/config.ts` to update:
- Phone, email, address
- Social media links
- Opening hours
- Booking URL (Calendly/Square/Acuity)

---

## 🔌 Integrations to Set Up

### 1. Booking System
In `src/app/appointments/page.tsx`, replace the placeholder with your booking widget:

```html
<!-- Calendly example -->
<div 
  className="calendly-inline-widget" 
  data-url="https://calendly.com/YOUR-LINK"
  style={{minWidth: '320px', height: '700px'}}
/>
<script src="https://assets.calendly.com/assets/external/widget.js" async />
```

### 2. Contact Form
In `src/app/contact/page.tsx`, update the `<form>` action:

**Option A — Netlify Forms:** Add `data-netlify="true"` attribute  
**Option B — Formspree:** Change `action="https://formspree.io/f/YOUR_ID"`  
**Option C — API Route:** Create `src/app/api/contact/route.ts`

### 3. Google Analytics
Add to `src/app/layout.tsx`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
```

### 4. Google Search Console
Replace `YOUR_GOOGLE_VERIFICATION_CODE` in `src/app/layout.tsx`

---

## 🎨 Brand Colours

| Token | Hex | Use |
|-------|-----|-----|
| `charcoal` | `#3d3d3f` | Primary background |
| `champagne` | `#c9b882` | Brand gold / accents |
| `ivory` | `#faf7f2` | Light backgrounds |
| `ivory-warm` | `#f5f0e8` | Section alternation |

---

## 📷 Photography

Do not import the source photo library into Git or `/public`. Production images belong in Sanity or an image CDN (Cloudinary, Vercel Blob, Supabase, S3). Local `/public/images` holds only a small already-committed sample.

The website should never download a 5–10MB original when a smaller luxury-quality derivative will do. Ingest writes those derivatives; `next/image` plus the media layer request high-quality, non-stretched variants.


---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Upload the .next folder or connect your GitHub repo
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://www.reibridal.ie
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📊 SEO Features

- ✅ Full Open Graph meta tags
- ✅ Twitter Card meta
- ✅ JSON-LD structured data (LocalBusiness + Product)
- ✅ Auto-generated sitemap.xml
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Image alt texts throughout
- ✅ Semantic HTML (article, section, nav, main, footer)
- ✅ Mobile-first responsive design
- ✅ Core Web Vitals optimised (Next/Image, font optimisation)
- ✅ AI/LLM friendly (clear semantic structure, structured data)
- ✅ GDPR cookie consent banner

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Cormorant Garamond (serif) + Jost (sans)
- **Images:** media abstraction (Sanity / Cloudinary / Vercel Blob / Supabase / S3 / local sample) with luxury-quality next/image
- **Animations:** CSS transitions (Framer Motion ready to add)
- **SEO:** Next.js Metadata API + JSON-LD

---

Built with care for REI Bridal 🤍
