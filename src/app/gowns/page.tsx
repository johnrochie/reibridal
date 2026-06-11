import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGowns } from '@/sanity/queries';
import { siteConfig } from '@/lib/config';
import GownGrid from '@/components/gowns/GownGrid';

export const metadata: Metadata = {
  title: 'Wedding Gowns | REI Bridal',
  description:
    'Browse our curated collection of luxury wedding gowns, bridesmaid dresses and occasion wear at REI Bridal, Kerry, Ireland. Private appointments available.',
};

export default async function GownsPage() {
  const gowns = await getAllGowns();

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #c9b882 0%, transparent 60%)' }} />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">The Collection</span>
          <h1 className="section-title text-ivory">Our Gowns</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-lg leading-relaxed">
            Each gown in our collection has been personally chosen for its exceptional quality,
            distinctive design, and ability to make a bride feel utterly extraordinary.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 px-6 lg:px-12 bg-charcoal-deep min-h-screen">
        <div className="max-w-8xl mx-auto">
          <GownGrid gowns={gowns} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-charcoal-dark border-t border-ivory/10 text-center">
        <p className="font-sans font-light text-ivory/60 mb-6 max-w-md mx-auto">
          Can&apos;t find what you&apos;re looking for? Our stylists can source bespoke pieces
          from our extended designer network.
        </p>
        <Link href={siteConfig.appointmentUrl} className="btn-dark">
          Book a Consultation
        </Link>
      </section>
    </>
  );
}
