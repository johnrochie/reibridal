import type { MediaRef } from './types';

function localImage(key: string, alt: string): MediaRef {
  return { provider: 'local', key, alt };
}

/**
 * Site photography that is not a gown record.
 * Paths live here so React pages do not scatter storage keys.
 */
export const siteAssets = {
  hero: localImage('jane-aston/ja-hero.jpg', 'REI Bridal hero — bride and groom at sunset'),
  experienceDetail: localImage('jane-aston/ja-dress-detail.jpg', 'Bridal gown detail — lace bodice'),
  gallery: [
    localImage('jane-aston/ja-gallery-1.jpg', 'Bride and groom walking at the Eiffel Tower'),
    localImage('jane-aston/ja-gallery-2.jpg', 'Bride with bouquet in Paris'),
    localImage('jane-aston/ja-gallery-3.jpg', 'Couple celebrating in Paris streets'),
    localImage('jane-aston/ja-gallery-4.jpg', 'Bride and groom at a Parisian balcony'),
  ],
} as const;
