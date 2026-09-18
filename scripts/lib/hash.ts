import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import sharp from 'sharp';

export async function sha256File(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

/** Classic difference hash. Used only for obvious duplicate detection. */
export async function differenceHash(filePath: string): Promise<string> {
  const pixels = await sharp(filePath)
    .rotate()
    .greyscale()
    .resize(9, 8, { fit: 'fill' })
    .raw()
    .toBuffer();

  let bits = '';
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      const left = pixels[y * 9 + x];
      const right = pixels[y * 9 + x + 1];
      bits += left < right ? '1' : '0';
    }
  }
  return bits;
}

export function hammingDistance(a: string, b: string): number {
  const length = Math.min(a.length, b.length);
  let distance = 0;
  for (let i = 0; i < length; i += 1) {
    if (a[i] !== b[i]) distance += 1;
  }
  distance += Math.abs(a.length - b.length);
  return distance;
}

export const OBVIOUS_DUPLICATE_THRESHOLD = 8;
