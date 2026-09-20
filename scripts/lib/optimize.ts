import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export interface OptimizeResult {
  webp: string;
  jpeg: string;
  width: number;
  height: number;
}

const MAX_WIDTH = 2400;
const MAX_HEIGHT = 3200;
const WEBP_QUALITY = 88;
const JPEG_QUALITY = 90;

export async function optimizeCopy(sourcePath: string, outputDir: string, relativePath: string): Promise<OptimizeResult> {
  const stem = relativePath.replace(/\.[^.]+$/, '');
  const targetDir = path.join(outputDir, path.dirname(stem));
  await fs.mkdir(targetDir, { recursive: true });

  const resolvedSource = path.resolve(sourcePath);
  const webpPath = path.resolve(outputDir, `${stem}.webp`);
  const jpegPath = path.resolve(outputDir, `${stem}.jpg`);
  if (webpPath === resolvedSource || jpegPath === resolvedSource) {
    throw new Error('Refusing to overwrite a source file');
  }

  const pipeline = sharp(sourcePath, { failOn: 'none' }).rotate();
  const meta = await pipeline.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  const resized = pipeline.resize({
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    fit: 'inside',
    withoutEnlargement: true,
  });

  await resized.clone().webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(webpPath);
  await resized.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpegPath);

  return { webp: webpPath, jpeg: jpegPath, width, height };
}
