import type { MediaIntent } from './types';

/**
 * Luxury photography defaults.
 * Quality stays high; we never stretch, upscale, filter, or overlay.
 * Cropping is an explicit product-card choice, not the default for editorial frames.
 */
export const LUXURY_QUALITY: Record<MediaIntent, number> = {
  thumbnail: 82,
  product: 85,
  editorial: 88,
  og: 85,
};

export const LUXURY_MAX_WIDTH: Record<MediaIntent, number> = {
  thumbnail: 640,
  product: 1600,
  editorial: 2400,
  og: 1200,
};

export function qualityFor(intent: MediaIntent = 'product'): number {
  return LUXURY_QUALITY[intent];
}

export function capWidth(width: number | undefined, intent: MediaIntent = 'product'): number | undefined {
  if (!width) return undefined;
  return Math.min(width, LUXURY_MAX_WIDTH[intent]);
}

/** next/image quality — above the default 75 so bridal photography is not overcompressed. */
export const NEXT_IMAGE_QUALITY = 85;
