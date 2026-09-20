import { isSanityConfigured } from '@/sanity/client';
import {
  fetchCatalogueDesigners,
  fetchCatalogueGowns,
} from '@/sanity/queries';
import { designerFromSanity, gownFromSanity } from './from-sanity';
import { localDesigners, localGowns } from './local-seed';
import { isListableGown, toPublicDesigner, toPublicGown } from './status';
import type { DesignerRecord, GownRecord, PublicDesigner, PublicGown } from './types';

async function loadGownRecords(): Promise<GownRecord[]> {
  if (!isSanityConfigured()) {
    return localGowns;
  }

  try {
    const docs = await fetchCatalogueGowns();
    const mapped = docs.map(gownFromSanity).filter((gown): gown is GownRecord => Boolean(gown));
    if (mapped.length > 0) return mapped;
  } catch {
    // CMS unavailable — Phase 1 local sample is the incomplete-record path.
  }

  return localGowns;
}

async function loadDesignerRecords(): Promise<DesignerRecord[]> {
  if (!isSanityConfigured()) {
    return localDesigners;
  }

  try {
    const docs = await fetchCatalogueDesigners();
    const mapped = docs.map(designerFromSanity).filter((designer): designer is DesignerRecord => Boolean(designer));
    if (mapped.length > 0) return mapped;
  } catch {
    // fall through
  }

  return localDesigners;
}

export async function getPublicGowns(): Promise<PublicGown[]> {
  const gowns = await loadGownRecords();
  return gowns.filter(isListableGown).map(toPublicGown);
}

export async function getFeaturedPublicGowns(): Promise<PublicGown[]> {
  const gowns = await getPublicGowns();
  return gowns.filter((gown) => gown.featured).slice(0, 3);
}

export async function getPublicGownBySlug(slug: string): Promise<PublicGown | null> {
  const gowns = await getPublicGowns();
  return gowns.find((gown) => gown.slug === slug) ?? null;
}

export async function getPublicGownSlugs(): Promise<string[]> {
  const gowns = await getPublicGowns();
  return gowns.map((gown) => gown.slug);
}

export async function getPublicGownsByDesigner(designerSlug: string): Promise<PublicGown[]> {
  const gowns = await getPublicGowns();
  return gowns.filter((gown) => gown.designer.slug === designerSlug);
}

export async function getPublicDesigners(): Promise<PublicDesigner[]> {
  const designers = await loadDesignerRecords();
  return designers.map(toPublicDesigner).sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export async function getPublicDesignerBySlug(slug: string): Promise<PublicDesigner | null> {
  const designers = await getPublicDesigners();
  return designers.find((designer) => designer.slug === slug) ?? null;
}

export async function getPublicDesignerSlugs(): Promise<string[]> {
  const designers = await getPublicDesigners();
  return designers.map((designer) => designer.slug);
}
