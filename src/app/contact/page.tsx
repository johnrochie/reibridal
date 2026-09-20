import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import AppointmentForm from '@/components/booking/AppointmentForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact REI Bridal in Killorglin, Co. Kerry.',
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Get in Touch</span>
          <h1 className="section-title text-ivory">Contact Us</h1>
          <span className="block w-16 h-px bg-champagne mt-6" />
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-charcoal-deep">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="font-sans font-light text-ivory/60 leading-relaxed mb-10">
              Send a message and we will reply by email.
            </p>
            <div className="space-y-8">
              <div>
                <h2 className="text-xs tracking-widest uppercase font-light text-champagne mb-3">Location</h2>
                <address className="not-italic font-sans font-light text-ivory/60 text-sm leading-relaxed">
                  <p>{siteConfig.address.street}</p>
                  <p>{siteConfig.address.city}</p>
                  <p>{siteConfig.address.county}</p>
                  <p>{siteConfig.address.country}</p>
                </address>
              </div>
              <div>
                <h2 className="text-xs tracking-widest uppercase font-light text-champagne mb-3">Email</h2>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm font-light text-ivory/60 hover:text-champagne transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-charcoal-dark p-8 md:p-12">
            <h2 className="font-serif text-3xl text-ivory mb-8">Message</h2>
            <AppointmentForm type="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
