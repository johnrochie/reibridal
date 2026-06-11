import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import AppointmentForm from '@/components/booking/AppointmentForm';
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
      <section className="py-20 px-6 lg:px-12 bg-charcoal-deep">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-serif text-4xl text-ivory mb-8">Book Your Appointment</h2>
            <p className="font-sans font-light text-ivory/60 leading-relaxed mb-10">
              Every journey begins with a conversation. Fill out the form and one of our stylists
              will be in touch within 24 hours to confirm your appointment.
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-3">
                  Location
                </h3>
                <address className="not-italic font-sans font-light text-ivory/60 text-sm leading-relaxed">
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
                    <div key={h.day} className="flex gap-4 text-sm font-light text-ivory/60">
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
                    className="block text-sm font-light text-ivory/60 hover:text-champagne transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="block text-sm font-light text-ivory/60 hover:text-champagne transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-charcoal-dark p-8 md:p-12">
            <h2 className="font-serif text-3xl text-ivory mb-8">Request an Appointment</h2>
            
            <AppointmentForm type="contact" />
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
