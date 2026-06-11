'use client';

import { useMemo, useState } from 'react';
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

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'New Arrivals' },
  { id: 'name', label: 'Name A–Z' },
  { id: 'price-asc', label: 'Price Low–High' },
  { id: 'price-desc', label: 'Price High–Low' },
];

function parsePrice(priceRange?: string): number {
  if (!priceRange) return Number.MAX_SAFE_INTEGER;
  const match = priceRange.replace(/[,.]/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : Number.MAX_SAFE_INTEGER;
}

const selectClass =
  'bg-transparent border-b border-ivory/20 focus:border-champagne py-2 pr-6 text-xs tracking-widest uppercase font-light text-ivory/70 outline-none cursor-pointer transition-colors [&>option]:bg-charcoal-dark [&>option]:normal-case [&>option]:tracking-normal';

export default function GownGrid({ gowns }: { gowns: SanityGown[] }) {
  const [active, setActive] = useState('all');
  const [designer, setDesigner] = useState('all');
  const [sort, setSort] = useState('featured');
  const [query, setQuery] = useState('');

  const designers = useMemo(() => {
    const names = new Set(gowns.map((g) => g.designer?.name).filter(Boolean));
    return Array.from(names).sort();
  }, [gowns]);

  const filtered = useMemo(() => {
    let result = gowns;
    if (active !== 'all') result = result.filter((g) => g.category === active);
    if (designer !== 'all') result = result.filter((g) => g.designer?.name === designer);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.designer?.name.toLowerCase().includes(q) ||
          (g.description || '').toLowerCase().includes(q) ||
          (g.features || []).some((f) => f.toLowerCase().includes(q))
      );
    }
    const sorted = [...result];
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => parsePrice(a.priceRange) - parsePrice(b.priceRange));
        break;
      case 'price-desc':
        sorted.sort((a, b) => parsePrice(b.priceRange) - parsePrice(a.priceRange));
        break;
      default:
        sorted.sort((a, b) => Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false));
    }
    return sorted;
  }, [gowns, active, designer, sort, query]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12 border-b border-ivory/10 pb-8">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`text-xs tracking-widest uppercase font-light whitespace-nowrap pb-2 transition-colors duration-300 ${
                active === cat.id
                  ? 'text-champagne border-b border-champagne'
                  : 'text-ivory/40 hover:text-ivory border-b border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-6 lg:ml-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gowns…"
            aria-label="Search gowns"
            className="bg-transparent border-b border-ivory/20 focus:border-champagne py-2 text-sm font-light text-ivory placeholder:text-ivory/30 outline-none transition-colors w-44"
          />
          <select
            value={designer}
            onChange={(e) => setDesigner(e.target.value)}
            aria-label="Filter by designer"
            className={selectClass}
          >
            <option value="all">All Designers</option>
            {designers.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort gowns"
            className={selectClass}
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs tracking-widest uppercase font-light text-ivory/30 mb-10">
        {filtered.length} {filtered.length === 1 ? 'gown' : 'gowns'}
      </p>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-sans font-light text-ivory/40 mb-6">
            No gowns match your search. Try a different designer or category.
          </p>
          <button
            onClick={() => {
              setActive('all');
              setDesigner('all');
              setQuery('');
            }}
            className="text-xs tracking-widest uppercase font-light text-champagne border-b border-champagne pb-1"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filtered.map((gown) => (
            <Link key={gown._id} href={`/gowns/${gown.slug}`} className="group block">
              <div className="relative aspect-bridal overflow-hidden bg-charcoal-light mb-5">
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
                  <h2 className="font-serif text-2xl text-ivory mb-1 group-hover:text-champagne transition-colors">
                    {gown.name}
                  </h2>
                  <p className="text-xs tracking-widest uppercase font-light text-ivory/50">
                    {gown.designer.name}
                  </p>
                </div>
                {gown.priceRange && (
                  <span className="text-sm font-light text-ivory/60 mt-1">
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
