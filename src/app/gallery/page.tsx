import type { Metadata } from 'next';
import Link from 'next/link';
import { galleryImages } from '@/lib/data';
import { siteConfig } from '@/lib/config';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery | REI Bridal',
  description:
    'Browse our gallery of real REI Bridal weddings and editorial imagery. Discover wedding inspiration from our Kerry, Ireland bridal boutique.',
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 40%, #c9b882, transparent 55%)' }} />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Real Moments</span>
          <h1 className="section-title text-ivory">The Gallery</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-md leading-relaxed">
            A glimpse into the moments that matter — real brides, real stories, captured forever.
          </p>
        </div>
      </section>

      <GalleryGrid images={galleryImages} />

      {/* Submit your photo CTA */}
      <section className="py-20 px-6 bg-charcoal text-center">
        <span className="section-label mb-4 block">Share Your Story</span>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-6">
          A REI Bridal Bride?
        </h2>
        <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-8 leading-relaxed">
          We&apos;d love to feature your wedding photography. Tag us on Instagram{' '}
          <a href={siteConfig.social.instagram} className="text-champagne hover:text-champagne-light">
            @reibridal
          </a>{' '}
          or send your images to us directly.
        </p>
        <a
          href={`mailto:${siteConfig.email}?subject=Wedding Photography Submission`}
          className="btn-primary"
        >
          Submit Your Photos
        </a>
      </section>
    </>
  );
}
