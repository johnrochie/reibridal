import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Our Services | REI Bridal',
  description:
    'Discover the full REI Bridal experience — private appointments, expert alterations, in-house fittings, and personalised styling in our Kerry, Ireland boutique.',
};

const services = [
  {
    num: '01',
    title: 'Private Bridal Appointments',
    description:
      'Every appointment at REI Bridal is completely private — the boutique is yours for two hours. No other brides, no distractions. Just you, your loved ones, and a carefully curated edit of our collection. Our stylists will guide you through every style, silhouette, and fabric until you find the one.',
    features: [
      'Exclusive 2-hour private appointments',
      'Personalised gown selection prepared in advance',
      'Complimentary champagne on arrival',
      'Expert styling guidance throughout',
      'Relaxed, pressure-free environment',
    ],
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1000&q=80',
    cta: { label: 'Book an Appointment', href: siteConfig.appointmentUrl },
  },
  {
    num: '02',
    title: 'In-House Alterations & Fittings',
    description:
      'Finding your gown is just the beginning. Our trusted in-house alterations team ensures your dress fits you perfectly on your wedding day. From initial fittings to final adjustments, every detail is attended to with the same care and precision we bring to everything we do.',
    features: [
      'In-house alterations by experienced seamstresses',
      'Multiple fitting appointments included',
      'Bustle, hem, and structural adjustments',
      'Bespoke sizing where required',
      'Final fitting close to your wedding date',
    ],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=1000&q=80',
    cta: { label: 'Contact Us', href: '/contact' },
  },
  {
    num: '03',
    title: 'Personalised Styling',
    description:
      'Our stylists bring years of bridal experience to every appointment. We listen first — to understand your vision, your body, your wedding day — and then we guide. We know how to translate inspiration into reality, and how to find the gown that makes you feel completely, unmistakably yourself.',
    features: [
      'One-to-one styling consultation',
      'Style and silhouette guidance',
      'Fabric and embellishment advice',
      'Accessories and veil coordination',
      'Designer sourcing from our extended network',
    ],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80',
    cta: { label: 'Book a Consultation', href: siteConfig.appointmentUrl },
  },
  {
    num: '04',
    title: 'Bespoke & Special Orders',
    description:
      'Don\'t see exactly what you\'re looking for in our collection? Our relationships with designers mean we can source pieces from our extended network, arrange custom colourways, or work with designers to accommodate specific requests. If it exists in the world of luxury bridal, we can find it.',
    features: [
      'Access to extended designer networks',
      'Custom colourway requests',
      'Special sizing and bespoke adjustments',
      'Trunk show access and pre-order',
      'Direct designer introductions where possible',
    ],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=80',
    cta: { label: 'Enquire Now', href: '/contact' },
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 60% 40%, #c9b882, transparent 55%)' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Everything You Need</span>
          <h1 className="section-title text-ivory">Our Services</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-lg leading-relaxed">
            From your first appointment to your final fitting, we take care of everything.
            This is the REI Bridal experience.
          </p>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <section
          key={service.num}
          className={`grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] ${
            i % 2 === 0 ? '' : 'bg-charcoal-dark'
          }`}
        >
          {/* Image */}
          <div
            className={`relative min-h-[50vh] lg:min-h-full overflow-hidden bg-charcoal-light ${
              i % 2 === 1 ? 'lg:order-2' : ''
            }`}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-charcoal-deep/10" />
          </div>

          {/* Content */}
          <div
            className={`flex items-center px-8 py-20 lg:px-16 xl:px-24 ${
              i % 2 === 1 ? 'lg:order-1 bg-charcoal-dark' : 'bg-charcoal-deep'
            }`}
          >
            <div className="max-w-lg w-full">
              <span className="font-serif text-7xl text-champagne/20 font-light leading-none block mb-2">
                {service.num}
              </span>
              <span className="section-label mb-4 block">Our Service</span>
              <h2 className="font-serif text-4xl md:text-5xl text-ivory leading-tight mb-6">
                {service.title}
              </h2>
              <span className="block w-12 h-px bg-champagne mb-8" />
              <p className="font-sans font-light text-ivory/60 leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="space-y-3 mb-10">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm font-light text-ivory/60"
                  >
                    <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={service.cta.href} className="btn-dark">
                {service.cta.label}
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing note */}
      <section className="py-20 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <span className="section-label mb-6 block">Transparent & Simple</span>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Pricing</h2>
          <span className="deco-line" />
          <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-4 leading-relaxed">
            Our gown collection ranges from approximately{' '}
            <span className="text-champagne">€1,500 to €5,500</span>. Alteration costs are
            quoted individually following your first fitting appointment.
          </p>
          <p className="font-sans font-light text-ivory/40 text-sm max-w-md mx-auto mb-10 leading-relaxed">
            There is no charge for your initial appointment. All pricing is discussed openly
            and without pressure — we want you to feel completely at ease.
          </p>
          <Link href={siteConfig.appointmentUrl} className="btn-primary">
            Book Your Appointment
          </Link>
        </div>
      </section>

      {/* FAQ taster */}
      <section className="py-20 px-6 lg:px-12 bg-charcoal-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-ivory mb-4">Have Questions?</h2>
          <p className="font-sans font-light text-ivory/50 mb-8 max-w-md mx-auto leading-relaxed">
            Find answers to the most common questions about appointments, gowns, and timelines.
          </p>
          <Link href="/contact#faq" className="btn-dark">
            Read Our FAQs
          </Link>
        </div>
      </section>
    </>
  );
}
