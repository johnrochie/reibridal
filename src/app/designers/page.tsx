import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublicDesigners } from '@/lib/catalogue';
import CatalogueImage from '@/components/media/CatalogueImage';

export const metadata: Metadata = {
  title: 'Our Designers | REI Bridal',
  description:
    'Discover the world-class designers stocked at REI Bridal boutique in Kerry, Ireland. From Parisian couturiers to Australian minimalists, our curation is unparalleled.',
};

export default async function DesignersPage() {
  const designers = await getPublicDesigners();
  const featured = designers.filter((d) => d.featured);
  const others = designers.filter((d) => !d.featured);

  return (
    <>
      <section className="relative pt-40 pb-24 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 30% 60%, #c9b882, transparent 60%)' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">An Unrivalled Edit</span>
          <h1 className="section-title text-ivory max-w-xl">The Designers</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-xl leading-relaxed text-base">
            We travel the world to handpick each designer we carry. What unites them is an
            uncompromising commitment to craft and a distinctly individual point of view.
          </p>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-charcoal-deep">
          <div className="max-w-8xl mx-auto">
            <div className="space-y-6">
              {featured.map((designer, i) => (
                <Link
                  key={designer.id}
                  href={`/designers/${designer.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-charcoal-light hover:bg-charcoal-dark transition-colors duration-400"
                >
                  <div className={`relative aspect-video md:aspect-auto min-h-72 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <CatalogueImage
                      media={designer.cover || designer.portrait}
                      alt={`${designer.name} — stocked at REI Bridal`}
                      fill
                      width={1200}
                      height={800}
                      intent="editorial"
                      className="transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className={`flex flex-col justify-center p-10 lg:p-16 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                    {designer.country && <span className="section-label mb-4">{designer.country}</span>}
                    <h2 className="font-serif text-5xl text-ivory mb-4 group-hover:text-champagne-dark transition-colors">
                      {designer.name}
                    </h2>
                    {designer.description && (
                      <p className="font-sans font-light text-ivory/60 leading-relaxed mb-8 max-w-md">
                        {designer.description}
                      </p>
                    )}
                    <span className="text-xs tracking-widest uppercase font-light text-champagne group-hover:translate-x-2 transition-transform duration-300 inline-block">
                      Explore Collection →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-charcoal-dark">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-4xl text-ivory mb-12">
              {featured.length > 0 ? 'Also in Our Boutique' : 'In Our Boutique'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((designer) => (
                <Link
                  key={designer.id}
                  href={`/designers/${designer.slug}`}
                  className="group relative overflow-hidden bg-charcoal aspect-square"
                >
                  <CatalogueImage
                    media={designer.portrait || designer.cover}
                    alt={designer.name}
                    fill
                    width={800}
                    height={800}
                    intent="product"
                    className="opacity-60 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-serif text-2xl text-ivory mb-1">{designer.name}</h3>
                    {designer.country && (
                      <p className="text-xs tracking-widest uppercase font-light text-champagne">
                        {designer.country}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {designers.length === 0 && (
        <section className="py-24 px-6 bg-charcoal-deep text-center">
          <p className="font-sans font-light text-ivory/40">Designer profiles will appear as they are confirmed.</p>
        </section>
      )}
    </>
  );
}
