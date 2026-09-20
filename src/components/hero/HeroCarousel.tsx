'use client';

import { useEffect, useState } from 'react';
import CatalogueImage from '@/components/media/CatalogueImage';
import type { HeroSlide } from '@/lib/catalogue';

const INTERVAL_MS = 5500;
const SCRIM_CLASS =
  'absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/60 to-charcoal/30';

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (paused ? current : (current + 1) % slides.length));
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) {
    return <div className="absolute inset-0 bg-charcoal-deep" />;
  }

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Dress photography"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={`${slide.media.provider}-${slide.media.key}-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={i !== index}
        >
          <CatalogueImage
            media={slide.media}
            alt={slide.alt}
            fill
            priority={i === 0}
            width={1920}
            intent="editorial"
            sizes="100vw"
          />
        </div>
      ))}
      <div className={SCRIM_CLASS} aria-hidden="true" />
    </div>
  );
}
