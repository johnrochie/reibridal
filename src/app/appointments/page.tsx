import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

function BookingPlaceholder() {
  return (
    <div className="bg-ivory border border-ivory-deep">
      {/* Two-column layout: contact info + form */}
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Left panel */}
        <div className="md:col-span-2 bg-charcoal p-10 flex flex-col justify-between">
          <div>
            <span className="section-label mb-6 block">Your Appointment</span>
            <h3 className="font-serif text-3xl text-ivory mb-6">What to Expect</h3>
            <ul className="space-y-5">
              {[
                ['2 hours', 'Exclusive private time in the boutique'],
                ['Your guests', 'Bring up to 3 of your favourite people'],
                ['Champagne', 'Complimentary on arrival'],
                ['No pressure', 'Browse at your own pace'],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                  <div>
                    <span className="block text-xs tracking-widest uppercase font-light text-champagne mb-0.5">
                      {title}
                    </span>
                    <span className="text-sm font-light text-ivory/50">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 pt-10 border-t border-ivory/10">
            <p className="text-xs font-light text-ivory/30 leading-relaxed">
              Prefer to call? Reach us at{' '}
              <a href={`tel:${siteConfig.phone}`} className="text-champagne/70 hover:text-champagne transition-colors">
                {siteConfig.phone}
              </a>
            </p>
          </div>
        </div>

        {/* Right panel — swap this div for your booking widget */}
        <div className="md:col-span-3 p-10 flex flex-col items-center justify-center min-h-96 text-center">
          <span className="section-label mb-4 block">Coming Soon</span>
          <p className="font-serif text-2xl text-charcoal/40 mb-6">
            Online booking coming soon
          </p>
          <p className="font-sans font-light text-charcoal/40 text-sm mb-8 max-w-xs leading-relaxed">
            In the meantime, request your appointment via our contact form and we&apos;ll
            confirm within 24 hours.
          </p>
          <Link href="/contact" className="btn-dark">
            Request via Contact Form
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Book an Appointment | REI Bridal',
  description:
    'Book your private bridal appointment at REI Bridal in Kerry, Ireland. Exclusive 2-hour appointments for an intimate, personal wedding dress experience.',
};

export default function AppointmentsPage() {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Date',
      desc: 'Select a date and time that works for you. We offer appointments Tuesday through Saturday.',
    },
    {
      num: '02',
      title: 'Tell Us About You',
      desc: 'Share your wedding date, style inspiration, and who you\'ll be bringing with you.',
    },
    {
      num: '03',
      title: 'We Prepare',
      desc: 'Our team will carefully select pieces for you to explore, based on your vision and our expertise.',
    },
    {
      num: '04',
      title: 'Your Appointment',
      desc: 'Arrive, relax, and let us guide you to the gown you\'ll remember forever.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto text-center">
          <span className="section-label mb-4 block">Private Appointments</span>
          <h1 className="font-serif text-6xl md:text-8xl text-ivory leading-none mb-6">
            Book Your<br />
            <em className="text-champagne">Appointment</em>
          </h1>
          <span className="block w-16 h-px bg-champagne mx-auto mt-8" />
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 lg:px-12 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-charcoal">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <span className="font-serif text-6xl text-champagne/30 font-light block mb-4">
                  {step.num}
                </span>
                <h3 className="font-serif text-2xl text-charcoal mb-3">{step.title}</h3>
                <p className="font-sans font-light text-charcoal/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widget */}
      <section className="py-20 px-6 lg:px-12 bg-ivory-warm" id="appointments">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-charcoal mb-4">Reserve Your Date</h2>
            <p className="font-sans font-light text-charcoal/50 leading-relaxed max-w-md mx-auto">
              Select a date and time that suits you. We offer appointments Tuesday through Saturday.
            </p>
          </div>

          {/*
            ── BOOKING WIDGET ──────────────────────────────────────────────
            Replace the <BookingPlaceholder /> below with your booking embed.

            Calendly inline widget:
              <div
                className="calendly-inline-widget min-h-[700px]"
                data-url="https://calendly.com/YOUR_LINK"
              />
              Add to layout.tsx <head>:
              <script src="https://assets.calendly.com/assets/external/widget.js" async />

            Acuity Scheduling:
              <iframe
                src="https://app.acuityscheduling.com/schedule.php?owner=YOUR_ID"
                className="w-full min-h-[800px] border-0"
                title="Book an appointment"
              />

            Square Appointments:
              Use their booking link button or inline embed from your Square dashboard.
            ────────────────────────────────────────────────────────────────
          */}
          <BookingPlaceholder />
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-20 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-3xl text-ivory leading-relaxed italic">
            &ldquo;There is no pressure, no rush, and no expectation. Just the pure joy of finding
            your dress.&rdquo;
          </p>
          <span className="deco-line" />
          <span className="section-label">— REI Bridal</span>
        </div>
      </section>
    </>
  );
}
