import Image from 'next/image';
import { resolveMediaUrl, NEXT_IMAGE_QUALITY } from '@/lib/media';
import type { MediaIntent, MediaRef } from '@/lib/media/types';

interface CatalogueImageProps {
  media: MediaRef | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  intent?: MediaIntent;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

export default function CatalogueImage({
  media,
  alt,
  width = 1200,
  height,
  intent = 'product',
  fill,
  priority,
  sizes,
  className,
  objectFit = 'cover',
}: CatalogueImageProps) {
  if (!media?.key) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-charcoal-light ${className ?? ''}`}
        aria-label="Photography not yet available"
      >
        <span className="px-6 text-center text-[10px] font-light uppercase tracking-widest-xl text-ivory/30">
          Photography coming soon
        </span>
      </div>
    );
  }

  const src = resolveMediaUrl(media, { width, height, intent });
  const imageAlt = media.alt || alt;

  if (fill) {
    return (
      <Image
        src={src}
        alt={imageAlt}
        fill
        priority={priority}
        quality={NEXT_IMAGE_QUALITY}
        sizes={sizes}
        className={className}
        style={{ objectFit, objectPosition: 'center top' }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width}
      height={height ?? Math.round(width * 1.5)}
      priority={priority}
      quality={NEXT_IMAGE_QUALITY}
      sizes={sizes}
      className={className}
      style={{ objectFit, objectPosition: 'center top' }}
    />
  );
}
