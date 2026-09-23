import Image from 'next/image';
import ComingSoonEnquiry from './ComingSoonEnquiry';

export default function ComingSoonHold() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-charcoal-deep text-ivory">
      <div className="relative min-h-full lg:min-h-screen lg:grid lg:grid-cols-2">
        <div className="relative h-[46vh] min-h-[260px] overflow-hidden lg:h-auto lg:min-h-screen">
          <Image
            src="/images/coming-soon/lace-veil.jpg"
            alt="Lace detail on a bridal veil"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[center_28%] lg:object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-charcoal-deep/25 via-transparent to-charcoal-deep lg:bg-gradient-to-r lg:from-charcoal-deep/10 lg:via-charcoal-deep/25 lg:to-charcoal-deep"
            aria-hidden="true"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center px-6 py-12 lg:px-12 lg:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(ellipse at 50% 30%, #c9b882 0%, transparent 55%)' }}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-xl text-center">
            <div className="mb-10">
              <span className="font-serif text-champagne text-4xl md:text-5xl tracking-[0.2em]">REI</span>
              <span className="block font-sans text-champagne text-[0.65rem] tracking-[0.5em] uppercase font-light mt-2">
                Bridal
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl text-ivory leading-snug mb-6">
              Luxury Bridal Boutique,
              <br />
              <span className="text-champagne">Killorglin, Co. Kerry</span>
            </h1>
            <span className="mx-auto mb-8 block h-px w-12 bg-champagne" />
            <p className="text-xs tracking-widest uppercase font-light text-champagne mb-4">Coming soon</p>
            <ComingSoonEnquiry compact />
          </div>
        </div>
      </div>
    </div>
  );
}
