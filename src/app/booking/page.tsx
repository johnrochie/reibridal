import type { Metadata } from 'next';
import BookingSection from '@/components/booking/BookingSection';

export const metadata: Metadata = {
  title: 'Booking Form',
  description: 'Request a private appointment at REI Bridal in Killorglin, Co. Kerry.',
};

export default function BookingPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Private Appointments</span>
          <h1 className="section-title text-ivory">Booking Form</h1>
          <span className="block w-16 h-px bg-champagne mt-6" />
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-charcoal-dark" id="booking">
        <div className="max-w-4xl mx-auto">
          <p className="font-sans font-light text-ivory/50 leading-relaxed max-w-md mb-12">
            Prefer a date and tell us who is coming. We will confirm by email.
          </p>
          <BookingSection />
        </div>
      </section>
    </>
  );
}
