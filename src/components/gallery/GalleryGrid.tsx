'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import type { SanityGalleryImage } from '@/sanity/types';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'bride', label: 'Bride' },
  { id: 'portrait', label: 'Portraits' },
  { id: 'detail', label: 'Details' },
  { id: 'ceremony', label: 'Ceremony' },
  { id: 'editorial', label: 'Editorial' },
];

export default function GalleryGrid({ images }: { images: SanityGalleryImage[] }) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? images : images.filter((img) => img.category === active);

  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  return (
    <>
      <div className="sticky top-[56px] z-30 bg-ivory/95 backdrop-blur-sm border-b border-ivory/10">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`text-xs tracking-widest uppercase font-light whitespace-nowrap transition-colors duration-300 ${
                  active === cat.id ? 'text-champagne' : 'text-ivory/40 hover:text-ivory'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 px-4 md:px-6 lg:px-12 bg-charcoal-deep">
        <div className="max-w-8xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-sans font-light text-ivory/40">No images in this category yet.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid md:grid-cols-3 gap-3">
                {[col1, col2, col3].map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map((img) => {
                      const imgRef = img.image.asset._ref;
                      const isLandscape = imgRef.includes('-1200x800') || imgRef.includes('-1600x1067');
                      return (
                        <div
                          key={img._id}
                          className="group relative overflow-hidden bg-charcoal-light cursor-pointer"
                          style={{ aspectRatio: isLandscape ? '4/3' : '3/4' }}
                        >
                          <Image
                            src={urlFor(img.image).width(800).url()}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="33vw"
                          />
                          <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/30 transition-colors duration-500 flex items-end">
                            <div className="w-full p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/80 to-transparent">
                              {img.caption && (
                                <p className="text-xs font-light text-ivory/70">{img.caption}</p>
                              )}
                              <span className="text-xs tracking-widest text-champagne uppercase font-light capitalize">
                                {img.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="md:hidden grid grid-cols-2 gap-2">
                {filtered.map((img) => (
                  <div
                    key={img._id}
                    className="relative overflow-hidden bg-charcoal-light"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <Image
                      src={urlFor(img.image).width(400).height(533).url()}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
