import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-deep text-ivory/60">
      {/* CTA Band */}
      <div className="border-t border-champagne/20 bg-charcoal py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label mb-6 block">Your Story Begins Here</span>
          <h2 className="font-serif text-5xl md:text-6xl text-ivory mb-6">
            Book Your Private Appointment
          </h2>
          <span className="deco-line" />
          <p className="font-sans font-light text-ivory/60 max-w-md mx-auto mb-10 leading-relaxed">
            We offer exclusive, private appointments in our boutique. Bring those who matter most
            and allow us to guide you to your perfect gown.
          </p>
          <Link href={siteConfig.appointmentUrl} className="btn-primary">
            Reserve Your Date
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-serif text-champagne text-2xl tracking-[0.2em]">REI</span>
              <span className="block font-sans text-champagne text-[0.5rem] tracking-[0.5em] uppercase font-light mt-0.5">
                Bridal
              </span>
            </div>
            <p className="text-sm leading-relaxed font-light text-ivory/50 max-w-xs">
              A luxury bridal boutique for discerning brides who seek something truly extraordinary.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-champagne/50 hover:text-champagne transition-colors"
              >
                IG
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-champagne/50 hover:text-champagne transition-colors"
              >
                FB
              </a>
              <a
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-champagne/50 hover:text-champagne transition-colors"
              >
                PIN
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Our Gowns', href: '/gowns' },
                { label: 'Designers', href: '/designers' },
                { label: 'Real Brides', href: '/real-brides' },
                { label: 'Our Services', href: '/services' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'The Journal', href: '/blog' },
                { label: 'About Us', href: '/about' },
                { label: 'Book an Appointment', href: siteConfig.appointmentUrl },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-ivory/50 hover:text-champagne transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-6">
              Opening Hours
            </h3>
            <ul className="space-y-3">
              {siteConfig.openingHours.map((item) => (
                <li key={item.day} className="text-sm font-light text-ivory/50">
                  <span className="block text-ivory/70">{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ivory/30 mt-4 italic">
              All appointments are exclusive and private.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-widest uppercase font-light text-champagne mb-6">
              Find Us
            </h3>
            <address className="not-italic text-sm font-light text-ivory/50 space-y-2 leading-relaxed">
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.city}</p>
              <p>{siteConfig.address.county}</p>
              <p>{siteConfig.address.country}</p>
            </address>
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="block text-sm font-light text-ivory/50 hover:text-champagne transition-colors"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-sm font-light text-ivory/50 hover:text-champagne transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-champagne/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light text-ivory/30">
            © {year} REI Bridal. All rights reserved. ·{' '}
            <a
              href="https://evomedia.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-champagne transition-colors"
            >
              Website by EvoMedia
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs font-light text-ivory/30 hover:text-champagne transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-xs font-light text-ivory/30 hover:text-champagne transition-colors">
              Cookie Policy
            </Link>
            <Link href="/terms" className="text-xs font-light text-ivory/30 hover:text-champagne transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
