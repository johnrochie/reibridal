#!/usr/bin/env tsx
/**
 * Photo ingest utility.
 *
 * Scans a local source library, records paths/dimensions, flags obvious
 * duplicates, suggests designer/gown matches, optionally writes a contact
 * sheet, and writes luxury-quality production copies.
 *
 * Originals are never modified or deleted.
 *
 *   npm run photos:ingest -- --source ./photo-library --out ./media/ingest --contact-sheet
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { localGowns } from '../src/lib/catalogue/local-seed';
import { writeContactSheet } from './lib/contact-sheet';
import { differenceHash, hammingDistance, OBVIOUS_DUPLICATE_THRESHOLD, sha256File } from './lib/hash';
import { catalogueFromRecords, matchImageToCatalogue } from './lib/match';
import { optimizeCopy } from './lib/optimize';
import { scanImages } from './lib/scan';

interface Args {
  source: string;
  out: string;
  contactSheet: boolean;
  optimize: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    source: process.env.PHOTO_LIBRARY_PATH || './photo-library',
    out: './media/ingest',
    contactSheet: false,
    optimize: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--source') args.source = argv[++i];
    else if (token === '--out') args.out = argv[++i];
    else if (token === '--contact-sheet') args.contactSheet = true;
    else if (token === '--no-optimize') args.optimize = false;
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const source = path.resolve(args.source);
  const out = path.resolve(args.out);

  const sourceStat = await fs.stat(source).catch(() => null);
  if (!sourceStat?.isDirectory()) {
    throw new Error(`Source directory does not exist: ${source}`);
  }
  if (path.resolve(out).startsWith(source + path.sep) || out === source) {
    throw new Error('Output directory must not be inside the source library');
  }

  const images = await scanImages(source);
  const gowns = catalogueFromRecords(localGowns);
  const hashes: Array<{ relativePath: string; sha256: string; dhash: string }> = [];
  const records = [];

  for (const image of images) {
    const metadata = await sharp(image.absolutePath, { failOn: 'none' }).metadata();
    const sha256 = await sha256File(image.absolutePath);
    const dhash = await differenceHash(image.absolutePath);
    const exactDuplicateOf = hashes.find((item) => item.sha256 === sha256)?.relativePath ?? null;
    const visualDuplicateOf =
      exactDuplicateOf ??
      hashes.find((item) => hammingDistance(item.dhash, dhash) <= OBVIOUS_DUPLICATE_THRESHOLD)?.relativePath ??
      null;
    const match = matchImageToCatalogue(image.relativePath, gowns);

    let optimized = null;
    if (args.optimize) {
      const copies = await optimizeCopy(image.absolutePath, path.join(out, 'optimized'), image.relativePath);
      optimized = {
        webp: path.relative(out, copies.webp),
        jpeg: path.relative(out, copies.jpeg),
        sourceWidth: copies.width,
        sourceHeight: copies.height,
      };
    }

    hashes.push({ relativePath: image.relativePath, sha256, dhash });
    records.push({
      path: image.relativePath,
      filename: image.filename,
      bytes: image.bytes,
      width: metadata.width ?? null,
      height: metadata.height ?? null,
      format: metadata.format ?? null,
      sha256,
      exactDuplicateOf,
      visualDuplicateOf,
      match,
      review:
        match.confidence === 'low'
          ? 'UNMATCHED / REVIEW'
          : match.confidence === 'medium'
            ? 'PHOTO REVIEW REQUIRED'
            : 'SUGGESTED MATCH',
      optimized,
    });
  }

  await fs.mkdir(out, { recursive: true });
  const manifestPath = path.join(out, 'manifest.json');
  await fs.writeFile(
    manifestPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source,
        imageCount: records.length,
        originalsUntouched: true,
        notes: [
          'High confidence is a suggestion only — never silently associated.',
          'Medium confidence requires human review.',
          'Low confidence stays unmatched.',
          'Filenames are not assumed accurate.',
        ],
        images: records,
      },
      null,
      2
    )
  );

  let contactSheet = null;
  if (args.contactSheet) {
    contactSheet = await writeContactSheet(
      images.map((image) => ({ absolutePath: image.absolutePath, relativePath: image.relativePath })),
      path.join(out, 'contact-sheet.jpg')
    );
  }

  const summary = {
    scanned: records.length,
    suggested: records.filter((item) => item.match.confidence === 'high').length,
    review: records.filter((item) => item.match.confidence === 'medium').length,
    unmatched: records.filter((item) => item.match.confidence === 'low').length,
    exactDuplicates: records.filter((item) => item.exactDuplicateOf).length,
    visualDuplicates: records.filter((item) => item.visualDuplicateOf).length,
    manifest: manifestPath,
    contactSheet,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
