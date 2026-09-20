import type { Metadata } from 'next';
import Link from 'next/link';
import { getHeroDressSlides, getPublicDesigners } from '@/lib/catalogue';
import { getFeaturedTestimonials, getAllGalleryImages } from '@/sanity/queries';
import { siteAssets } from '@/lib/media';
import { siteConfig } from '@/lib/config';
import CatalogueImage from '@/components/media/CatalogueImage';
import HeroCarousel from '@/components/hero/HeroCarousel';

export const metadata: Metadata = {
  title: 'REI Bridal | Luxury Bridal Boutique Kerry, Ireland',
  description:
    'REI Bridal — a luxury bridal boutique in Killorglin, Co. Kerry. View designers and book a private appointment.',
};

export default async function HomePage() {
  const [heroSlides, designers, testimonials, galleryImages] = await Promise.all([
    getHeroDressSlides(),
    getPublicDesigners(),
    getFeaturedTestimonials(),
    getAllGalleryImages(),
  ]);
  const featuredDesigners = designers.filter((designer) => designer.featured);
  const heroGallery = galleryImages.slice(0, 4);
  const slides =
    heroSlides.length > 0
      ? heroSlides
      : [
          {
            media: siteAssets.experienceDetail,
            alt: siteAssets.experienceDetail.alt || 'Bridal gown detail',
          },
        ];

  return (
    <>
      <section className="relative min-h-screen flex items-end overflow-hidden bg-charcoal-deep">
        <HeroCarousel slides={slides} />

        <div className="relative z-10 w-full max-w-8xl mx-auto px-6 lg:px-12 pb-20 md:pb-32">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory leading-tight">
              Luxury Bridal Boutique,
              <br />
              <span className="text-champagne">Killorglin, Co. Kerry</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-charcoal-dark">
        <div className="max-w-4xl mx-auto text-center">
          <span className="deco-line" />
          <p className="font-serif text-3xl md:text-4xl text-ivory font-light leading-relaxed text-balance">
            &ldquo;We believe finding your wedding dress should feel like falling in love —
            <em> effortless, memorable, and entirely yours.</em>&rdquo;
          </p>
          <span className="deco-line" />
          <p className="section-label mt-2">— The REI Bridal Team</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="relative min-h-[50vh] lg:min-h-full">
          <CatalogueImage
            media={siteAssets.experienceDetail}
            alt={siteAssets.experienceDetail.alt || 'Bridal gown detail'}
            fill
            width={1600}
            intent="editorial"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="bg-charcoal flex items-center px-8 py-20 lg:px-16 xl:px-24">
          <div className="max-w-lg">
            <span className="section-label mb-6 block">{siteConfig.experienceNavLabel}</span>
            <h2 className="font-serif text-5xl md:text-6xl text-ivory leading-tight mb-8">
              Your Appointment,<br />
              <em className="text-champagne">Your Moment</em>
            </h2>
            <p className="font-sans font-light text-ivory/60 leading-relaxed mb-10">
              Private appointments in our Killorglin boutique. Details of the visit will appear here
              once they are confirmed.
            </p>
            <Link href="/experience" className="btn-primary">
              {siteConfig.experienceNavLabel}
            </Link>
          </div>
        </div>
      </section>

      {featuredDesigners.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-charcoal-dark">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Our Curation</span>
              <h2 className="section-title">The Designers</h2>
              <span className="deco-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDesigners.map((designer) => (
                <Link
                  key={designer.id}
                  href={`/designers/${designer.slug}`}
                  className="group relative overflow-hidden bg-charcoal aspect-square"
                >
                  <CatalogueImage
                    media={designer.portrait}
                    alt={`${designer.name} — Designer at REI Bridal`}
                    fill
                    width={600}
                    height={600}
                    intent="product"
                    className="opacity-60 group-hover:opacity-40 transition-all duration-600 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-serif text-3xl text-ivory mb-2">{designer.name}</h3>
                    {designer.country && (
                      <p className="text-xs tracking-widest uppercase font-light text-champagne mb-4">
                        {designer.country}
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

      {testimonials.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-charcoal">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Real Brides</span>
              <h2 className="font-serif text-5xl md:text-6xl text-ivory">Love Stories</h2>
              <span className="deco-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <blockquote
                  key={t._id}
                  className="border border-champagne/20 p-8 hover:border-champagne/40 transition-colors duration-400"
                >
                  <div className="text-champagne text-4xl font-serif leading-none mb-4">&ldquo;</div>
                  <p className="font-sans font-light text-ivory/60 text-sm leading-relaxed mb-6 italic">
                    {t.text}
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <span className="block font-serif text-xl text-ivory">{t.name}</span>
                      <span className="text-xs tracking-widest uppercase font-light text-champagne/50">
                        {t.date}
                        {t.location && ` · ${t.location}`}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {(() => {
        const gallery =
          heroGallery.length > 0
            ? heroGallery.map((img) => ({
                media: {
                  provider: 'sanity' as const,
                  key: img.image.asset._ref,
                  alt: img.alt,
                  sanitySource: img.image,
                },
                alt: img.alt,
              }))
            : siteAssets.gallery.map((media) => ({ media, alt: media.alt || 'REI Bridal gallery' }));
        return (
          <section className="py-24 px-6 lg:px-12 bg-charcoal-deep">
            <div className="max-w-8xl mx-auto">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="section-label mb-3 block">Our Gallery</span>
                  <h2 className="section-title">Real Brides, Real Moments</h2>
                </div>
                <Link href="/gallery" className="hidden md:block nav-link text-ivory/60 hover:text-champagne">
                  View Gallery →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {gallery.map((img, i) => (
                  <Link
                    key={`${img.media.provider}-${img.media.key}`}
                    href="/gallery"
                    className={`relative overflow-hidden group bg-charcoal-light ${
                      i === 0 ? 'row-span-2' : 'aspect-square'
                    }`}
                    style={{ aspectRatio: i === 0 ? '3/4' : '1/1' }}
                  >
                    <CatalogueImage
                      media={img.media}
                      alt={img.alt}
                      fill
                      width={800}
                      height={i === 0 ? 1200 : 800}
                      intent="editorial"
                      className="transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/30 transition-colors duration-500 flex items-center justify-center">
                      <span className="text-xs tracking-widest uppercase text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10 md:hidden">
                <Link href="/gallery" className="btn-dark">
                  View Full Gallery
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      <section className="py-16 px-6 lg:px-12 bg-charcoal-dark border-t border-ivory/10">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="section-label mb-2 block">Follow Our Journey</span>
            <h3 className="font-serif text-3xl text-ivory">@reibridal</h3>
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
          >
            Follow on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
