import Link from 'next/link';
import CatalogueImage from '@/components/media/CatalogueImage';
import { pickHeroImage } from '@/lib/catalogue';
import type { PublicGown } from '@/lib/catalogue';

interface GownCardProps {
  gown: PublicGown;
  sizes?: string;
}

export default function GownCard({
  gown,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: GownCardProps) {
  const hero = pickHeroImage(gown.images);

  return (
    <Link href={`/gowns/${gown.slug}`} className="group block">
      <div className="relative aspect-bridal overflow-hidden bg-charcoal-light mb-5">
        <CatalogueImage
          media={hero?.media}
          alt={`${gown.name} — REI Bridal`}
          fill
          width={800}
          height={1200}
          intent="product"
          sizes={sizes}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-charcoal-deep/0 group-hover:bg-charcoal-deep/20 transition-colors duration-500 flex items-end">
          <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-charcoal-deep/80 to-transparent">
            <span className="text-xs tracking-widest text-champagne uppercase font-light">View →</span>
          </div>
        </div>
      </div>
      <h2 className="font-serif text-2xl text-ivory mb-1 group-hover:text-champagne transition-colors">
        {gown.name}
      </h2>
    </Link>
  );
}
