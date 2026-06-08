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

### Adding a New Gown

Open `src/lib/data.ts` and add to the `gowns` array:

```typescript
{
  id: 'unique-url-slug',           // Used in URL: /gowns/unique-url-slug
  name: 'Gown Name',
  designer: 'Designer Name',
  category: 'wedding',             // 'wedding' | 'bridesmaid' | 'occasion'
  priceRange: 'POA',
  description: 'Description here',
  features: ['Feature 1', 'Feature 2'],
  image: 'https://your-image-url.com/image.jpg',
  isNew: true,                     // Shows "New" badge
  isFeatured: true,                // Shows on homepage
  available: true,                 // Set false to hide
},
```

### Adding a New Designer

```typescript
{
  id: 'designer-slug',
  name: 'Designer Name',
  country: 'France',
  shortBio: 'One line description',
  description: 'Full paragraph description',
  image: 'https://portrait-image.com/photo.jpg',
  coverImage: 'https://wide-image.com/photo.jpg',
  featured: true,                  // Shows prominently on designers page
},
```

### Updating Gallery

Replace `src` URLs in the `galleryImages` array in `data.ts`. Supported categories:
`'bride' | 'detail' | 'ceremony' | 'portrait' | 'editorial'`

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

## 📷 Replacing Stock Images

Stock images from Unsplash are used as placeholders. Replace with real photography by:
1. Uploading photos to Cloudinary, Vercel Blob, or your CDN
2. Updating URLs in `src/lib/data.ts`
3. Adding your domain to `next.config.js` `remotePatterns`

For local images, place in `public/images/` and use paths like `/images/photo.jpg`

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
- **Images:** next/image with Unsplash placeholders
- **Animations:** CSS transitions (Framer Motion ready to add)
- **SEO:** Next.js Metadata API + JSON-LD

---

Built with care for REI Bridal 🤍
