'use client';

import { useState } from 'react';
import type { GownImage } from '@/lib/catalogue';
import CatalogueImage from '@/components/media/CatalogueImage';

interface GownGalleryProps {
  frames: GownImage[];
  gownName: string;
  designerName: string;
}

export default function GownGallery({ frames, gownName, designerName }: GownGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = frames[activeIndex] ?? null;
  const hasMultiple = frames.length > 1;

  const goTo = (index: number) => {
    setActiveIndex(((index % frames.length) + frames.length) % frames.length);
  };

  const frameAlt = (image: GownImage | null) =>
    image?.type ? `${gownName} ${image.type} — REI Bridal` : `${gownName} by ${designerName} — REI Bridal`;

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-bridal overflow-hidden bg-charcoal-light"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') goTo(activeIndex + 1);
          if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
        }}
        tabIndex={hasMultiple ? 0 : undefined}
        role={hasMultiple ? 'group' : undefined}
        aria-label={hasMultiple ? `${gownName} photos` : undefined}
      >
        <CatalogueImage
          media={active?.media}
          alt={frameAlt(active)}
          fill
          width={1200}
          intent="editorial"
          priority
          objectFit="cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center bg-charcoal-deep/50 text-ivory hover:bg-charcoal-deep/80 transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center bg-charcoal-deep/50 text-ivory hover:bg-charcoal-deep/80 transition-colors"
            >
              ›
            </button>
            <span className="absolute bottom-4 right-4 text-[10px] tracking-widest uppercase font-light text-ivory/70 bg-charcoal-deep/50 px-2.5 py-1">
              {activeIndex + 1} / {frames.length}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {frames.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show photo ${index + 1} of ${frames.length}`}
              aria-current={index === activeIndex}
              className={`relative aspect-[3/4] overflow-hidden bg-charcoal-light transition-opacity duration-300 ${
                index === activeIndex
                  ? 'ring-1 ring-champagne opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <CatalogueImage
                media={image.media}
                alt={frameAlt(image)}
                fill
                width={300}
                intent="thumbnail"
                objectFit="cover"
                sizes="(max-width: 640px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
