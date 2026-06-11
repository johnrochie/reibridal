import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { siteConfig } from '@/lib/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Bridal Boutique Kerry, Ireland`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'bridal boutique Kerry',
    'wedding dresses Ireland',
    'luxury bridal gowns',
    'REI Bridal',
    'wedding dress Kerry',
    'bridal shop Ireland',
    'designer wedding dresses',
    'bridal boutique Ireland',
    'wedding gowns Kerry',
    'bridal accessories Ireland',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Luxury Bridal Boutique Kerry, Ireland`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'REI Bridal — Luxury Bridal Boutique Kerry, Ireland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Luxury Bridal Boutique`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add from Google Search Console
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3d3d3f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data — Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ClothingStore',
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: siteConfig.address.street,
                addressLocality: siteConfig.address.city,
                addressRegion: siteConfig.address.county,
                addressCountry: 'IE',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '10:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '17:00',
                },
              ],
              sameAs: [
                siteConfig.social.instagram,
                siteConfig.social.facebook,
                siteConfig.social.pinterest,
              ],
              image: `${siteConfig.url}/og-image.jpg`,
              priceRange: '€€€',
              hasMap: `https://maps.google.com/?q=${encodeURIComponent(
                `${siteConfig.address.street}, ${siteConfig.address.city}, Ireland`
              )}`,
            }),
          }}
        />
      </head>
      <body className="bg-charcoal-deep text-ivory antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
