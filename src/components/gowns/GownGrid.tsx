'use client';

import { useMemo, useState } from 'react';
import type { PublicGown } from '@/lib/catalogue';
import GownCard from './GownCard';

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
];

const selectClass =
  'bg-transparent border-b border-ivory/20 focus:border-champagne py-2 pr-6 text-xs tracking-widest uppercase font-light text-ivory/70 outline-none cursor-pointer transition-colors [&>option]:bg-charcoal-dark [&>option]:normal-case [&>option]:tracking-normal';

export default function GownGrid({ gowns }: { gowns: PublicGown[] }) {
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
        (g) => g.name.toLowerCase().includes(q) || g.designer?.name.toLowerCase().includes(q)
      );
    }
    const sorted = [...result];
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
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
            <GownCard key={gown.id} gown={gown} />
          ))}
        </div>
      )}
    </>
  );
}
