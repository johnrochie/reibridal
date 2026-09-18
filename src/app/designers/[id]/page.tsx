import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPublicDesignerBySlug,
  getPublicDesignerSlugs,
  getPublicDesigners,
  getPublicGownsByDesigner,
} from '@/lib/catalogue';
import { resolveMediaUrl } from '@/lib/media';
import { siteConfig } from '@/lib/config';
import CatalogueImage from '@/components/media/CatalogueImage';
import GownCard from '@/components/gowns/GownCard';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const slugs = await getPublicDesignerSlugs();
  return slugs.map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const designer = await getPublicDesignerBySlug(params.id);
  if (!designer) return {};

  const description =
    designer.description ||
    designer.shortBio ||
    `${designer.name} at REI Bridal, Kerry, Ireland.`;
  const cover = designer.cover || designer.portrait;

  return {
    title: `${designer.name} | REI Bridal`,
    description,
    openGraph: cover
      ? {
          images: [
            {
              url: resolveMediaUrl(cover, { width: 1200, height: 630, intent: 'og' }),
              alt: `${designer.name} — REI Bridal`,
            },
          ],
        }
      : undefined,
  };
}

export default async function DesignerDetailPage({ params }: Props) {
  const designer = await getPublicDesignerBySlug(params.id);
  if (!designer) notFound();

  const [designerGowns, allDesigners] = await Promise.all([
    getPublicGownsByDesigner(designer.slug),
    getPublicDesigners(),
  ]);

  const otherDesigners = allDesigners
    .filter((d) => d.slug !== designer.slug && d.featured)
    .slice(0, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Designers', item: `${siteConfig.url}/designers` },
      { '@type': 'ListItem', position: 3, name: designer.name, item: `${siteConfig.url}/designers/${designer.slug}` },
    ],
  };

  const hero = designer.cover || designer.portrait;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[70vh] flex items-end bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          {hero ? (
            <CatalogueImage
              media={hero}
              alt={`${designer.name} — stocked at REI Bridal`}
              fill
              width={1600}
              height={900}
              intent="editorial"
              priority
              className="opacity-50"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-charcoal-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-light text-ivory/40">
              <li>
                <Link href="/" className="hover:text-champagne transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/designers" className="hover:text-champagne transition-colors">
                  Designers
                </Link>
              </li>
              <li>/</li>
              <li className="text-ivory/70">{designer.name}</li>
            </ol>
          </nav>
          {designer.country && <span className="section-label mb-4 block">{designer.country}</span>}
          <h1 className="font-serif text-6xl md:text-8xl text-ivory leading-none mb-6">{designer.name}</h1>
          {designer.shortBio && (
            <p className="font-sans font-light text-ivory/60 max-w-lg leading-relaxed">{designer.shortBio}</p>
          )}
        </div>
      </section>

      {(designer.description || designer.portrait) && (
        <section className="py-24 px-6 lg:px-12 bg-charcoal-deep">
          <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-6 block">About the Designer</span>
              <h2 className="font-serif text-5xl text-ivory leading-tight mb-8">{designer.name}</h2>
              {designer.description && (
                <p className="font-sans font-light text-ivory/60 leading-relaxed text-base mb-10">
                  {designer.description}
                </p>
              )}
              {designer.website && (
                <a
                  href={designer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-champagne hover:text-champagne-dark"
                >
                  Visit {designer.name} →
                </a>
              )}
            </div>
            {designer.portrait && (
              <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden bg-charcoal-light">
                <CatalogueImage
                  media={designer.portrait}
                  alt={`${designer.name} — bridal collection`}
                  fill
                  width={800}
                  height={1000}
                  intent="editorial"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {designerGowns.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-charcoal-dark">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="section-label mb-3 block">The Collection</span>
                <h2 className="section-title">{designer.name} at REI Bridal</h2>
              </div>
              <Link href="/gowns" className="hidden md:block nav-link text-ivory/60 hover:text-champagne">
                All Gowns →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {designerGowns.map((gown) => (
                <GownCard key={gown.id} gown={gown} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <span className="section-label mb-6 block">Experience the Collection</span>
          <h2 className="font-serif text-5xl md:text-6xl text-ivory mb-6">Try {designer.name} at REI Bridal</h2>
          <span className="deco-line" />
          <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-10 leading-relaxed">
            Book a private appointment and explore {designer.name} in our intimate Kerry boutique —
            exclusively for you and your loved ones.
          </p>
          <Link href={siteConfig.appointmentUrl} className="btn-primary">
            Book Your Appointment
          </Link>
        </div>
      </section>

      {otherDesigners.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-charcoal-dark">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-4xl text-ivory mb-12 text-center">Also in Our Boutique</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherDesigners.map((d) => (
                <Link
                  key={d.id}
                  href={`/designers/${d.slug}`}
                  className="group relative overflow-hidden bg-charcoal aspect-square block"
                >
                  <CatalogueImage
                    media={d.portrait || d.cover}
                    alt={`${d.name} — REI Bridal`}
                    fill
                    width={600}
                    height={600}
                    intent="product"
                    className="opacity-60 group-hover:opacity-40 transition-all duration-600 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-serif text-3xl text-ivory mb-1">{d.name}</h3>
                    {d.country && (
                      <p className="text-xs tracking-widest uppercase font-light text-champagne mb-3">
                        {d.country}
                      </p>
                    )}
                    <span className="text-xs tracking-widest uppercase font-light text-ivory/40 group-hover:text-champagne transition-colors">
                      Discover →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/designers" className="btn-dark">
                All Designers
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
