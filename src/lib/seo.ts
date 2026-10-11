import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

interface PageMetaInput {
  /** Page title. Run through the layout's "%s | REI Bridal" template unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Route path beginning with "/", e.g. "/designers/jane-aston". Becomes the canonical URL. */
  path: string;
  absoluteTitle?: boolean;
  images?: { url: string; alt: string }[];
  type?: 'website' | 'article';
}

/**
 * Per-page metadata with a self-referencing canonical and matching Open Graph URL.
 * Child `openGraph` objects replace the layout's rather than merging, so the shared
 * fields are repeated here.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  images,
  type = 'website',
}: PageMetaInput): Metadata {
  const url = path === '/' ? siteConfig.url : `${siteConfig.url}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  // Setting openGraph here drops the inherited app/opengraph-image, so fall back to it explicitly.
  const shareImages = images ?? [{ url: '/opengraph-image', alt: `${siteConfig.name}, luxury bridal boutique in Killorglin, Co. Kerry` }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: 'en_IE',
      siteName: siteConfig.name,
      url,
      title: fullTitle,
      description,
      images: shareImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: shareImages.map((image) => image.url),
    },
  };
}

/** Trim free text to a search-snippet-friendly length on a word boundary. */
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 1))}…`;
}
