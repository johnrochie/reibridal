'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMainNav, siteConfig } from '@/lib/config';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = getMainNav();
  const menuItems = navItems.filter((item) => item.label !== 'Booking Form');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
          isScrolled
            ? 'bg-charcoal/95 backdrop-blur-sm py-3 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="relative max-w-8xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:shrink-0">
            <span className="font-serif text-champagne text-2xl md:text-3xl tracking-[0.2em]">REI</span>
            <span className="block text-center lg:text-left font-sans text-champagne text-[0.5rem] tracking-[0.5em] uppercase font-light mt-0.5">
              Bridal
            </span>
          </Link>

          <Link
            href={siteConfig.appointmentUrl}
            className="hidden lg:inline-block ml-8 xl:ml-10 text-[10px] xl:text-xs tracking-widest uppercase font-light text-champagne border border-champagne/50 px-4 py-2 hover:bg-champagne hover:text-charcoal-dark transition-colors whitespace-nowrap"
          >
            Book Appointment
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-champagne transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-champagne transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-champagne transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-charcoal-deep flex flex-col items-center justify-center transition-all duration-600 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #c9b882 0%, transparent 60%)',
          }}
        />

        <nav className="relative flex flex-col items-center gap-8" aria-label="Mobile navigation">
          {menuItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-4xl text-ivory/80 hover:text-champagne transition-colors duration-300"
              style={{ transitionDelay: menuOpen ? `${i * 80}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8">
            <Link
              href={siteConfig.appointmentUrl}
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
            >
              Book Your Appointment
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-12 flex gap-6">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest text-champagne/60 hover:text-champagne uppercase"
          >
            Instagram
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest text-champagne/60 hover:text-champagne uppercase"
          >
            Facebook
          </a>
        </div>
      </div>
    </>
  );
}
