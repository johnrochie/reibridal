import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedGowns, getFeaturedDesigners, getFeaturedTestimonials, getAllGalleryImages } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'REI Bridal | Luxury Bridal Boutique Kerry, Ireland',
  description:
    'REI Bridal — a luxury bridal boutique in Kerry, Ireland. Discover our curated collection of designer wedding gowns. Book your private appointment today.',
};

export default async function HomePage() {
  const [featuredGowns, featuredDesigners, testimonials, galleryImages] = await Promise.all([
    getFeaturedGowns(),
    getFeaturedDesigners(),
    getFeaturedTestimonials(),
    getAllGalleryImages(),
  ]);

  const heroGallery = galleryImages.slice(0, 4);

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-charcoal-deep">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=1600&q=85"
            alt="REI Bridal hero — bride in luxury gown"
            fill
            priority
            className="object-cover object-center opacity-50"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal/40 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-8xl mx-auto px-6 lg:px-12 pb-20 md:pb-32">
          <div className="max-w-3xl">
            <span className="section-label mb-8 block animate-fade-in">
              Kerry, Ireland
            </span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-ivory leading-none mb-8"
              style={{ animationDelay: '200ms' }}>
              Where Every<br />
              <em className="not-italic text-champagne">Love Story</em><br />
              Begins
            </h1>
            <p className="font-sans font-light text-ivory/60 text-lg max-w-md mb-10 leading-relaxed">
              An intimate bridal boutique carrying the world&apos;s most extraordinary wedding gowns.
              By appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={siteConfig.appointmentUrl} className="btn-primary">
                Book an Appointment
              </Link>
              <Link href="/gowns" className="btn-primary border-ivory/30 text-ivory/70 hover:bg-ivory/10 hover:text-ivory">
                Explore Gowns
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-12 hidden md:flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase font-light text-champagne/50 rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-champagne/50 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO STRIP
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
        <div className="max-w-4xl mx-auto text-center">
          <span className="deco-line" />
          <p className="font-serif text-3xl md:text-4xl text-charcoal font-light leading-relaxed text-balance">
            &ldquo;We believe finding your wedding dress should feel like falling in love —
            <em> effortless, memorable, and entirely yours.</em>&rdquo;
          </p>
          <span className="deco-line" />
          <p className="section-label mt-2">— The REI Bridal Team</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED GOWNS
      ══════════════════════════════════════════ */}
      {featuredGowns.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="section-label mb-3 block">Current Collection</span>
                <h2 className="section-title">Featured Gowns</h2>
              </div>
              <Link href="/gowns" className="hidden md:block nav-link text-charcoal/60 hover:text-champagne">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {featuredGowns.map((gown) => (
                <Link
                  key={gown._id}
                  href={`/gowns/${gown.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-bridal overflow-hidden bg-ivory-deep mb-5">
                    <Image
                      src={urlFor(gown.image).width(600).height(800).url()}
                      alt={`${gown.name} by ${gown.designer.name} — REI Bridal`}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {gown.isNew && (
                      <span className="absolute top-4 left-4 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5 font-sans font-light">
                        New
                      </span>
                    )}
                    <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/90 to-transparent">
                      <span className="text-xs tracking-widest text-champagne uppercase font-light">
                        View Gown →
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal mb-1 group-hover:text-champagne-dark transition-colors">
                      {gown.name}
                    </h3>
                    <p className="text-xs tracking-widest uppercase font-light text-charcoal/50">
                      {gown.designer.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12 md:hidden">
              <Link href="/gowns" className="btn-dark">
                View All Gowns
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          EXPERIENCE SPLIT SECTION
      ══════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Image */}
        <div className="relative min-h-[50vh] lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
            alt="The REI Bridal boutique experience"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {/* Content */}
        <div className="bg-charcoal flex items-center px-8 py-20 lg:px-16 xl:px-24">
          <div className="max-w-lg">
            <span className="section-label mb-6 block">The Experience</span>
            <h2 className="font-serif text-5xl md:text-6xl text-ivory leading-tight mb-8">
              Your Appointment,<br />
              <em className="text-champagne">Your Moment</em>
            </h2>
            <p className="font-sans font-light text-ivory/60 leading-relaxed mb-6">
              Every bride deserves to feel celebrated. Our private appointments give you the full
              boutique to yourself — no crowds, no rush, no distractions. Just you, your loved ones,
              and a carefully curated edit of the world&apos;s most extraordinary gowns.
            </p>
            <p className="font-sans font-light text-ivory/60 leading-relaxed mb-10">
              Our experienced stylists will listen, guide, and help you find the gown that makes
              you feel completely, undeniably yourself.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Private 2-hour exclusive appointments',
                'Complimentary champagne on arrival',
                'Personalised styling guidance',
                'Alterations & fittings in-house',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-ivory/50">
                  <span className="w-4 h-px bg-champagne mt-2.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href={siteConfig.appointmentUrl} className="btn-primary">
              Book Your Experience
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESIGNERS STRIP
      ══════════════════════════════════════════ */}
      {featuredDesigners.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Our Curation</span>
              <h2 className="section-title">The Designers</h2>
              <span className="deco-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredDesigners.map((designer) => (
                <Link
                  key={designer._id}
                  href={`/designers/${designer.slug}`}
                  className="group relative overflow-hidden bg-charcoal aspect-square"
                >
                  <Image
                    src={urlFor(designer.image).width(600).height(600).url()}
                    alt={`${designer.name} — Designer at REI Bridal`}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-all duration-600 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-serif text-3xl text-ivory mb-2">{designer.name}</h3>
                    <p className="text-xs tracking-widest uppercase font-light text-champagne mb-4">
                      {designer.country}
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

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
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
                        {t.date}{t.location && ` · ${t.location}`}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          GALLERY PREVIEW
      ══════════════════════════════════════════ */}
      {heroGallery.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory">
          <div className="max-w-8xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="section-label mb-3 block">Our Gallery</span>
                <h2 className="section-title">Real Brides, Real Moments</h2>
              </div>
              <Link href="/gallery" className="hidden md:block nav-link text-charcoal/60 hover:text-champagne">
                View Gallery →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {heroGallery.map((img, i) => (
                <Link
                  key={img._id}
                  href="/gallery"
                  className={`relative overflow-hidden group bg-ivory-deep ${
                    i === 0 ? 'row-span-2' : 'aspect-square'
                  }`}
                  style={{ aspectRatio: i === 0 ? '3/4' : '1/1' }}
                >
                  <Image
                    src={urlFor(img.image).width(400).height(i === 0 ? 600 : 400).url()}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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
      )}

      {/* ══════════════════════════════════════════
          INSTAGRAM STRIP
      ══════════════════════════════════════════ */}
      <section className="py-16 px-6 lg:px-12 bg-ivory-warm border-t border-ivory-deep">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="section-label mb-2 block">Follow Our Journey</span>
            <h3 className="font-serif text-3xl text-charcoal">@reibridal</h3>
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
