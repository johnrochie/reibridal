import { urlFor } from '@/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';
import type { ImageTransform, MediaRef, StorageProvider } from './types';
import { capWidth, qualityFor } from './luxury';

function cloudName(): string | undefined {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
}

function supabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function s3Base(): string | undefined {
  return process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL;
}

function localBase(): string {
  return process.env.NEXT_PUBLIC_LOCAL_MEDIA_BASE || '/images';
}

function trimSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function joinUrl(base: string, key: string): string {
  if (/^https?:\/\//i.test(key)) return key;
  const path = key.replace(/^\/+/, '');
  return `${trimSlash(base)}/${path}`;
}

function localUrl(ref: MediaRef): string {
  if (ref.key.startsWith('/')) return ref.key;
  if (/^https?:\/\//i.test(ref.key)) return ref.key;
  return joinUrl(localBase(), ref.key);
}

function cloudinaryUrl(ref: MediaRef, transform: ImageTransform): string {
  const cloud = cloudName();
  if (!cloud) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set');
  }
  const intent = transform.intent ?? 'product';
  const quality = qualityFor(intent);
  const width = capWidth(transform.width, intent);
  const height = transform.height;
  const parts = ['f_auto', `q_${quality}`];

  if (intent === 'editorial' || intent === 'og') {
    parts.push('c_limit');
    if (width) parts.push(`w_${width}`);
    if (height) parts.push(`h_${height}`);
  } else if (width && height) {
    parts.push('c_fill', 'g_auto', `w_${width}`, `h_${height}`);
  } else {
    parts.push('c_limit');
    if (width) parts.push(`w_${width}`);
  }

  return `https://res.cloudinary.com/${cloud}/image/upload/${parts.join(',')}/${ref.key.replace(/^\/+/, '')}`;
}

function sanityUrl(ref: MediaRef, transform: ImageTransform): string {
  const source = (ref.sanitySource ?? {
    _type: 'image',
    asset: { _type: 'reference', _ref: ref.key },
    hotspot: ref.hotspot
      ? { _type: 'sanity.imageHotspot', x: ref.hotspot.x, y: ref.hotspot.y, height: 1, width: 1 }
      : undefined,
  }) as SanityImageSource;

  const intent = transform.intent ?? 'product';
  const quality = qualityFor(intent);
  const width = capWidth(transform.width, intent);
  let builder = urlFor(source).quality(quality).auto('format');

  if (width) builder = builder.width(width);

  if (intent === 'editorial') {
    builder = builder.fit('max');
  } else if (transform.height && intent !== 'og') {
    builder = builder.height(transform.height).fit('crop');
  } else if (transform.height) {
    builder = builder.height(transform.height).fit('max');
  }

  return builder.url();
}

function passthroughUrl(ref: MediaRef, base?: string): string {
  if (/^https?:\/\//i.test(ref.key)) return ref.key;
  if (!base) {
    throw new Error(`Public base URL is not configured for provider "${ref.provider}"`);
  }
  return joinUrl(base, ref.key);
}

export function resolveMediaUrl(ref: MediaRef, transform: ImageTransform = {}): string {
  switch (ref.provider) {
    case 'local':
      return localUrl(ref);
    case 'sanity':
      return sanityUrl(ref, transform);
    case 'cloudinary':
      return cloudinaryUrl(ref, transform);
    case 'vercel-blob':
      return passthroughUrl(ref);
    case 'supabase': {
      const root = supabaseUrl();
      if (/^https?:\/\//i.test(ref.key)) return ref.key;
      if (!root) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
      return joinUrl(`${trimSlash(root)}/storage/v1/object/public`, ref.key);
    }
    case 's3':
      return passthroughUrl(ref, s3Base());
    default: {
      const exhaustive: never = ref.provider;
      throw new Error(`Unsupported media provider: ${exhaustive}`);
    }
  }
}

export function isProvider(value: string): value is StorageProvider {
  return value === 'local' || value === 'sanity' || value === 'cloudinary' || value === 'vercel-blob' || value === 'supabase' || value === 's3';
}
