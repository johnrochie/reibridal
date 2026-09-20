#!/usr/bin/env tsx
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { isPublicFact, missing, toPublicGown, verified } from '../src/lib/catalogue/status';
import { localGowns } from '../src/lib/catalogue/local-seed';
import { differenceHash, hammingDistance, sha256File } from './lib/hash';
import { catalogueFromRecords, matchImageToCatalogue } from './lib/match';
import { optimizeCopy } from './lib/optimize';
import { scanImages } from './lib/scan';
import type { GownRecord } from '../src/lib/catalogue/types';

function sampleGown(overrides: Partial<GownRecord> = {}): GownRecord {
  return {
    id: 'gown.cindy',
    slug: 'truvelle-cindy',
    name: verified('Cindy', 'needs-review'),
    designer: { id: 'd1', slug: 'truvelle', name: 'Truvelle' },
    category: missing(),
    styleCode: missing(),
    sizes: missing(),
    silhouette: missing(),
    style: missing(),
    fabric: missing(),
    price: missing(),
    availability: missing(),
    description: missing(),
    images: [],
    featured: false,
    isNew: false,
    listed: true,
    ...overrides,
  };
}

async function main() {
  assert.equal(isPublicFact(verified('UK 14', 'confirmed')), true);
  assert.equal(isPublicFact(verified('UK 14', 'needs-review')), false);
  assert.equal(isPublicFact(missing()), false);

  const incomplete = toPublicGown(
    sampleGown({
      sizes: verified(['UK 14'], 'confirmed'),
      fabric: verified('silk', 'draft'),
      price: verified('POA', 'needs-review'),
    })
  );
  assert.deepEqual(incomplete.sizes, ['UK 14']);
  assert.equal(incomplete.fabric, null);
  assert.equal(incomplete.price, null);
  assert.equal(incomplete.description, null);

  const { isComingSoonHold } = await import('../src/lib/coming-soon');
  assert.equal(isComingSoonHold({ flag: 'true', host: 'localhost:3000' }), true);
  assert.equal(isComingSoonHold({ flag: 'false', host: 'www.reibridal.ie' }), false);
  assert.equal(isComingSoonHold({ flag: undefined, host: 'localhost:3000' }), false);
  assert.equal(isComingSoonHold({ flag: undefined, host: 'rei-bridal.vercel.app' }), false);
  assert.equal(isComingSoonHold({ flag: undefined, host: 'www.reibridal.ie' }), true);
  assert.equal(isComingSoonHold({ flag: undefined, host: 'reibridal.ie' }), true);

  const gowns = catalogueFromRecords(localGowns);
  const high = matchImageToCatalogue('Truvelle/Cindy/front.jpg', [
    { id: 'g1', slug: 'truvelle-cindy', name: 'Cindy', designerName: 'Truvelle', designerSlug: 'truvelle' },
  ]);
  assert.equal(high.confidence, 'high');

  const medium = matchImageToCatalogue('inbox/cindy-front.jpg', [
    { id: 'g1', slug: 'truvelle-cindy', name: 'Cindy', designerName: 'Truvelle', designerSlug: 'truvelle' },
  ]);
  assert.equal(medium.confidence, 'medium');

  const unmatched = matchImageToCatalogue('inbox/IMG_2048.jpg', [
    { id: 'g1', slug: 'truvelle-cindy', name: 'Cindy', designerName: 'Truvelle', designerSlug: 'truvelle' },
  ]);
  assert.equal(unmatched.confidence, 'low');
  assert.match(unmatched.reason, /PHOTO REVIEW REQUIRED|UNMATCHED/);

  const jules = matchImageToCatalogue('gowns/jules-ja192-8.jpg', gowns);
  assert.equal(jules.confidence, 'medium');
  assert.equal(jules.gownSlug, 'jules-ja192');

  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'rei-ingest-'));
  const sourceDir = path.join(tmp, 'source');
  const outDir = path.join(tmp, 'out');
  await fs.mkdir(path.join(sourceDir, 'Truvelle', 'Cindy'), { recursive: true });

  const original = path.join(sourceDir, 'Truvelle', 'Cindy', 'front.jpg');
  const duplicate = path.join(sourceDir, 'Truvelle', 'Cindy', 'front-copy.jpg');
  const unmatchedFile = path.join(sourceDir, 'random.png');

  await sharp({ create: { width: 80, height: 120, channels: 3, background: '#c9b882' } })
    .jpeg()
    .toFile(original);
  await fs.copyFile(original, duplicate);
  await sharp({ create: { width: 40, height: 40, channels: 3, background: '#3d3d3f' } })
    .png()
    .toFile(unmatchedFile);

  const originalStat = await fs.stat(original);
  const scanned = await scanImages(sourceDir);
  assert.equal(scanned.length, 3);

  const hashA = await sha256File(original);
  const hashB = await sha256File(duplicate);
  assert.equal(hashA, hashB);
  assert.equal(hammingDistance(await differenceHash(original), await differenceHash(duplicate)), 0);

  const optimized = await optimizeCopy(original, outDir, 'Truvelle/Cindy/front.jpg');
  const after = await fs.stat(original);
  assert.equal(after.size, originalStat.size);
  assert.equal(after.mtimeMs, originalStat.mtimeMs);
  assert.notEqual(path.resolve(optimized.webp), path.resolve(original));
  await fs.access(optimized.webp);
  await fs.access(optimized.jpeg);

  await fs.rm(tmp, { recursive: true, force: true });
  console.log('catalogue-check: ok');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
