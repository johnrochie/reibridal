'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/image';
import type { SanityGown } from '@/sanity/types';

const categories = [
  { id: 'all', label: 'All Gowns' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'bridesmaid', label: 'Bridesmaid' },
  { id: 'occasion', label: 'Occasion' },
];

export default function GownGrid({ gowns }: { gowns: SanityGown[] }) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? gowns : gowns.filter((g) => g.category === active);

  return (
    <>
      <div className="flex gap-6 mb-16 border-b border-ivory-deep pb-6 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`text-xs tracking-widest uppercase font-light whitespace-nowrap pb-4 -mb-px transition-colors duration-300 ${
              active === cat.id
                ? 'text-champagne border-b border-champagne'
                : 'text-charcoal/40 hover:text-charcoal border-b border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-sans font-light text-charcoal/40">
            No gowns in this category yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((gown) => (
            <Link key={gown._id} href={`/gowns/${gown.slug}`} className="group block">
              <div className="relative aspect-bridal overflow-hidden bg-ivory-deep mb-5">
                <Image
                  src={urlFor(gown.image).width(800).height(1200).url()}
                  alt={`${gown.name} by ${gown.designer.name} — REI Bridal`}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {gown.isNew && (
                  <span className="absolute top-4 left-4 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5 font-sans font-light">
                    New
                  </span>
                )}
                <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/20 transition-colors duration-500 flex items-end">
                  <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/80 to-transparent">
                    <p className="text-xs font-light text-ivory/70 mb-3 line-clamp-2">
                      {gown.description}
                    </p>
                    <span className="text-xs tracking-widest text-champagne uppercase font-light">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-charcoal mb-1 group-hover:text-champagne-dark transition-colors">
                    {gown.name}
                  </h2>
                  <p className="text-xs tracking-widest uppercase font-light text-charcoal/50">
                    {gown.designer.name}
                  </p>
                </div>
                {gown.priceRange && (
                  <span className="text-sm font-light text-charcoal/60 mt-1">
                    {gown.priceRange}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
