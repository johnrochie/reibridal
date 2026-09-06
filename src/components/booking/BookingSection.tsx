'use client';

import { useState } from 'react';
import AppointmentForm from './AppointmentForm';
import BridalBookingWidget from '../appointments/BridalBookingWidget';

const embedUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

// Two ways to reserve a slot, side by side for comparison:
//  - "Instant Booking" reads live availability from Evolution Media's
//    booking platform and reserves the slot immediately.
//  - "Enquiry" is the existing form — a request, followed up by hand.
// Defaulting to instant booking puts the new flow in front for review;
// the enquiry form stays one click away, untouched.
type Mode = 'instant' | 'enquiry';

export default function BookingSection() {
  const [mode, setMode] = useState<Mode>('instant');

  if (embedUrl) {
    return (
      <div className="bg-charcoal-dark border border-ivory/10">
        <iframe
          src={embedUrl}
          title="Book your appointment"
          className="w-full min-h-[720px] border-0"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="bg-charcoal-dark border border-ivory/10">
      <div className="grid grid-cols-1 md:grid-cols-5">
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
        </div>
        <div className="md:col-span-3 p-8 md:p-12">
          <div className="flex gap-6 mb-8 border-b border-ivory/10">
            <button
              type="button"
              onClick={() => setMode('instant')}
              aria-pressed={mode === 'instant'}
              className={
                'pb-3 text-xs tracking-widest uppercase font-light transition-colors border-b -mb-px ' +
                (mode === 'instant' ? 'text-champagne border-champagne' : 'text-ivory/40 border-transparent hover:text-ivory/70')
              }
            >
              Instant Booking
            </button>
            <button
              type="button"
              onClick={() => setMode('enquiry')}
              aria-pressed={mode === 'enquiry'}
              className={
                'pb-3 text-xs tracking-widest uppercase font-light transition-colors border-b -mb-px ' +
                (mode === 'enquiry' ? 'text-champagne border-champagne' : 'text-ivory/40 border-transparent hover:text-ivory/70')
              }
            >
              Enquiry Form
            </button>
          </div>
          {mode === 'instant' ? <BridalBookingWidget /> : <AppointmentForm type="appointment" />}
        </div>
      </div>
    </div>
  );
}
