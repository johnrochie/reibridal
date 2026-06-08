import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { designers, gowns } from '@/lib/data';
import { siteConfig } from '@/lib/config';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return designers.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const designer = designers.find((d) => d.id === params.id);
  if (!designer) return {};

  return {
    title: `${designer.name} | REI Bridal`,
    description: `${designer.description} Exclusively stocked at REI Bridal, Kerry, Ireland.`,
    openGraph: {
      images: [{ url: designer.coverImage, alt: `${designer.name} — REI Bridal` }],
    },
  };
}

export default function DesignerDetailPage({ params }: Props) {
  const designer = designers.find((d) => d.id === params.id);
  if (!designer) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Designers', item: `${siteConfig.url}/designers` },
      { '@type': 'ListItem', position: 3, name: designer.name, item: `${siteConfig.url}/designers/${designer.id}` },
    ],
  };

  const designerGowns = gowns.filter(
    (g) => g.designer === designer.name && g.available
  );

  const otherDesigners = designers
    .filter((d) => d.id !== designer.id && d.featured)
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={designer.coverImage}
            alt={`${designer.name} — stocked at REI Bridal`}
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-light text-ivory/40">
              <li><Link href="/" className="hover:text-champagne transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/designers" className="hover:text-champagne transition-colors">Designers</Link></li>
              <li>/</li>
              <li className="text-ivory/70">{designer.name}</li>
            </ol>
          </nav>
          <span className="section-label mb-4 block">{designer.country}</span>
          <h1 className="font-serif text-6xl md:text-8xl text-ivory leading-none mb-6">
            {designer.name}
          </h1>
          <p className="font-sans font-light text-ivory/60 max-w-lg leading-relaxed">
            {designer.shortBio}
          </p>
        </div>
      </section>

      {/* About the designer */}
      <section className="py-24 px-6 lg:px-12 bg-ivory">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label mb-6 block">About the Designer</span>
            <h2 className="font-serif text-5xl text-charcoal leading-tight mb-8">
              {designer.name}
            </h2>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed text-base mb-10">
              {designer.description}
            </p>
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
          <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden bg-ivory-deep">
            <Image
              src={designer.image}
              alt={`${designer.name} — bridal collection`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Gowns from this designer */}
      {designerGowns.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="section-label mb-3 block">The Collection</span>
                <h2 className="section-title">
                  {designer.name} at REI Bridal
                </h2>
              </div>
              <Link
                href="/gowns"
                className="hidden md:block nav-link text-charcoal/60 hover:text-champagne"
              >
                All Gowns →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {designerGowns.map((gown) => (
                <Link key={gown.id} href={`/gowns/${gown.id}`} className="group block">
                  <div className="relative aspect-bridal overflow-hidden bg-ivory-deep mb-5">
                    <Image
                      src={gown.image}
                      alt={`${gown.name} by ${gown.designer} — REI Bridal`}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {gown.isNew && (
                      <span className="absolute top-4 left-4 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5 font-sans font-light">
                        New
                      </span>
                    )}
                    <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/20 transition-colors duration-500 flex items-end">
                      <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/80 to-transparent">
                        <span className="text-xs tracking-widest text-champagne uppercase font-light">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal mb-1 group-hover:text-champagne-dark transition-colors">
                      {gown.name}
                    </h3>
                    <p className="text-xs tracking-widest uppercase font-light text-charcoal/50">
                      {gown.priceRange || gown.price || 'POA'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Book CTA */}
      <section className="py-24 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <span className="section-label mb-6 block">Experience the Collection</span>
          <h2 className="font-serif text-5xl md:text-6xl text-ivory mb-6">
            Try {designer.name} at REI Bridal
          </h2>
          <span className="deco-line" />
          <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-10 leading-relaxed">
            Book a private appointment and explore the full {designer.name} collection
            in our intimate Kerry boutique — exclusively for you and your loved ones.
          </p>
          <Link href={siteConfig.appointmentUrl} className="btn-primary">
            Book Your Appointment
          </Link>
        </div>
      </section>

      {/* Other designers */}
      {otherDesigners.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-4xl text-charcoal mb-12 text-center">
              Also in Our Boutique
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherDesigners.map((d) => (
                <Link
                  key={d.id}
                  href={`/designers/${d.id}`}
                  className="group relative overflow-hidden bg-charcoal aspect-square block"
                >
                  <Image
                    src={d.image}
                    alt={`${d.name} — REI Bridal`}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-all duration-600 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-serif text-3xl text-ivory mb-1">{d.name}</h3>
                    <p className="text-xs tracking-widest uppercase font-light text-champagne mb-3">
                      {d.country}
                    </p>
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
