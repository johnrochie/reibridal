export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; width: number; height: number };
}

export interface SanityGown {
  _id: string;
  name: string;
  slug: string;
  designer: { name: string; slug: string };
  category: 'wedding' | 'bridesmaid' | 'occasion';
  priceRange?: string;
  description: string;
  features?: string[];
  image: SanityImage;
  images?: SanityImage[];
  isNew?: boolean;
  isFeatured?: boolean;
  available: boolean;
}

export interface SanityDesigner {
  _id: string;
  name: string;
  slug: string;
  country: string;
  shortBio: string;
  description: string;
  image: SanityImage;
  coverImage: SanityImage;
  website?: string;
  featured: boolean;
  order?: number;
}

export interface SanityGalleryImage {
  _id: string;
  image: SanityImage;
  alt: string;
  category: 'bride' | 'portrait' | 'detail' | 'ceremony' | 'editorial';
  caption?: string;
  order?: number;
}

export interface SanityRealBride {
  _id: string;
  brideName: string;
  partnerName?: string;
  weddingDate: string;
  location: string;
  gown?: { name: string; slug: string };
  quote?: string;
  image: SanityImage;
  images?: SanityImage[];
  featured?: boolean;
  publishedAt: string;
}

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: SanityImage;
  category: 'advice' | 'designers' | 'inspiration' | 'appointments';
  content: PortableTextBlock[];
  publishedAt: string;
  author: string;
  tags?: string[];
  featured?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  date: string;
  location?: string;
  text: string;
  featured?: boolean;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: SanityImage;
  order?: number;
}

// Portable Text types (simplified)
export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}
