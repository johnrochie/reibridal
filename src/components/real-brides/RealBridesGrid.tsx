'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { RealBride } from '@/lib/data';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'kerry', label: 'Kerry' },
  { id: 'ireland', label: 'Ireland' },
];

export default function RealBridesGrid({ brides }: { brides: RealBride[] }) {
  const [active, setActive] = useState('all');

  const filtered = brides.filter((b) => {
    if (active === 'all') return true;
    if (active === 'kerry') return b.location.toLowerCase().includes('kerry');
    if (active === 'ireland') return b.location.toLowerCase().includes('ireland');
    return true;
  });

  return (
    <>
      {/* Filter */}
      <div className="flex gap-6 mb-12 border-b border-ivory-deep pb-6 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`text-xs tracking-widest uppercase font-light whitespace-nowrap pb-4 -mb-px transition-colors duration-300 ${
              active === f.id
                ? 'text-champagne border-b border-champagne'
                : 'text-charcoal/40 hover:text-charcoal border-b border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-sans font-light text-charcoal/40">No brides in this filter yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((bride) => (
            <div key={bride.id} className="group">
              <div className="relative aspect-portrait overflow-hidden bg-ivory-deep mb-5">
                <Image
                  src={bride.image}
                  alt={`${bride.brideName}${bride.partnerName ? ` & ${bride.partnerName}` : ''} — REI Bridal`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {bride.featured && (
                  <span className="absolute top-4 left-4 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5 font-sans font-light">
                    Featured
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-serif text-2xl text-charcoal mb-1">
                  {bride.brideName}
                  {bride.partnerName && ` & ${bride.partnerName}`}
                </h3>
                <p className="text-xs tracking-widest uppercase font-light text-charcoal/50 mb-3">
                  {bride.weddingDate} · {bride.location}
                </p>
                {bride.gownName && (
                  <p className="text-sm font-light text-charcoal/50">
                    Wearing{' '}
                    <span className="text-charcoal/70">{bride.gownName}</span>
                    {bride.designerName && (
                      <span> by {bride.designerName}</span>
                    )}
                  </p>
                )}
                {bride.quote && (
                  <p className="text-sm font-light text-charcoal/50 italic mt-3 line-clamp-2">
                    &ldquo;{bride.quote}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
