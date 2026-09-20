import type { ImageType, MatchConfidence, MediaRef } from '@/lib/media/types';

export const CONTENT_STATUSES = ['confirmed', 'needs-review', 'missing', 'draft'] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const GOWN_CATEGORIES = ['wedding', 'bridesmaid', 'occasion'] as const;
export type GownCategory = (typeof GOWN_CATEGORIES)[number];

export interface VerifiedField<T> {
  value: T | null;
  status: ContentStatus;
}

export interface CatalogueDesignerRef {
  id: string;
  slug: string;
  name: string;
}

export interface GownImage {
  id: string;
  type: ImageType | null;
  media: MediaRef;
  matchConfidence: MatchConfidence | null;
}

export interface GownRecord {
  id: string;
  slug: string;
  name: VerifiedField<string>;
  designer: CatalogueDesignerRef;
  category: VerifiedField<GownCategory>;
  styleCode: VerifiedField<string>;
  sizes: VerifiedField<string[]>;
  silhouette: VerifiedField<string>;
  style: VerifiedField<string[]>;
  fabric: VerifiedField<string>;
  price: VerifiedField<string>;
  availability: VerifiedField<string>;
  description: VerifiedField<string>;
  images: GownImage[];
  featured: boolean;
  isNew: boolean;
  listed: boolean;
}

export interface DesignerRecord {
  id: string;
  slug: string;
  name: VerifiedField<string>;
  country: VerifiedField<string>;
  shortBio: VerifiedField<string>;
  description: VerifiedField<string>;
  portrait: MediaRef | null;
  cover: MediaRef | null;
  website: string | null;
  featured: boolean;
  order: number;
}

export interface PublicGown {
  id: string;
  slug: string;
  name: string;
  nameConfirmed: boolean;
  designer: CatalogueDesignerRef;
  category: GownCategory | null;
  styleCode: string | null;
  sizes: string[] | null;
  silhouette: string | null;
  style: string[] | null;
  fabric: string | null;
  price: string | null;
  availability: string | null;
  description: string | null;
  images: GownImage[];
  featured: boolean;
  isNew: boolean;
}

export interface PublicDesigner {
  id: string;
  slug: string;
  name: string;
  nameConfirmed: boolean;
  country: string | null;
  shortBio: string | null;
  description: string | null;
  portrait: MediaRef | null;
  cover: MediaRef | null;
  website: string | null;
  featured: boolean;
  order: number;
}
