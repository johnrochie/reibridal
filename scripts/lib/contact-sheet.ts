import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const THUMB = 220;
const COLS = 6;
const LABEL_H = 28;

export async function writeContactSheet(
  files: Array<{ absolutePath: string; relativePath: string }>,
  outputPath: string
): Promise<string | null> {
  if (files.length === 0) return null;

  const rows = Math.ceil(files.length / COLS);
  const width = COLS * THUMB;
  const height = rows * (THUMB + LABEL_H);
  const composites: Array<{ input: Buffer; left: number; top: number }> = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    const left = col * THUMB;
    const top = row * (THUMB + LABEL_H);

    const thumb = await sharp(file.absolutePath, { failOn: 'none' })
      .rotate()
      .resize(THUMB, THUMB, { fit: 'cover', position: 'top', withoutEnlargement: false })
      .jpeg({ quality: 82 })
      .toBuffer();

    composites.push({ input: thumb, left, top });

    const label = await sharp({
      text: {
        text: `<span foreground="#c9b882">${escapeXml(file.relativePath.slice(0, 42))}</span>`,
        width: THUMB - 8,
        height: LABEL_H - 6,
        align: 'centre',
        rgba: true,
      },
    })
      .png()
      .toBuffer()
      .catch(() => null);

    if (label) {
      composites.push({ input: label, left: left + 4, top: top + THUMB + 4 });
    }
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: '#1a1a1c',
    },
  })
    .composite(composites)
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outputPath);

  return outputPath;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
