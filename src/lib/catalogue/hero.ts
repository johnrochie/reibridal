import fs from 'node:fs/promises';
import path from 'node:path';
import type { MediaRef } from '@/lib/media/types';
import { pickHeroImage } from './images';
import { getPublicGowns } from './repository';
import { siteAssets } from '@/lib/media';
import type { PublicGown } from './types';

export interface HeroSlide {
  media: MediaRef;
  alt: string;
}

const HERO_FOLDER = 'hero';
const HERO_DIR = path.join(process.cwd(), 'public', 'images', HERO_FOLDER);
const HERO_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function titleFromHeroFilename(filename: string): string {
  const stem = filename.replace(/\.[^.]+$/, '');
  const cleaned = stem.replace(/^\d+[-_.\s]*/, '').replace(/[-_]+/g, ' ').trim();
  return cleaned ? `${cleaned} — REI Bridal` : 'REI Bridal';
}

/**
 * Owner-curated hero photos. Any image files dropped into
 * public/images/hero are used for the homepage carousel, in filename
 * order — prefix filenames (01-, 02-, ...) to control the sequence.
 * Empty or missing folder falls back to the catalogue-derived rotation.
 */
async function getUploadedHeroSlides(): Promise<HeroSlide[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(HERO_DIR);
  } catch {
    return [];
  }

  return entries
    .filter((name) => HERO_IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((filename) => ({
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

/** Dress photography for the homepage carousel — catalogue records, not scattered paths. */
export async function getHeroDressSlides(): Promise<HeroSlide[]> {
  const uploaded = await getUploadedHeroSlides();
  if (uploaded.length > 0) return uploaded;

  const gowns = await getPublicGowns();

  // Featured gowns lead the carousel; everything else follows. Within each
  // group, slides rotate designer-to-designer instead of running through
  // one designer's whole collection before moving to the next.
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

  if (fromCatalogue.length > 0) return fromCatalogue;

  return [
    {
      media: siteAssets.experienceDetail,
      alt: siteAssets.experienceDetail.alt || 'Bridal gown detail',
    },
  ];
}
