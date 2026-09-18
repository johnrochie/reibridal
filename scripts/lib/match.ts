export type MatchConfidence = 'high' | 'medium' | 'low';

export interface MatchableGown {
  id: string;
  slug: string;
  name: string;
  styleCode?: string | null;
  designerName: string;
  designerSlug: string;
}

export interface ImageMatch {
  gownId: string | null;
  gownSlug: string | null;
  designerSlug: string | null;
  confidence: MatchConfidence;
  reason: string;
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function compact(value: string): string {
  return normalize(value).replace(/\s+/g, '');
}

function containsToken(haystack: string, needle: string): boolean {
  const compactNeedle = compact(needle);
  if (!compactNeedle || compactNeedle.length < 3) return false;
  return compact(haystack).includes(compactNeedle);
}

export function matchImageToCatalogue(relativePath: string, gowns: MatchableGown[]): ImageMatch {
  if (gowns.length === 0) {
    return {
      gownId: null,
      gownSlug: null,
      designerSlug: null,
      confidence: 'low',
      reason: 'No catalogue records available for matching',
    };
  }

  const scored = gowns.map((gown) => {
    const designerHit =
      containsToken(relativePath, gown.designerName) || containsToken(relativePath, gown.designerSlug);
    const nameHit = containsToken(relativePath, gown.name) || containsToken(relativePath, gown.slug);
    const codeHit = gown.styleCode ? containsToken(relativePath, gown.styleCode) : false;
    const gownHit = nameHit || codeHit;
    let score = 0;
    if (designerHit) score += 2;
    if (nameHit) score += 3;
    if (codeHit) score += 3;
    return { gown, designerHit, gownHit, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  const tied = scored.filter((item) => item.score === best.score && item.score > 0);

  if (!best || best.score === 0) {
    return {
      gownId: null,
      gownSlug: null,
      designerSlug: null,
      confidence: 'low',
      reason: 'PHOTO REVIEW REQUIRED — no reliable designer or gown signal',
    };
  }

  if (best.designerHit && best.gownHit && tied.length === 1) {
    return {
      gownId: best.gown.id,
      gownSlug: best.gown.slug,
      designerSlug: best.gown.designerSlug,
      confidence: 'high',
      reason: 'Designer path and gown identifier both matched uniquely — suggest only, do not auto-publish',
    };
  }

  if (tied.length > 1) {
    return {
      gownId: null,
      gownSlug: null,
      designerSlug: best.gown.designerSlug,
      confidence: 'medium',
      reason: `PHOTO REVIEW REQUIRED — ambiguous match between ${tied.map((item) => item.gown.slug).join(', ')}`,
    };
  }

  return {
    gownId: best.gownHit ? best.gown.id : null,
    gownSlug: best.gownHit ? best.gown.slug : null,
    designerSlug: best.designerHit ? best.gown.designerSlug : null,
    confidence: 'medium',
    reason: best.gownHit
      ? 'PHOTO REVIEW REQUIRED — gown identifier in the path only; filenames and folders are not assumed accurate'
      : 'PHOTO REVIEW REQUIRED — designer folder only; gown not identified',
  };
}

export function catalogueFromRecords(
  gowns: Array<{
    id: string;
    slug: string;
    name: { value: string | null };
    styleCode: { value: string | null };
    designer: { name: string; slug: string };
  }>
): MatchableGown[] {
  return gowns
    .filter((gown) => gown.name.value)
    .map((gown) => ({
      id: gown.id,
      slug: gown.slug,
      name: gown.name.value as string,
      styleCode: gown.styleCode.value,
      designerName: gown.designer.name,
      designerSlug: gown.designer.slug,
    }));
}
