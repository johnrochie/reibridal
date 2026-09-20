import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from './client';

export function urlFor(source: SanityImageSource) {
  if (!client) {
    throw new Error('Sanity is not configured');
  }
  return imageUrlBuilder(client).image(source);
}
