import Link from 'next/link';
import CatalogueImage from '@/components/media/CatalogueImage';
import { pickHeroImage } from '@/lib/catalogue';
import type { PublicGown } from '@/lib/catalogue';

interface GownCardProps {
  gown: PublicGown;
  sizes?: string;
  variant?: 'full' | 'name-only';
}

export default function GownCard({
  gown,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  variant = 'full',
}: GownCardProps) {
  const hero = pickHeroImage(gown.images);
  const nameOnly = variant === 'name-only';

  return (
    <Link href={`/gowns/${gown.slug}`} className="group block">
      <div className="relative aspect-bridal overflow-hidden bg-charcoal-light mb-5">
        <CatalogueImage
          media={hero?.media}
          alt={`${gown.name} by ${gown.designer.name} — REI Bridal`}
          fill
          width={800}
          height={1200}
          intent="product"
          sizes={sizes}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        {!nameOnly && gown.isNew && (
          <span className="absolute top-4 left-4 bg-champagne text-charcoal-dark text-[10px] tracking-widest uppercase px-3 py-1.5 font-sans font-light">
            New
          </span>
        )}
        <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/20 transition-colors duration-500 flex items-end">
          <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/80 to-transparent">
            {!nameOnly && gown.description && (
              <p className="text-xs font-light text-ivory/70 mb-3 line-clamp-2">{gown.description}</p>
            )}
            <span className="text-xs tracking-widest text-champagne uppercase font-light">
              {nameOnly ? 'View →' : 'View Details →'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-serif text-2xl text-ivory mb-1 group-hover:text-champagne transition-colors">
            {gown.name}
          </h2>
          {!nameOnly && (
            <p className="text-xs tracking-widest uppercase font-light text-ivory/50">
              {gown.designer.name}
            </p>
          )}
        </div>
        {!nameOnly && gown.price && (
          <span className="text-sm font-light text-ivory/60 mt-1">{gown.price}</span>
        )}
      </div>
    </Link>
  );
}
