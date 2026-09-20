import type { MediaRef } from '@/lib/media/types';
import { pickHeroImage } from './images';
import { getPublicGowns } from './repository';
import { siteAssets } from '@/lib/media';

export interface HeroSlide {
  media: MediaRef;
  alt: string;
}

/** Dress photography for the homepage carousel — catalogue records, not scattered paths. */
export async function getHeroDressSlides(): Promise<HeroSlide[]> {
  const gowns = await getPublicGowns();
  const fromCatalogue: HeroSlide[] = [];

  for (const gown of gowns) {
    const hero = pickHeroImage(gown.images);
    if (!hero?.media) continue;
    fromCatalogue.push({
      media: hero.media,
      alt: hero.media.alt || `${gown.name} — REI Bridal`,
    });
  }

  if (fromCatalogue.length > 0) return fromCatalogue;

  return [
    {
      media: siteAssets.experienceDetail,
      alt: siteAssets.experienceDetail.alt || 'Bridal gown detail',
    },
  ];
}
