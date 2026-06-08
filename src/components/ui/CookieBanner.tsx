'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rei-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('rei-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('rei-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-charcoal-deep border-t border-champagne/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-xs font-light text-ivory/60 leading-relaxed max-w-2xl">
          We use cookies to enhance your browsing experience and analyse site traffic. By clicking
          &ldquo;Accept&rdquo;, you consent to our use of cookies.{' '}
          <Link href="/cookie-policy" className="underline text-champagne hover:text-champagne-light">
            Learn more
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-6 py-2.5 text-xs tracking-widest uppercase font-light text-ivory/40 hover:text-ivory transition-colors border border-ivory/10 hover:border-ivory/30"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-6 py-2.5 text-xs tracking-widest uppercase font-light bg-champagne text-charcoal-dark hover:bg-champagne-light transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
