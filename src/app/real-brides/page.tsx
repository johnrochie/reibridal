import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { realBrides } from '@/lib/data';
import { siteConfig } from '@/lib/config';
import RealBridesGrid from '@/components/real-brides/RealBridesGrid';

export const metadata: Metadata = {
  title: 'Real Brides | REI Bridal',
  description:
    'Meet the REI Bridal brides — real weddings, real moments, real love stories. Be inspired by our Kerry brides and their extraordinary gowns.',
  openGraph: {
    title: 'Real Brides | REI Bridal',
    description: 'Real weddings and love stories from REI Bridal, Kerry, Ireland.',
  },
};

export default function RealBridesPage() {
  const featured = realBrides.filter((b) => b.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 30% 60%, #c9b882, transparent 55%)' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Their Day, Their Story</span>
          <h1 className="section-title text-ivory">Real Brides</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-lg leading-relaxed">
            Every bride who walks through our door leaves with something more than a gown —
            she leaves with a story. Here are just a few of ours.
          </p>
        </div>
      </section>

      {/* Featured stories */}
      {featured.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Featured Stories</span>
              <h2 className="section-title">Love Stories</h2>
              <span className="deco-line" />
            </div>
            <div className="space-y-0">
              {featured.map((bride, i) => (
                <FeaturedBrideCard key={bride.id} bride={bride} reverse={i % 2 === 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All brides filterable grid */}
      <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
        <div className="max-w-8xl mx-auto">
          <div className="mb-16">
            <span className="section-label mb-3 block">The Full Gallery</span>
            <h2 className="section-title">All Our Brides</h2>
          </div>
          <RealBridesGrid brides={realBrides} />
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-24 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <span className="section-label mb-6 block">Share Your Story</span>
          <h2 className="font-serif text-5xl md:text-6xl text-ivory mb-6">
            A REI Bridal Bride?
          </h2>
          <span className="deco-line" />
          <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-10 leading-relaxed">
            We&apos;d love to feature your wedding photography. Tag us on Instagram{' '}
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne hover:text-champagne-light transition-colors"
            >
              @reibridal
            </a>{' '}
            or send your images directly to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.email}?subject=Wedding Photography Submission`}
              className="btn-primary"
            >
              Submit Your Photos
            </a>
            <Link href={siteConfig.appointmentUrl} className="btn-primary border-ivory/20 text-ivory/60 hover:bg-ivory/10 hover:text-ivory">
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedBrideCard({
  bride,
  reverse,
}: {
  bride: (typeof realBrides)[number];
  reverse: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] ${reverse ? 'direction-rtl' : ''}`}>
      {/* Image */}
      <div className={`relative min-h-[50vh] lg:min-h-full overflow-hidden bg-ivory-deep ${reverse ? 'lg:order-2' : ''}`}>
        <Image
          src={bride.image}
          alt={`${bride.brideName}${bride.partnerName ? ` & ${bride.partnerName}` : ''} — REI Bridal`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {/* Content */}
      <div className={`bg-ivory flex items-center px-8 py-20 lg:px-16 xl:px-24 ${reverse ? 'lg:order-1' : ''}`}>
        <div className="max-w-lg">
          <span className="section-label mb-6 block">{bride.weddingDate} · {bride.location}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-charcoal leading-tight mb-6">
            {bride.brideName}
            {bride.partnerName && (
              <>
                <br />
                <em className="text-champagne">&amp; {bride.partnerName}</em>
              </>
            )}
          </h2>
          {bride.quote && (
            <>
              <span className="deco-line ml-0 mx-0" style={{ marginLeft: 0 }} />
              <blockquote className="font-serif text-xl text-charcoal/70 italic leading-relaxed mb-8">
                &ldquo;{bride.quote}&rdquo;
              </blockquote>
            </>
          )}
          {(bride.gownName || bride.designerName) && (
            <div className="border-t border-ivory-deep pt-6">
              <p className="text-xs tracking-widest uppercase font-light text-charcoal/40 mb-1">
                Wearing
              </p>
              <p className="font-serif text-xl text-charcoal">
                {bride.gownName && <span>{bride.gownName}</span>}
                {bride.gownName && bride.designerName && <span className="text-charcoal/40"> by </span>}
                {bride.designerName && <span>{bride.designerName}</span>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
