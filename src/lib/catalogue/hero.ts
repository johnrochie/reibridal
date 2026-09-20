import type { MediaRef } from '@/lib/media/types';
import { pickHeroImage } from './images';
import { getPublicGowns } from './repository';
import { siteAssets } from '@/lib/media';
import type { PublicGown } from './types';
import heroManifest from './hero-manifest.json';

export interface HeroSlide {
  media: MediaRef;
  alt: string;
}

const HERO_FOLDER = 'hero';
const HERO_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function titleFromHeroFilename(filename: string): string {
  const stem = filename.replace(/\.[^.]+$/, '');
  const cleaned = stem.replace(/^\d+[-_.\s]*/, '').replace(/[-_]+/g, ' ').trim();
  return cleaned ? `${cleaned} — REI Bridal` : 'REI Bridal';
}

function extensionOf(filename: string): string {
  const index = filename.lastIndexOf('.');
  return index >= 0 ? filename.slice(index).toLowerCase() : '';
}

function isSafeHeroFilename(name: string): boolean {
  if (!name || name !== name.trim()) return false;
  if (name.includes('/') || name.includes('\\') || name.includes('..')) return false;
  return HERO_IMAGE_EXTENSIONS.has(extensionOf(name));
}

function listedHeroFiles(): string[] {
  const listed = (heroManifest as { files?: unknown }).files;
  if (!Array.isArray(listed)) return [];
  return listed.filter((name): name is string => typeof name === 'string' && isSafeHeroFilename(name));
}

/**
 * Owner-curated hero photos. Drop web-ready files into public/images/hero
 * and list those filenames in hero-manifest.json (array order is playback
 * order). Empty or missing list falls back to the catalogue-derived rotation.
 * The homepage never scans the filesystem — the list is bundled at build time.
 */
function getUploadedHeroSlides(): HeroSlide[] {
  return listedHeroFiles().map((filename) => ({
    media: {
      provider: 'local' as const,
      key: `${HERO_FOLDER}/${filename}`,
      alt: titleFromHeroFilename(filename),
    },
    alt: titleFromHeroFilename(filename),
  }));
}

/**
 * Groups gowns by designer, then interleaves the groups (one gown from each
 * designer in turn) so consecutive slides don't cluster on a single designer.
 * Preserves each designer's original relative order within their own group.
 */
function interleaveByDesigner(gowns: PublicGown[]): PublicGown[] {
  const byDesigner = new Map<string, PublicGown[]>();
  for (const gown of gowns) {
    const bucket = byDesigner.get(gown.designer.slug);
    if (bucket) bucket.push(gown);
    else byDesigner.set(gown.designer.slug, [gown]);
  }

  const groups = Array.from(byDesigner.values());
  const interleaved: PublicGown[] = [];
  for (let i = 0; interleaved.length < gowns.length; i++) {
    for (const group of groups) {
      if (i < group.length) interleaved.push(group[i]);
    }
  }
  return interleaved;
}

function catalogueHeroSlides(gowns: PublicGown[]): HeroSlide[] {
  const featured = interleaveByDesigner(gowns.filter((gown) => gown.featured));
  const rest = interleaveByDesigner(gowns.filter((gown) => !gown.featured));
  const ordered = [...featured, ...rest];

  const fromCatalogue: HeroSlide[] = [];
  for (const gown of ordered) {
    const hero = pickHeroImage(gown.images);
    if (!hero?.media) continue;
    fromCatalogue.push({
      media: hero.media,
      alt: hero.media.alt || `${gown.name} — REI Bridal`,
    });
  }
  return fromCatalogue;
}

const SITE_ASSET_FALLBACK: HeroSlide[] = [
  {
    media: siteAssets.experienceDetail,
    alt: siteAssets.experienceDetail.alt || 'Bridal gown detail',
  },
];

/** Dress photography for the homepage carousel — catalogue records, not scattered paths. */
export async function getHeroDressSlides(): Promise<HeroSlide[]> {
  const uploaded = getUploadedHeroSlides();
  if (uploaded.length > 0) return uploaded;

  const gowns = await getPublicGowns();
  const fromCatalogue = catalogueHeroSlides(gowns);
  if (fromCatalogue.length > 0) return fromCatalogue;

  return SITE_ASSET_FALLBACK;
}
