import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGownBySlug, getAllGownSlugs, getAllGowns } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { siteConfig } from '@/lib/config';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const slugs = await getAllGownSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gown = await getGownBySlug(params.id);
  if (!gown) return {};

  return {
    title: `${gown.name} by ${gown.designer.name} | REI Bridal`,
    description: `${gown.description} Available exclusively at REI Bridal, Kerry, Ireland.`,
    openGraph: {
      images: [{ url: urlFor(gown.image).width(1200).height(630).url(), alt: `${gown.name} — REI Bridal` }],
    },
  };
}

export default async function GownDetailPage({ params }: Props) {
  const [gown, allGowns] = await Promise.all([
    getGownBySlug(params.id),
    getAllGowns(),
  ]);
  if (!gown) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Gowns', item: `${siteConfig.url}/gowns` },
      { '@type': 'ListItem', position: 3, name: gown.name, item: `${siteConfig.url}/gowns/${gown.slug}` },
    ],
  };

  const relatedGowns = allGowns
    .filter((g) => g.slug !== gown.slug && g.designer.name === gown.designer.name)
    .slice(0, 3);
  const fallbackRelated = allGowns
    .filter((g) => g.slug !== gown.slug && !relatedGowns.find((r) => r.slug === g.slug))
    .slice(0, 3 - relatedGowns.length);
  const allRelated = [...relatedGowns, ...fallbackRelated].slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav className="pt-32 pb-6 px-6 lg:px-12 max-w-8xl mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-light text-ivory/40">
          <li><Link href="/" className="hover:text-champagne transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/gowns" className="hover:text-champagne transition-colors">Gowns</Link></li>
          <li>/</li>
          <li className="text-ivory/70">{gown.name}</li>
        </ol>
      </nav>

      {/* Main content */}
      <section className="px-6 lg:px-12 pb-24 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image */}
          <div className="relative aspect-bridal lg:aspect-auto lg:min-h-[80vh] overflow-hidden bg-charcoal-light">
            <Image
              src={urlFor(gown.image).width(900).height(1200).url()}
              alt={`${gown.name} by ${gown.designer.name} — REI Bridal`}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {gown.isNew && (
              <span className="absolute top-6 left-6 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5">
                New Arrival
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <Link
              href={`/designers/${gown.designer.slug}`}
              className="section-label mb-4 hover:text-champagne transition-colors"
            >
              {gown.designer.name}
            </Link>
            <h1 className="font-serif text-6xl md:text-7xl text-ivory leading-none mb-4">
              {gown.name}
            </h1>
            <span className="block w-12 h-px bg-champagne mb-8" />

            {gown.priceRange && (
              <p className="text-sm font-light text-ivory/50 mb-8 tracking-widest uppercase">
                {gown.priceRange}
              </p>
            )}

            <p className="font-sans font-light text-ivory/70 leading-relaxed mb-10 text-base">
              {gown.description}
            </p>

            {/* Features */}
            {gown.features && gown.features.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-4">
                  Details
                </h3>
                <ul className="space-y-2">
                  {gown.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-light text-ivory/60">
                      <span className="w-3 h-px bg-champagne flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-4">
              <Link href={siteConfig.appointmentUrl} className="btn-filled w-full text-center block">
                Book to Try This Gown
              </Link>
              <p className="text-xs text-center font-light text-ivory/40 leading-relaxed">
                All prices are available on request. Book a private appointment to discuss.
              </p>
            </div>

            {/* Schema for product */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Product',
                  name: `${gown.name} by ${gown.designer.name}`,
                  description: gown.description,
                  image: urlFor(gown.image).width(1200).url(),
                  brand: { '@type': 'Brand', name: gown.designer.name },
                  offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStoreOnly',
                    seller: { '@type': 'Organization', name: 'REI Bridal' },
                  },
                }),
              }}
            />
          </div>
        </div>
      </section>

      {/* Related gowns */}
      {allRelated.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-charcoal-dark border-t border-ivory/10">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-4xl text-ivory mb-12 text-center">
              You May Also Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {allRelated.map((related) => (
                <Link key={related._id} href={`/gowns/${related.slug}`} className="group block">
                  <div className="relative aspect-bridal overflow-hidden bg-charcoal-light mb-4">
                    <Image
                      src={urlFor(related.image).width(600).height(800).url()}
                      alt={`${related.name} — REI Bridal`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-ivory group-hover:text-champagne-dark transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-xs tracking-widest uppercase font-light text-ivory/50">
                    {related.designer.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
