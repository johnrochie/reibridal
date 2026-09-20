import type { SanityImage } from '@/sanity/types';
import type { MediaRef } from '@/lib/media/types';
import { IMAGE_TYPES, MATCH_CONFIDENCE, isProvider } from '@/lib/media';
import type { ImageType, MatchConfidence } from '@/lib/media/types';
import type {
  CatalogueDesignerRef,
  ContentStatus,
  DesignerRecord,
  GownCategory,
  GownImage,
  GownRecord,
  VerifiedField,
} from './types';
import { CONTENT_STATUSES, GOWN_CATEGORIES } from './types';
import { missing } from './status';

interface SanityVerified<T = string> {
  value?: T | null;
  status?: string | null;
}

interface SanityGownImage {
  _key?: string;
  type?: string | null;
  alt?: string | null;
  matchConfidence?: string | null;
  image?: SanityImage | null;
  external?: {
    provider?: string | null;
    key?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
}

export interface SanityCatalogueGown {
  _id: string;
  name?: string | null;
  nameStatus?: string | null;
  slug?: string | null;
  designer?: { _id?: string; name?: string; slug?: string } | null;
  category?: SanityVerified<string> | string | null;
  styleCode?: SanityVerified<string> | null;
  sizes?: SanityVerified<string[]> | null;
  silhouette?: SanityVerified<string> | null;
  style?: SanityVerified<string[]> | null;
  fabric?: SanityVerified<string> | null;
  price?: SanityVerified<string> | null;
  priceRange?: string | null;
  availability?: SanityVerified<string> | null;
  description?: SanityVerified<string> | string | null;
  catalogueImages?: SanityGownImage[] | null;
  image?: SanityImage | null;
  images?: SanityImage[] | null;
  isNew?: boolean | null;
  isFeatured?: boolean | null;
  available?: boolean | null;
}

export interface SanityCatalogueDesigner {
  _id: string;
  name?: string | null;
  slug?: string | null;
  country?: SanityVerified<string> | string | null;
  shortBio?: SanityVerified<string> | string | null;
  description?: SanityVerified<string> | string | null;
  image?: SanityImage | null;
  coverImage?: SanityImage | null;
  website?: string | null;
  featured?: boolean | null;
  order?: number | null;
}

function isStatus(value: unknown): value is ContentStatus {
  return typeof value === 'string' && (CONTENT_STATUSES as readonly string[]).includes(value);
}

function asVerified<T>(field: SanityVerified<T> | T | null | undefined, fallbackStatus: ContentStatus = 'missing'): VerifiedField<T> {
  if (field === null || field === undefined || field === '') {
    return missing();
  }
  if (typeof field === 'object' && field !== null && 'status' in field) {
    const value = (field.value ?? null) as T | null;
    const status = isStatus(field.status) ? field.status : fallbackStatus;
    if (value === null || value === undefined || value === '') {
      return { value: null, status: status === 'confirmed' ? 'missing' : status };
    }
    return { value, status };
  }
  return { value: field as T, status: fallbackStatus };
}

function sanityMedia(image: SanityImage, alt?: string | null): MediaRef | null {
  if (!image?.asset?._ref) return null;
  return {
    provider: 'sanity',
    key: image.asset._ref,
    alt: alt ?? undefined,
    hotspot: image.hotspot
      ? { x: image.hotspot.x, y: image.hotspot.y }
      : undefined,
    sanitySource: image,
  };
}

function mapGownImage(image: SanityGownImage, index: number, gownId: string): GownImage | null {
  const type = IMAGE_TYPES.includes(image.type as ImageType) ? (image.type as ImageType) : null;
  const matchConfidence = MATCH_CONFIDENCE.includes(image.matchConfidence as MatchConfidence)
    ? (image.matchConfidence as MatchConfidence)
    : null;

  let media: MediaRef | null = null;
  if (image.external?.provider && image.external.key && isProvider(image.external.provider)) {
    media = {
      provider: image.external.provider,
      key: image.external.key,
      width: image.external.width ?? undefined,
      height: image.external.height ?? undefined,
      alt: image.alt ?? undefined,
    };
  } else if (image.image) {
    media = sanityMedia(image.image, image.alt);
  }

  if (!media) return null;

  return {
    id: image._key || `${gownId}-image-${index}`,
    type,
    media,
    matchConfidence,
  };
}

function mapLegacyImages(doc: SanityCatalogueGown): GownImage[] {
  const mapped: GownImage[] = [];
  if (doc.image) {
    const media = sanityMedia(doc.image, doc.name ?? undefined);
    if (media) {
      mapped.push({
        id: `${doc._id}-legacy-hero`,
        type: 'hero',
        media,
        matchConfidence: null,
      });
    }
  }
  const extra = doc.images ?? [];
  for (let index = 0; index < extra.length; index += 1) {
    const media = sanityMedia(extra[index], doc.name ?? undefined);
    if (media) {
      mapped.push({
        id: `${doc._id}-legacy-${index}`,
        type: null,
        media,
        matchConfidence: null,
      });
    }
  }
  return mapped;
}

function mapCategory(value: SanityCatalogueGown['category']): VerifiedField<GownCategory> {
  const field = asVerified<string>(value, typeof value === 'string' ? 'needs-review' : 'missing');
  if (field.value && (GOWN_CATEGORIES as readonly string[]).includes(field.value)) {
    return { value: field.value as GownCategory, status: field.status };
  }
  return missing();
}

export function gownFromSanity(doc: SanityCatalogueGown): GownRecord | null {
  if (!doc.slug || !doc.name || !doc.designer?.name || !doc.designer.slug) {
    return null;
  }

  const designer: CatalogueDesignerRef = {
    id: doc.designer._id || doc.designer.slug,
    slug: doc.designer.slug,
    name: doc.designer.name,
  };

  const classified = (doc.catalogueImages ?? [])
    .map((image, index) => mapGownImage(image, index, doc._id))
    .filter((image): image is GownImage => Boolean(image));

  return {
    id: doc._id,
    slug: doc.slug,
    name: {
      value: doc.name,
      status: isStatus(doc.nameStatus) ? doc.nameStatus : 'needs-review',
    },
    designer,
    category: mapCategory(doc.category),
    styleCode: asVerified(doc.styleCode),
    sizes: asVerified(doc.sizes),
    silhouette: asVerified(doc.silhouette),
    style: asVerified(doc.style),
    fabric: asVerified(doc.fabric),
    price: doc.price ? asVerified(doc.price) : asVerified(doc.priceRange, 'needs-review'),
    availability: asVerified(doc.availability),
    description: asVerified(
      typeof doc.description === 'string' ? { value: doc.description, status: 'needs-review' } : doc.description
    ),
    images: classified.length > 0 ? classified : mapLegacyImages(doc),
    featured: Boolean(doc.isFeatured),
    isNew: Boolean(doc.isNew),
    listed: doc.available !== false,
  };
}

export function designerFromSanity(doc: SanityCatalogueDesigner): DesignerRecord | null {
  if (!doc.slug || !doc.name) return null;
  const legacyString = (value: SanityCatalogueDesigner['country']): ContentStatus =>
    typeof value === 'string' ? 'needs-review' : 'missing';

  return {
    id: doc._id,
    slug: doc.slug,
    name: asVerified(doc.name, 'needs-review'),
    country: asVerified(doc.country, legacyString(doc.country)),
    shortBio: asVerified(doc.shortBio, legacyString(doc.shortBio)),
    description: asVerified(doc.description, legacyString(doc.description)),
    portrait: doc.image ? sanityMedia(doc.image, doc.name) : null,
    cover: doc.coverImage ? sanityMedia(doc.coverImage, doc.name) : null,
    website: doc.website ?? null,
    featured: Boolean(doc.featured),
    order: doc.order ?? 99,
  };
}
