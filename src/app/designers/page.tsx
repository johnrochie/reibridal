import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublicDesigners, getPublicGowns, pickHeroImage } from '@/lib/catalogue';
import { TBD_COPY } from '@/lib/config';
import CatalogueImage from '@/components/media/CatalogueImage';

export const metadata: Metadata = {
  title: 'Designers',
  description: 'Designers currently shown at REI Bridal, Killorglin, Co. Kerry.',
};

export default async function DesignersPage() {
  const [designers, gowns] = await Promise.all([getPublicDesigners(), getPublicGowns()]);

  return (
    <>
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 30% 60%, #c9b882, transparent 60%)' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">The Boutique</span>
          <h1 className="section-title text-ivory max-w-xl">Designers</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-xl leading-relaxed text-base">
            {TBD_COPY.pageIntro}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-charcoal-deep">
        <div className="max-w-8xl mx-auto">
          {designers.length === 0 ? (
            <p className="font-sans font-light text-ivory/40 text-center py-24">
              Designer profiles will appear as they are confirmed.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {designers.map((designer) => {
                const preview = gowns.find((gown) => gown.designer.slug === designer.slug);
                const previewImage =
                  designer.portrait || designer.cover || pickHeroImage(preview?.images ?? [])?.media || null;
                const blurb = designer.shortBio || designer.description || TBD_COPY.brandStory;

                return (
                  <Link
                    key={designer.id}
                    href={`/designers/${designer.slug}`}
                    className="group grid grid-cols-1 sm:grid-cols-2 overflow-hidden bg-charcoal-light hover:bg-charcoal-dark transition-colors duration-400"
                  >
                    <div className="relative aspect-[3/4] sm:aspect-auto min-h-72">
                      <CatalogueImage
                        media={previewImage}
                        alt={`${designer.name} at REI Bridal`}
                        fill
                        width={900}
                        height={1200}
                        intent="product"
                        className="transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <h2 className="font-serif text-4xl text-ivory mb-4 group-hover:text-champagne-dark transition-colors">
                        {designer.name}
                      </h2>
                      <p className="font-sans font-light text-ivory/60 leading-relaxed mb-8">{blurb}</p>
                      <span className="text-xs tracking-widest uppercase font-light text-champagne group-hover:translate-x-2 transition-transform duration-300 inline-block">
                        View dresses →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
