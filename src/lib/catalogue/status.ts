import type {
  ContentStatus,
  DesignerRecord,
  GownImage,
  GownRecord,
  PublicDesigner,
  PublicGown,
  VerifiedField,
} from './types';

export function missing<T = never>(): VerifiedField<T> {
  return { value: null, status: 'missing' };
}

export function verified<T>(value: T, status: ContentStatus): VerifiedField<T> {
  return { value, status };
}

export function isPublicFact<T>(field: VerifiedField<T>): field is VerifiedField<T> & { value: T } {
  return field.status === 'confirmed' && field.value !== null && field.value !== undefined && field.value !== '';
}

export function publicValue<T>(field: VerifiedField<T>): T | null {
  return isPublicFact(field) ? field.value : null;
}

/**
 * Identity may be shown so incomplete records can exist in the catalogue.
 * It is not treated as a verified public fact unless status is confirmed.
 */
export function identityLabel(field: VerifiedField<string>, fallback: string): { value: string; confirmed: boolean } {
  if (field.status === 'confirmed' && field.value) {
    return { value: field.value, confirmed: true };
  }
  if ((field.status === 'needs-review' || field.status === 'draft') && field.value) {
    return { value: field.value, confirmed: false };
  }
  return { value: fallback, confirmed: false };
}

export function publicImages(images: GownImage[]): GownImage[] {
  return images.filter((image) => image.matchConfidence !== 'low' && image.matchConfidence !== 'medium');
}

export function toPublicGown(gown: GownRecord): PublicGown {
  const name = identityLabel(gown.name, 'Gown');
  return {
    id: gown.id,
    slug: gown.slug,
    name: name.value,
    nameConfirmed: name.confirmed,
    designer: gown.designer,
    category: publicValue(gown.category),
    styleCode: publicValue(gown.styleCode),
    sizes: publicValue(gown.sizes),
    silhouette: publicValue(gown.silhouette),
    style: publicValue(gown.style),
    fabric: publicValue(gown.fabric),
    price: publicValue(gown.price),
    availability: publicValue(gown.availability),
    description: publicValue(gown.description),
    images: publicImages(gown.images),
    featured: gown.featured,
    isNew: gown.isNew,
  };
}

export function toPublicDesigner(designer: DesignerRecord): PublicDesigner {
  const name = identityLabel(designer.name, 'Designer');
  return {
    id: designer.id,
    slug: designer.slug,
    name: name.value,
    nameConfirmed: name.confirmed,
    country: publicValue(designer.country),
    shortBio: publicValue(designer.shortBio),
    description: publicValue(designer.description),
    portrait: designer.portrait,
    cover: designer.cover,
    website: designer.website,
    featured: designer.featured,
    order: designer.order,
  };
}

export function isListableGown(gown: GownRecord): boolean {
  return gown.listed && Boolean(gown.designer?.name) && Boolean(gown.name.value);
}
