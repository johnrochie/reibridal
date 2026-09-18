import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  galleryImages,
  getPublicGownBySlug,
  getPublicGownSlugs,
  getPublicGowns,
  pickHeroImage,
} from '@/lib/catalogue';
import { resolveMediaUrl } from '@/lib/media';
import { siteConfig } from '@/lib/config';
import CatalogueImage from '@/components/media/CatalogueImage';
import GownCard from '@/components/gowns/GownCard';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const slugs = await getPublicGownSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gown = await getPublicGownBySlug(params.id);
  if (!gown) return {};

  const hero = pickHeroImage(gown.images);
  const description = gown.description
    ? gown.description
    : `${gown.name} by ${gown.designer.name} at REI Bridal, Kerry, Ireland.`;

  return {
    title: `${gown.name} by ${gown.designer.name} | REI Bridal`,
    description,
    openGraph: hero
      ? {
          images: [
            {
              url: resolveMediaUrl(hero.media, { width: 1200, height: 630, intent: 'og' }),
              alt: `${gown.name} — REI Bridal`,
            },
          ],
        }
      : undefined,
  };
}

function Fact({ label, value }: { label: string; value: string | string[] | null }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  const text = Array.isArray(value) ? value.join(' · ') : value;
  return (
    <li className="flex items-start gap-3 text-sm font-light text-ivory/60">
      <span className="w-3 h-px bg-champagne flex-shrink-0 mt-2" />
      <span>
        <span className="block text-[10px] tracking-widest uppercase text-champagne mb-1">{label}</span>
        {text}
      </span>
    </li>
  );
}

export default async function GownDetailPage({ params }: Props) {
  const [gown, allGowns] = await Promise.all([getPublicGownBySlug(params.id), getPublicGowns()]);
  if (!gown) notFound();

  const frames = galleryImages(gown);
  const hero = frames[0] ?? null;
  const extra = frames.slice(1);

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

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${gown.name} by ${gown.designer.name}`,
    ...(gown.description ? { description: gown.description } : {}),
    ...(hero ? { image: resolveMediaUrl(hero.media, { width: 1200, intent: 'editorial' }) } : {}),
    brand: { '@type': 'Brand', name: gown.designer.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStoreOnly',
      seller: { '@type': 'Organization', name: 'REI Bridal' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <nav className="pt-32 pb-6 px-6 lg:px-12 max-w-8xl mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-light text-ivory/40">
          <li>
            <Link href="/" className="hover:text-champagne transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/gowns" className="hover:text-champagne transition-colors">
              Gowns
            </Link>
          </li>
          <li>/</li>
          <li className="text-ivory/70">{gown.name}</li>
        </ol>
      </nav>

      <section className="px-6 lg:px-12 pb-24 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          <div className="space-y-4">
            <div className="relative aspect-bridal overflow-hidden bg-charcoal-light">
              <CatalogueImage
                media={hero?.media}
                alt={`${gown.name} by ${gown.designer.name} — REI Bridal`}
                fill
                width={1200}
                intent="editorial"
                priority
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {gown.isNew && (
                <span className="absolute top-6 left-6 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5">
                  New Arrival
                </span>
              )}
            </div>
            {extra.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {extra.map((image) => (
                  <div key={image.id} className="relative aspect-[3/4] overflow-hidden bg-charcoal-light">
                    <CatalogueImage
                      media={image.media}
                      alt={
                        image.type
                          ? `${gown.name} ${image.type} — REI Bridal`
                          : `${gown.name} by ${gown.designer.name} — REI Bridal`
                      }
                      fill
                      width={800}
                      intent={image.type === 'editorial' || image.type === 'lifestyle' ? 'editorial' : 'product'}
                      objectFit="cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center py-8 lg:py-0">
            <Link
              href={`/designers/${gown.designer.slug}`}
              className="section-label mb-4 hover:text-champagne transition-colors"
            >
              {gown.designer.name}
            </Link>
            <h1 className="font-serif text-6xl md:text-7xl text-ivory leading-none mb-4">{gown.name}</h1>
            <span className="block w-12 h-px bg-champagne mb-8" />

            {gown.price && (
              <p className="text-sm font-light text-ivory/50 mb-8 tracking-widest uppercase">{gown.price}</p>
            )}

            {gown.description && (
              <p className="font-sans font-light text-ivory/70 leading-relaxed mb-10 text-base">{gown.description}</p>
            )}

            <ul className="space-y-4 mb-10">
              <Fact label="Sizes" value={gown.sizes} />
              <Fact label="Silhouette" value={gown.silhouette} />
              <Fact label="Fabric" value={gown.fabric} />
              <Fact label="Style" value={gown.style} />
              <Fact label="Availability" value={gown.availability} />
            </ul>

            <div className="space-y-4">
              <Link href={siteConfig.appointmentUrl} className="btn-filled w-full text-center block">
                Book to Try This Gown
              </Link>
              <p className="text-xs text-center font-light text-ivory/40 leading-relaxed">
                Details are published only once confirmed. Book a private appointment to view the gown in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {allRelated.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-charcoal-dark border-t border-ivory/10">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-4xl text-ivory mb-12 text-center">You May Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {allRelated.map((related) => (
                <GownCard key={related.id} gown={related} sizes="(max-width: 640px) 100vw, 33vw" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
