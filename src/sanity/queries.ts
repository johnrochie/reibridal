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
import type { SanityCatalogueDesigner, SanityCatalogueGown } from '@/lib/catalogue/from-sanity';

async function fetchQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, { next: { revalidate: 60, tags } });
}

const GOWN_FIELDS = `
  _id,
  name,
  nameStatus,
  "slug": slug.current,
  "designer": designer->{ _id, name, "slug": slug.current },
  category,
  styleCode,
  sizes,
  silhouette,
  style,
  fabric,
  price,
  priceRange,
  availability,
  description,
  catalogueImages[]{
    _key,
    type,
    alt,
    matchConfidence,
    image,
    external
  },
  image,
  images,
  isNew,
  isFeatured,
  available
`;

export async function fetchCatalogueGowns(): Promise<SanityCatalogueGown[]> {
  return (
    (await fetchQuery<SanityCatalogueGown[]>(
      `*[_type == "gown"] | order(name asc) { ${GOWN_FIELDS} }`,
      {},
      ['gown']
    )) ?? []
  );
}

export async function fetchCatalogueGownBySlug(slug: string): Promise<SanityCatalogueGown | null> {
  return (
    (await fetchQuery<SanityCatalogueGown | null>(
      `*[_type == "gown" && slug.current == $slug][0] { ${GOWN_FIELDS} }`,
      { slug },
      [`gown:${slug}`]
    )) ?? null
  );
}

export async function fetchCatalogueDesigners(): Promise<SanityCatalogueDesigner[]> {
  return (
    (await fetchQuery<SanityCatalogueDesigner[]>(
      `*[_type == "designer"] | order(order asc, name asc) {
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
      }`,
      {},
      ['designer']
    )) ?? []
  );
}

export async function getAllGowns(): Promise<SanityGown[]> {
  return (
    (await fetchQuery<SanityGown[]>(
      `*[_type == "gown" && available == true] | order(name asc) { ${GOWN_FIELDS} }`,
      {},
      ['gown']
    )) ?? []
  );
}

export async function getFeaturedGowns(): Promise<SanityGown[]> {
  return (
    (await fetchQuery<SanityGown[]>(
      `*[_type == "gown" && available == true && isFeatured == true][0...3] { ${GOWN_FIELDS} }`,
      {},
      ['gown']
    )) ?? []
  );
}

export async function getGownBySlug(slug: string): Promise<SanityGown | null> {
  return (
    (await fetchQuery<SanityGown | null>(
      `*[_type == "gown" && slug.current == $slug][0] { ${GOWN_FIELDS} }`,
      { slug },
      [`gown:${slug}`]
    )) ?? null
  );
}

export async function getAllGownSlugs(): Promise<string[]> {
  const results =
    (await fetchQuery<{ slug: string }[]>(`*[_type == "gown"]{ "slug": slug.current }`)) ?? [];
  return results.map((r) => r.slug).filter(Boolean);
}

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
  return (
    (await fetchQuery<SanityDesigner[]>(
      `*[_type == "designer"] | order(order asc, name asc) { ${DESIGNER_FIELDS} }`,
      {},
      ['designer']
    )) ?? []
  );
}

export async function getFeaturedDesigners(): Promise<SanityDesigner[]> {
  return (
    (await fetchQuery<SanityDesigner[]>(
      `*[_type == "designer" && featured == true] | order(order asc) { ${DESIGNER_FIELDS} }`,
      {},
      ['designer']
    )) ?? []
  );
}

export async function getDesignerBySlug(slug: string): Promise<SanityDesigner | null> {
  return (
    (await fetchQuery<SanityDesigner | null>(
      `*[_type == "designer" && slug.current == $slug][0] { ${DESIGNER_FIELDS} }`,
      { slug },
      [`designer:${slug}`]
    )) ?? null
  );
}

export async function getAllDesignerSlugs(): Promise<string[]> {
  const results =
    (await fetchQuery<{ slug: string }[]>(`*[_type == "designer"]{ "slug": slug.current }`)) ?? [];
  return results.map((r) => r.slug).filter(Boolean);
}

export async function getGownsByDesigner(designerName: string): Promise<SanityGown[]> {
  return (
    (await fetchQuery<SanityGown[]>(
      `*[_type == "gown" && available == true && designer->name == $designerName] { ${GOWN_FIELDS} }`,
      { designerName },
      ['gown', 'designer']
    )) ?? []
  );
}

export async function getAllGalleryImages(): Promise<SanityGalleryImage[]> {
  return (
    (await fetchQuery<SanityGalleryImage[]>(
      `*[_type == "galleryImage"] | order(order asc) {
        _id, image, alt, category, caption, order
      }`,
      {},
      ['gallery']
    )) ?? []
  );
}

export async function getAllRealBrides(): Promise<SanityRealBride[]> {
  return (
    (await fetchQuery<SanityRealBride[]>(
      `*[_type == "realBride"] | order(publishedAt desc) {
        _id, brideName, partnerName, weddingDate, location,
        "gown": gown->{ name, "slug": slug.current },
        quote, image, images, featured, publishedAt
      }`,
      {},
      ['realBride']
    )) ?? []
  );
}

export async function getFeaturedRealBrides(): Promise<SanityRealBride[]> {
  return (
    (await fetchQuery<SanityRealBride[]>(
      `*[_type == "realBride" && featured == true] | order(publishedAt desc) {
        _id, brideName, partnerName, weddingDate, location,
        "gown": gown->{ name, "slug": slug.current },
        quote, image, images, featured, publishedAt
      }`,
      {},
      ['realBride']
    )) ?? []
  );
}

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
  return (
    (await fetchQuery<SanityBlogPost[]>(
      `*[_type == "blogPost"] | order(publishedAt desc) { ${BLOG_FIELDS} }`,
      {},
      ['blogPost']
    )) ?? []
  );
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  return (
    (await fetchQuery<SanityBlogPost | null>(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        ${BLOG_FIELDS}, content
      }`,
      { slug },
      [`blogPost:${slug}`]
    )) ?? null
  );
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const results =
    (await fetchQuery<{ slug: string }[]>(`*[_type == "blogPost"]{ "slug": slug.current }`)) ?? [];
  return results.map((r) => r.slug).filter(Boolean);
}

export async function getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
  return (
    (await fetchQuery<SanityTestimonial[]>(
      `*[_type == "testimonial" && featured == true][0...3] {
        _id, name, date, location, text
      }`,
      {},
      ['testimonial']
    )) ?? []
  );
}

export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return (
    (await fetchQuery<SanityTeamMember[]>(
      `*[_type == "teamMember"] | order(order asc) {
        _id, name, role, bio, image, order
      }`,
      {},
      ['teamMember']
    )) ?? []
  );
}
