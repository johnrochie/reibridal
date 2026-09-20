'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FormType = 'appointment' | 'contact';

const inputClass =
  'w-full bg-transparent border-b border-ivory/20 focus:border-champagne py-3 text-sm font-light text-ivory placeholder:text-ivory/30 outline-none transition-colors';

const labelClass = 'block text-xs tracking-widest uppercase font-light text-ivory/50 mb-2';

export default function AppointmentForm({
  type = 'appointment',
}: {
  type?: FormType;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong.');
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-16 text-center" role="status">
        <span className="font-serif text-4xl text-champagne block mb-4">Thank you</span>
        <p className="font-sans font-light text-ivory/60 max-w-sm mx-auto leading-relaxed">
          {type === 'appointment'
            ? 'Your booking request has been received. We will be in touch to confirm.'
            : 'Your message has been received. We will reply by email.'}
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div>
        <label htmlFor={`${type}-name`} className={labelClass}>
          Name *
        </label>
        <input type="text" id={`${type}-name`} name="name" required className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor={`${type}-email`} className={labelClass}>
          Email *
        </label>
        <input
          type="email"
          id={`${type}-email`}
          name="email"
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      {type === 'appointment' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="appointment-preferredDate" className={labelClass}>
                Preferred date
              </label>
              <input type="date" id="appointment-preferredDate" name="preferredDate" className={inputClass} />
            </div>
            <div>
              <label htmlFor="appointment-partySize" className={labelClass}>
                Party size
              </label>
              <select
                id="appointment-partySize"
                name="partySize"
                className={`${inputClass} appearance-none cursor-pointer [&>option]:bg-charcoal-dark`}
                defaultValue=""
              >
                <option value="">Just me</option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4+">4 or more</option>
              </select>
            </div>
          </div>
        </>
      )}
      <div>
        <label htmlFor={`${type}-message`} className={labelClass}>
          Message{type === 'contact' ? ' *' : ''}
        </label>
        <textarea
          id={`${type}-message`}
          name="message"
          rows={4}
          required={type === 'contact'}
          className={`${inputClass} resize-none`}
          placeholder={type === 'contact' ? 'How can we help?' : 'Anything we should know before your visit'}
        />
      </div>
      <button type="submit" className="btn-filled w-full disabled:opacity-50" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : type === 'appointment' ? 'Request Appointment' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-center font-light text-red-300" role="alert">
          {error} You can also email us at{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-champagne underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
