import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getPublicDesignerBySlug,
  getPublicDesignerSlugs,
  getPublicGownsByDesigner,
  pickHeroImage,
} from '@/lib/catalogue';
import { resolveMediaUrl } from '@/lib/media';
import { siteConfig, TBD_COPY } from '@/lib/config';
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

  const gowns = await getPublicGownsByDesigner(designer.slug);
  const cover =
    designer.cover || designer.portrait || pickHeroImage(gowns[0]?.images ?? [])?.media || null;

  return {
    title: designer.name,
    description: `${designer.name} at REI Bridal, Killorglin, Co. Kerry.`,
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

  const designerGowns = await getPublicGownsByDesigner(designer.slug);
  const hero =
    designer.cover ||
    designer.portrait ||
    pickHeroImage(designerGowns[0]?.images ?? [])?.media ||
    null;
  const blurb = designer.description || designer.shortBio || TBD_COPY.brandStory;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Designers', item: `${siteConfig.url}/designers` },
      { '@type': 'ListItem', position: 3, name: designer.name, item: `${siteConfig.url}/designers/${designer.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative min-h-[50vh] flex items-end bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          {hero ? (
            <CatalogueImage
              media={hero}
              alt={`${designer.name} at REI Bridal`}
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
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-16 w-full">
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
          <h1 className="font-serif text-6xl md:text-8xl text-ivory leading-none mb-6">{designer.name}</h1>
          <p className="font-sans font-light text-ivory/60 max-w-3xl leading-relaxed">{blurb}</p>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-charcoal-dark">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-3 block">Dresses</span>
          <h2 className="section-title mb-16">{designer.name}</h2>
          {designerGowns.length === 0 ? (
            <p className="font-sans font-light text-ivory/40">Dresses will appear as they are confirmed.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {designerGowns.map((gown) => (
                <GownCard key={gown.id} gown={gown} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-10 leading-relaxed">
            To try these dresses in person, request a private appointment.
          </p>
          <Link href={siteConfig.appointmentUrl} className="btn-primary">
            Booking Form
          </Link>
        </div>
      </section>
    </>
  );
}
