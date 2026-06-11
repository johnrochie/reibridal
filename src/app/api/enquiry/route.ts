import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config';

interface EnquiryPayload {
  type: 'appointment' | 'contact';
  name: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  partySize?: string;
  message?: string;
  company?: string; // honeypot
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot — silently accept bot submissions without delivering
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || '').trim().slice(0, 200);
  const email = (body.email || '').trim().slice(0, 200);
  if (!name || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please provide your name and a valid email address.' },
      { status: 400 }
    );
  }

  const subject =
    body.type === 'appointment'
      ? `Appointment request — ${name}`
      : `Website enquiry — ${name}`;

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    body.phone ? `Phone: ${body.phone.slice(0, 50)}` : null,
    body.weddingDate ? `Wedding date: ${body.weddingDate.slice(0, 50)}` : null,
    body.partySize ? `Party size: ${body.partySize.slice(0, 20)}` : null,
    '',
    body.message ? body.message.slice(0, 5000) : '(no message)',
  ].filter((l): l is string => l !== null);

  // Delivery: Resend if configured, otherwise a generic webhook
  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

  try {
    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL || 'enquiries@reibridal.ie',
          to: [process.env.ENQUIRY_TO_EMAIL || siteConfig.email],
          reply_to: email,
          subject,
          text: lines.join('\n'),
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, ...body }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true });
    }

    console.error(
      'Enquiry received but no delivery method configured. Set RESEND_API_KEY or ENQUIRY_WEBHOOK_URL.'
    );
    return NextResponse.json(
      { ok: false, error: 'Enquiry service is not configured yet.' },
      { status: 503 }
    );
  } catch (err) {
    console.error('Enquiry delivery failed:', err);
    return NextResponse.json(
      { ok: false, error: 'We could not send your enquiry. Please email us directly.' },
      { status: 502 }
    );
  }
}
