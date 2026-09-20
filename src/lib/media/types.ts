export const STORAGE_PROVIDERS = [
  'local',
  'sanity',
  'cloudinary',
  'vercel-blob',
  'supabase',
  's3',
] as const;

export type StorageProvider = (typeof STORAGE_PROVIDERS)[number];

export const IMAGE_TYPES = [
  'hero',
  'front',
  'back',
  'side',
  'detail',
  'fabric',
  'model',
  'editorial',
  'lifestyle',
  'real-bride',
] as const;

export type ImageType = (typeof IMAGE_TYPES)[number];

export const MATCH_CONFIDENCE = ['high', 'medium', 'low'] as const;
export type MatchConfidence = (typeof MATCH_CONFIDENCE)[number];

export type MediaIntent = 'thumbnail' | 'product' | 'editorial' | 'og';

export interface ImageHotspot {
  x: number;
  y: number;
}

export interface MediaRef {
  provider: StorageProvider;
  /** Provider-specific object key or public path. Never a React-scattered filesystem layout. */
  key: string;
  width?: number;
  height?: number;
  alt?: string;
  mimeType?: string;
  hotspot?: ImageHotspot;
  /** Original Sanity image object, used only by the Sanity URL builder. */
  sanitySource?: unknown;
}

export interface ImageTransform {
  width?: number;
  height?: number;
  intent?: MediaIntent;
}
