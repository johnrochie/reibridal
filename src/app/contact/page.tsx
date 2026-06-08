import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { FAQPageSchema } from '@/components/seo/FAQPageSchema';

export const metadata: Metadata = {
  title: 'Contact & Appointments | REI Bridal',
  description:
    'Book a private bridal appointment at REI Bridal, Kerry, Ireland. Contact us to arrange your exclusive consultation and begin your wedding dress journey.',
};

export default function ContactPage() {
  const faqs = [
    {
      q: 'How long is a bridal appointment?',
      a: 'Our private appointments are 2 hours long, giving you plenty of time to explore the collection without any rush.',
    },
    {
      q: 'How many guests can I bring?',
      a: 'We recommend bringing 2–3 of your most trusted companions. Smaller groups tend to result in clearer decisions and a more relaxed experience.',
    },
    {
      q: 'What is the price range of your gowns?',
      a: 'Our collection ranges from approximately €1,500 to €5,500. Pricing is discussed during your appointment and varies by designer and style.',
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend beginning your dress search 12–18 months before your wedding date, as most gowns take 4–6 months to order and alterations require an additional 2–3 months.',
    },
    {
      q: 'Do you offer in-house alterations?',
      a: 'Yes. We work with our own trusted alterations team to ensure your gown fits you perfectly on your wedding day.',
    },
    {
      q: 'Can I try on gowns without booking?',
      a: 'All our appointments are private and must be booked in advance. This allows us to prepare the boutique and your selection specifically for you.',
    },
  ];

  return (
    <>
      <FAQPageSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal" id="faq">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Get in Touch</span>
          <h1 className="section-title text-ivory">Contact & Appointments</h1>
          <span className="block w-16 h-px bg-champagne mt-6" />
        </div>
      </section>

      {/* Contact + Form grid */}
      <section className="py-20 px-6 lg:px-12 bg-ivory">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-serif text-4xl text-charcoal mb-8">Book Your Appointment</h2>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed mb-10">
              Every journey begins with a conversation. Fill out the form and one of our stylists
              will be in touch within 24 hours to confirm your appointment.
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-3">
                  Location
                </h3>
                <address className="not-italic font-sans font-light text-charcoal/60 text-sm leading-relaxed">
                  <p>{siteConfig.address.street}</p>
                  <p>{siteConfig.address.city}</p>
                  <p>{siteConfig.address.county}</p>
                  <p>Ireland</p>
                </address>
              </div>
              <div>
                <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-3">
                  Opening Hours
                </h3>
                <div className="space-y-2">
                  {siteConfig.openingHours.map((h) => (
                    <div key={h.day} className="flex gap-4 text-sm font-light text-charcoal/60">
                      <span className="w-40">{h.day}</span>
                      <span>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-3">
                  Direct Contact
                </h3>
                <div className="space-y-2">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="block text-sm font-light text-charcoal/60 hover:text-champagne transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block text-sm font-light text-charcoal/60 hover:text-champagne transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-ivory-warm p-8 md:p-12">
            <h2 className="font-serif text-3xl text-charcoal mb-8">Request an Appointment</h2>
            {/* 
              NOTE FOR DEVELOPER:
              Replace this form with Netlify Forms, Formspree, or your preferred form handler.
              Add action="/api/contact" and implement the API route, or use a third-party service.
            */}
            <form className="space-y-6" action="#" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs tracking-widest uppercase font-light text-charcoal/50 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-transparent border-b border-charcoal/20 focus:border-champagne py-3 text-sm font-light text-charcoal placeholder:text-charcoal/30 outline-none transition-colors"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs tracking-widest uppercase font-light text-charcoal/50 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-transparent border-b border-charcoal/20 focus:border-champagne py-3 text-sm font-light text-charcoal placeholder:text-charcoal/30 outline-none transition-colors"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-widest uppercase font-light text-charcoal/50 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-champagne py-3 text-sm font-light text-charcoal placeholder:text-charcoal/30 outline-none transition-colors"
                  placeholder="hello@yourname.ie"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs tracking-widest uppercase font-light text-charcoal/50 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-champagne py-3 text-sm font-light text-charcoal placeholder:text-charcoal/30 outline-none transition-colors"
                  placeholder="+353 XX XXX XXXX"
                />
              </div>
              <div>
                <label htmlFor="weddingDate" className="block text-xs tracking-widest uppercase font-light text-charcoal/50 mb-2">
                  Wedding Date
                </label>
                <input
                  type="date"
                  id="weddingDate"
                  name="weddingDate"
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-champagne py-3 text-sm font-light text-charcoal outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase font-light text-charcoal/50 mb-2">
                  Tell Us About You
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-charcoal/20 focus:border-champagne py-3 text-sm font-light text-charcoal placeholder:text-charcoal/30 outline-none transition-colors resize-none"
                  placeholder="Your vision, style inspiration, any questions..."
                />
              </div>
              <button type="submit" className="btn-filled w-full">
                Request Appointment
              </button>
              <p className="text-xs text-center font-light text-charcoal/30">
                We&apos;ll be in touch within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label mb-3 block">Before You Visit</span>
            <h2 className="font-serif text-5xl text-ivory">Frequently Asked Questions</h2>
            <span className="deco-line" />
          </div>
          <div className="space-y-0 divide-y divide-champagne/10">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="font-serif text-xl text-ivory mb-3">{faq.q}</h3>
                <p className="font-sans font-light text-ivory/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
