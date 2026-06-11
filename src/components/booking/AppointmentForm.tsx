'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/config';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full bg-transparent border-b border-ivory/20 focus:border-champagne py-3 text-sm font-light text-ivory placeholder:text-ivory/30 outline-none transition-colors';

const labelClass =
  'block text-xs tracking-widest uppercase font-light text-ivory/50 mb-2';

export default function AppointmentForm({
  type = 'appointment',
}: {
  type?: 'appointment' | 'contact';
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
          Your request has been received. One of our stylists will be in touch within 24 hours
          to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${type}-name`} className={labelClass}>
            Full Name *
          </label>
          <input
            type="text"
            id={`${type}-name`}
            name="name"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`${type}-email`} className={labelClass}>
            Email Address *
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor={`${type}-phone`} className={labelClass}>
            Phone Number
          </label>
          <input
            type="tel"
            id={`${type}-phone`}
            name="phone"
            className={inputClass}
            placeholder="+353 ..."
          />
        </div>
        <div>
          <label htmlFor={`${type}-weddingDate`} className={labelClass}>
            Wedding Date
          </label>
          <input
            type="date"
            id={`${type}-weddingDate`}
            name="weddingDate"
            className={inputClass}
          />
        </div>
      </div>
      {type === 'appointment' && (
        <div>
          <label htmlFor="appointment-partySize" className={labelClass}>
            Guests Joining You
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
          </select>
        </div>
      )}
      <div>
        <label htmlFor={`${type}-message`} className={labelClass}>
          Tell Us About You
        </label>
        <textarea
          id={`${type}-message`}
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Your vision, style inspiration, any questions..."
        />
      </div>
      <button type="submit" className="btn-filled w-full disabled:opacity-50" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : type === 'appointment' ? 'Request Appointment' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-center font-light text-red-300" role="alert">
          {error} You can also email us directly at{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-champagne underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}
      <p className="text-xs text-center font-light text-ivory/30">
        We&apos;ll be in touch within 24 hours.
      </p>
    </form>
  );
}
