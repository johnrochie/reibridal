import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { siteConfig } from '@/lib/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';

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
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Luxury Bridal Boutique Kerry, Ireland`,
    description: siteConfig.description,
    // Share image comes from app/opengraph-image.tsx; icons from app/icon.png + app/apple-icon.png.
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Luxury Bridal Boutique`,
    description: siteConfig.description,
  },
  // No sitewide canonical here: it would be inherited by every page and point them all at the
  // homepage. Each page sets its own `alternates.canonical`.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
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
        <LocalBusinessSchema />
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
