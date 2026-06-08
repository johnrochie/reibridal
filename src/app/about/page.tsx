import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers, getFeaturedTestimonials } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About Us | REI Bridal',
  description:
    'Learn the story behind REI Bridal, Kerry Ireland\'s most intimate luxury bridal boutique. Our passion for extraordinary gowns and unforgettable experiences.',
};

export default async function AboutPage() {
  const [team, testimonials] = await Promise.all([
    getTeamMembers(),
    getFeaturedTestimonials(),
  ]);

  const values = [
    {
      title: 'Intimacy',
      description:
        'Every appointment is private. No other brides. No distractions. Just you and your most important people.',
    },
    {
      title: 'Curation',
      description:
        'We travel the world to source designers whose work we truly believe in — quality over quantity, always.',
    },
    {
      title: 'Expertise',
      description:
        'Our stylists have years of bridal experience. We listen before we suggest, and guide rather than persuade.',
    },
    {
      title: 'Legacy',
      description:
        'We want to be part of your story forever. The gown is just the beginning of that conversation.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end bg-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80"
            alt="REI Bridal boutique interior"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 pb-20">
          <span className="section-label mb-4 block">Our Story</span>
          <h1 className="font-serif text-6xl md:text-8xl text-ivory leading-none max-w-2xl">
            Rooted in Love,<br />
            <em className="text-champagne">Built for Brides</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-12 bg-ivory">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label mb-6 block">The Beginning</span>
            <h2 className="font-serif text-5xl text-charcoal leading-tight mb-8">
              A Boutique Born from a Belief
            </h2>
            <div className="space-y-5 font-sans font-light text-charcoal/60 leading-relaxed">
              <p>
                REI Bridal was founded on a simple but powerful belief: that finding your wedding
                dress should feel like one of the greatest joys of your engagement — not a source
                of overwhelm, pressure, or compromise.
              </p>
              <p>
                We created REI Bridal as an antidote to the mass-market bridal experience. Nestled
                in the heart of Kerry, our boutique offers something increasingly rare: time, space,
                and genuine expertise, all in service of helping you find a gown that feels
                unmistakably, completely you.
              </p>
              <p>
                Every gown we carry has been personally selected. Every designer we stock shares
                our commitment to exceptional craft. And every appointment we offer is designed
                to feel less like shopping and more like celebration.
              </p>
            </div>
            <Link href={siteConfig.appointmentUrl} className="btn-dark mt-10 inline-block">
              Begin Your Journey
            </Link>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=80"
              alt="REI Bridal — intimate boutique experience"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label mb-3 block">What We Stand For</span>
            <h2 className="font-serif text-5xl text-ivory">Our Values</h2>
            <span className="deco-line" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="border border-champagne/20 p-8 hover:border-champagne/40 transition-colors duration-400"
              >
                <span className="font-serif text-champagne text-6xl font-light leading-none block mb-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl text-ivory mb-4">{v.title}</h3>
                <p className="font-sans font-light text-ivory/50 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <div className="mb-16">
              <span className="section-label mb-3 block">Behind REI Bridal</span>
              <h2 className="section-title">Meet the Team</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {team.map((member) => (
                <div key={member._id} className="group">
                  <div className="relative aspect-portrait overflow-hidden bg-ivory-deep mb-6">
                    <Image
                      src={urlFor(member.image).width(600).height(800).url()}
                      alt={`${member.name} — ${member.role} at REI Bridal`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="font-serif text-3xl text-charcoal mb-1">{member.name}</h3>
                  <p className="section-label mb-4">{member.role}</p>
                  <p className="font-sans font-light text-charcoal/60 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory border-t border-ivory-deep">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label mb-3 block">Real Brides</span>
              <h2 className="font-serif text-5xl text-charcoal">Love Stories</h2>
              <span className="deco-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <blockquote
                  key={t._id}
                  className="border border-champagne/20 p-8 hover:border-champagne/40 transition-colors duration-400"
                >
                  <div className="text-champagne text-4xl font-serif leading-none mb-4">&ldquo;</div>
                  <p className="font-sans font-light text-charcoal/60 text-sm leading-relaxed mb-6 italic">
                    {t.text}
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <span className="block font-serif text-xl text-charcoal">{t.name}</span>
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

      {/* Opening hours */}
      <section className="py-24 px-6 lg:px-12 bg-ivory border-t border-ivory-deep">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label mb-4 block">Visit Us</span>
          <h2 className="font-serif text-4xl text-charcoal mb-2">{siteConfig.address.city}</h2>
          <address className="not-italic font-sans font-light text-charcoal/50 text-sm mb-10 space-y-1">
            <p>{siteConfig.address.street}</p>
            <p>{siteConfig.address.city}, {siteConfig.address.county}, Ireland</p>
          </address>
          <div className="border-t border-b border-ivory-deep py-10 space-y-4 mb-10">
            {siteConfig.openingHours.map((h) => (
              <div key={h.day} className="flex justify-center gap-6 text-sm font-light text-charcoal/60">
                <span className="w-44 text-right">{h.day}</span>
                <span className="text-champagne w-px bg-champagne/30" />
                <span className="w-44">{h.hours}</span>
              </div>
            ))}
          </div>
          <Link href={siteConfig.appointmentUrl} className="btn-dark">
            Book Your Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
