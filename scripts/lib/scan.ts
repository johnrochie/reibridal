import fs from 'node:fs/promises';
import path from 'node:path';

export const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif', '.gif']);

export interface ScannedImage {
  absolutePath: string;
  relativePath: string;
  filename: string;
  extension: string;
  bytes: number;
}

export async function scanImages(sourceDir: string): Promise<ScannedImage[]> {
  const root = path.resolve(sourceDir);
  const results: ScannedImage[] = [];

  async function walk(current: string) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        await walk(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      const extension = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(extension)) continue;
      const stat = await fs.stat(absolutePath);
      results.push({
        absolutePath,
        relativePath: path.relative(root, absolutePath),
        filename: entry.name,
        extension,
        bytes: stat.size,
      });
    }
  }

  await walk(root);
  results.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  return results;
}
