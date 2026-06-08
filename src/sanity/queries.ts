import { client } from './client';
import type {
  SanityGown,
  SanityDesigner,
  SanityGalleryImage,
  SanityRealBride,
  SanityBlogPost,
  SanityTestimonial,
  SanityTeamMember,
} from './types';

// ── Gowns ────────────────────────────────────────────────────────
const GOWN_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  "designer": designer->{ name, "slug": slug.current },
  category,
  priceRange,
  description,
  features,
  image,
  images,
  isNew,
  isFeatured,
  available
`;

export async function getAllGowns(): Promise<SanityGown[]> {
  return client.fetch(
    `*[_type == "gown" && available == true] | order(name asc) { ${GOWN_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ['gown'] } }
  );
}

export async function getFeaturedGowns(): Promise<SanityGown[]> {
  return client.fetch(
    `*[_type == "gown" && available == true && isFeatured == true][0...3] { ${GOWN_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ['gown'] } }
  );
}

export async function getGownBySlug(slug: string): Promise<SanityGown | null> {
  return client.fetch(
    `*[_type == "gown" && slug.current == $slug][0] { ${GOWN_FIELDS} }`,
    { slug },
    { next: { revalidate: 60, tags: [`gown:${slug}`] } }
  );
}

export async function getAllGownSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "gown"]{ "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

// ── Designers ────────────────────────────────────────────────────
const DESIGNER_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  country,
  shortBio,
  description,
  image,
  coverImage,
  website,
  featured,
  order
`;

export async function getAllDesigners(): Promise<SanityDesigner[]> {
  return client.fetch(
    `*[_type == "designer"] | order(order asc, name asc) { ${DESIGNER_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ['designer'] } }
  );
}

export async function getFeaturedDesigners(): Promise<SanityDesigner[]> {
  return client.fetch(
    `*[_type == "designer" && featured == true] | order(order asc) { ${DESIGNER_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ['designer'] } }
  );
}

export async function getDesignerBySlug(slug: string): Promise<SanityDesigner | null> {
  return client.fetch(
    `*[_type == "designer" && slug.current == $slug][0] { ${DESIGNER_FIELDS} }`,
    { slug },
    { next: { revalidate: 60, tags: [`designer:${slug}`] } }
  );
}

export async function getAllDesignerSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "designer"]{ "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

export async function getGownsByDesigner(designerName: string): Promise<SanityGown[]> {
  return client.fetch(
    `*[_type == "gown" && available == true && designer->name == $designerName] { ${GOWN_FIELDS} }`,
    { designerName },
    { next: { revalidate: 60, tags: ['gown', 'designer'] } }
  );
}

// ── Gallery ──────────────────────────────────────────────────────
export async function getAllGalleryImages(): Promise<SanityGalleryImage[]> {
  return client.fetch(
    `*[_type == "galleryImage"] | order(order asc) {
      _id, image, alt, category, caption, order
    }`,
    {},
    { next: { revalidate: 60, tags: ['gallery'] } }
  );
}

// ── Real Brides ──────────────────────────────────────────────────
export async function getAllRealBrides(): Promise<SanityRealBride[]> {
  return client.fetch(
    `*[_type == "realBride"] | order(publishedAt desc) {
      _id, brideName, partnerName, weddingDate, location,
      "gown": gown->{ name, "slug": slug.current },
      quote, image, images, featured, publishedAt
    }`,
    {},
    { next: { revalidate: 60, tags: ['realBride'] } }
  );
}

export async function getFeaturedRealBrides(): Promise<SanityRealBride[]> {
  return client.fetch(
    `*[_type == "realBride" && featured == true] | order(publishedAt desc) {
      _id, brideName, partnerName, weddingDate, location,
      "gown": gown->{ name, "slug": slug.current },
      quote, image, images, featured, publishedAt
    }`,
    {},
    { next: { revalidate: 60, tags: ['realBride'] } }
  );
}

// ── Blog ─────────────────────────────────────────────────────────
const BLOG_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  publishedAt,
  author,
  tags,
  featured
`;

export async function getAllBlogPosts(): Promise<SanityBlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) { ${BLOG_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ['blogPost'] } }
  );
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      ${BLOG_FIELDS}, content
    }`,
    { slug },
    { next: { revalidate: 60, tags: [`blogPost:${slug}`] } }
  );
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "blogPost"]{ "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

// ── Testimonials ─────────────────────────────────────────────────
export async function getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(
    `*[_type == "testimonial" && featured == true][0...3] {
      _id, name, date, location, text
    }`,
    {},
    { next: { revalidate: 60, tags: ['testimonial'] } }
  );
}

// ── Team ─────────────────────────────────────────────────────────
export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio, image, order
    }`,
    {},
    { next: { revalidate: 60, tags: ['teamMember'] } }
  );
}
