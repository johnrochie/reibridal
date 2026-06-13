import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllGowns } from '@/sanity/queries';
import { siteConfig } from '@/lib/config';
import GownGrid from '@/components/gowns/GownGrid';

const staticGowns = [
  { slug: 'evie-ja138',    name: 'Evie',    code: 'JA138',  collection: 'Cygnet Collection',          src: '/images/gowns/evie-ja138.jpg' },
  { slug: 'gracie-ja171',  name: 'Gracie',  code: 'JA171',  collection: 'Cygnet Collection',          src: '/images/gowns/gracie-ja171.jpg' },
  { slug: 'harriet-ja117', name: 'Harriet', code: 'JA117',  collection: 'Cygnet Collection',          src: '/images/gowns/harriet-ja117.jpg' },
  { slug: 'farrah-ja163',  name: 'Farrah',  code: 'JA163',  collection: 'Cygnet Collection',          src: '/images/gowns/farrah-ja163.jpg' },
  { slug: 'jules-ja192-a', name: 'Jules',   code: 'JA192',  collection: 'Rosalia Collection',         src: '/images/gowns/jules-ja192-8.jpg' },
  { slug: 'jules-ja192-b', name: 'Jules',   code: 'JA192',  collection: 'Rosalia Collection',         src: '/images/gowns/jules-ja192-2.jpg' },
  { slug: 'luise-ja204',   name: 'Luise',   code: 'JA204',  collection: 'March \'26 Capsule',         src: '/images/gowns/luise-ja204.jpg' },
  { slug: 'emily-ja101',   name: 'Emily',   code: 'JA101',  collection: 'Cygnet Collection',          src: '/images/gowns/emily-ja101.jpg' },
  { slug: 'margo-ja184',   name: 'Margo',   code: 'JA184',  collection: 'Rosalia Collection',         src: '/images/gowns/margo-ja184.jpg' },
  { slug: 'carmel-ja122',  name: 'Carmel',  code: 'JA122',  collection: 'Cygnet Collection',          src: '/images/gowns/carmel-ja122.jpg' },
  { slug: 'marnie-ja200',  name: 'Marnie',  code: 'JA200',  collection: 'March \'26 Capsule',         src: '/images/gowns/marnie-ja200.jpg' },
  { slug: 'willow-jap119', name: 'Willow',  code: 'JAP119', collection: 'Plus Collection',            src: '/images/gowns/willow-jap119.jpg' },
];

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
          {gowns.length > 0 ? (
            <GownGrid gowns={gowns} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {staticGowns.map((gown) => (
                <Link key={gown.slug} href="/appointments" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-light mb-5">
                    <Image
                      src={gown.src}
                      alt={`${gown.name} ${gown.code} — Jane Aston at REI Bridal`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/20 transition-colors duration-500 flex items-end">
                      <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/80 to-transparent">
                        <span className="text-xs tracking-widest text-champagne uppercase font-light">
                          Book to Try On →
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-ivory mb-1 group-hover:text-champagne transition-colors">
                      {gown.name}
                    </h2>
                    <p className="text-xs tracking-widest uppercase font-light text-ivory/50">
                      Jane Aston · {gown.collection}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
