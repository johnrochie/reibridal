import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { designers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Designers | REI Bridal',
  description:
    'Discover the world-class designers stocked at REI Bridal boutique in Kerry, Ireland. From Parisian couturiers to Australian minimalists, our curation is unparalleled.',
};

export default function DesignersPage() {
  const featured = designers.filter((d) => d.featured);
  const others = designers.filter((d) => !d.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 30% 60%, #c9b882, transparent 60%)' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">An Unrivalled Edit</span>
          <h1 className="section-title text-ivory max-w-xl">
            The Designers
          </h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-xl leading-relaxed text-base">
            We travel the world to handpick each designer we carry. What unites them is an
            uncompromising commitment to craft and a distinctly individual point of view.
          </p>
        </div>
      </section>

      {/* Featured designers — large cards */}
      <section className="py-20 px-6 lg:px-12 bg-ivory">
        <div className="max-w-8xl mx-auto">
          <div className="space-y-6">
            {featured.map((designer, i) => (
              <Link
                key={designer.id}
                href={`/designers/${designer.id}`}
                className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-ivory-deep hover:bg-ivory-warm transition-colors duration-400"
              >
                <div className={`relative aspect-video md:aspect-auto min-h-72 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    src={designer.coverImage}
                    alt={`${designer.name} — stocked at REI Bridal`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-charcoal-deep/20 group-hover:bg-charcoal-deep/0 transition-colors duration-500" />
                </div>
                <div className={`flex flex-col justify-center p-10 lg:p-16 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="section-label mb-4">{designer.country}</span>
                  <h2 className="font-serif text-5xl text-charcoal mb-4 group-hover:text-champagne-dark transition-colors">
                    {designer.name}
                  </h2>
                  <p className="font-sans font-light text-charcoal/60 leading-relaxed mb-8 max-w-md">
                    {designer.description}
                  </p>
                  <span className="text-xs tracking-widest uppercase font-light text-champagne group-hover:translate-x-2 transition-transform duration-300 inline-block">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other designers — grid */}
      {others.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-4xl text-charcoal mb-12">Also in Our Boutique</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((designer) => (
                <Link
                  key={designer.id}
                  href={`/designers/${designer.id}`}
                  className="group relative overflow-hidden bg-charcoal aspect-square"
                >
                  <Image
                    src={designer.image}
                    alt={designer.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-serif text-2xl text-ivory mb-1">{designer.name}</h3>
                    <p className="text-xs tracking-widest uppercase font-light text-champagne">
                      {designer.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
