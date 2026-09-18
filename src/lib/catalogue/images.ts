import type { GownImage, PublicGown } from './types';

const HERO_ORDER = ['hero', 'front', 'model', 'editorial', 'lifestyle', 'side', 'back', 'detail', 'fabric', 'real-bride'] as const;

export function pickHeroImage(images: GownImage[]): GownImage | null {
  if (images.length === 0) return null;
  for (const type of HERO_ORDER) {
    const match = images.find((image) => image.type === type);
    if (match) return match;
  }
  return images[0] ?? null;
}

export function galleryImages(gown: PublicGown): GownImage[] {
  const hero = pickHeroImage(gown.images);
  if (!hero) return [];
  const rest = gown.images.filter((image) => image.id !== hero.id);
  return [hero, ...rest];
}
