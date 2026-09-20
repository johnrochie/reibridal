import { siteConfig } from '@/lib/config';
import ComingSoonEnquiry from './ComingSoonEnquiry';

export default function ComingSoonHold() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-charcoal-deep text-ivory">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 30%, #c9b882 0%, transparent 55%)' }}
      />
      <div className="relative min-h-full flex flex-col items-center justify-center px-6 py-16">
        <div className="text-center mb-10">
          <span className="font-serif text-champagne text-4xl md:text-5xl tracking-[0.2em]">REI</span>
          <span className="block font-sans text-champagne text-[0.65rem] tracking-[0.5em] uppercase font-light mt-2">
            Bridal
          </span>
        </div>
        <h1 className="font-serif text-2xl md:text-4xl text-ivory text-center leading-snug max-w-xl mb-6">
          {siteConfig.tagline}
        </h1>
        <span className="block w-12 h-px bg-champagne mb-8" />
        <p className="text-xs tracking-widest uppercase font-light text-champagne mb-4">Coming soon</p>
        <ComingSoonEnquiry compact />
      </div>
    </div>
  );
}
