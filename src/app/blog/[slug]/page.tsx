import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getBlogPostBySlug, getAllBlogSlugs, getAllBlogPosts } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { siteConfig } from '@/lib/config';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | REI Bridal Journal`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: urlFor(post.coverImage).width(1200).height(630).url(), alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [urlFor(post.coverImage).width(1200).height(630).url()],
    },
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans font-light text-charcoal/70 leading-relaxed text-base">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-3xl text-charcoal mt-12 mb-4 leading-tight">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-2xl text-charcoal mt-8 mb-3 leading-tight">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-champagne pl-6 my-8">
        <p className="font-serif text-2xl text-charcoal/70 italic leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-3 my-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3 text-sm font-light text-charcoal/60">
        <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
        {children}
      </li>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-10">
        <div className="relative aspect-video overflow-hidden bg-ivory-deep">
          <Image
            src={urlFor(value).width(900).height(500).url()}
            alt={value.alt || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
        {value.caption && (
          <figcaption className="text-xs text-center font-light text-charcoal/40 mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(params.slug),
    getAllBlogPosts(),
  ]);
  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: urlFor(post.coverImage).width(1200).height(630).url(),
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/og-image.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
    keywords: post.tags?.join(', ') ?? '',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ],
  };

  const categoryLabels: Record<string, string> = {
    advice: 'Bridal Advice',
    designers: 'Our Designers',
    inspiration: 'Inspiration',
    appointments: 'Appointments',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-40 pb-0 bg-charcoal overflow-hidden">
        <div className="relative max-w-8xl mx-auto px-6 lg:px-12 pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs font-light text-ivory/40">
              <li><Link href="/" className="hover:text-champagne transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-champagne transition-colors">Journal</Link></li>
              <li>/</li>
              <li className="text-ivory/60 line-clamp-1 max-w-xs">{post.title}</li>
            </ol>
          </nav>

          <span className="section-label mb-4 block">{categoryLabels[post.category]}</span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory leading-none max-w-4xl mb-8">
            {post.title}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-xs font-light text-ivory/40 tracking-widest">
              {post.author}
            </span>
            <span className="text-ivory/20">·</span>
            <time className="text-xs font-light text-ivory/40 tracking-widest">
              {new Date(post.publishedAt).toLocaleDateString('en-IE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>

        {/* Cover image */}
        <div className="relative aspect-video max-h-[60vh] overflow-hidden">
          <Image
            src={urlFor(post.coverImage).width(1600).height(900).url()}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        </div>
      </section>

      {/* Article body */}
      <article className="py-20 px-6 lg:px-12 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-2xl text-charcoal/70 leading-relaxed mb-12 italic">
            {post.excerpt}
          </p>
          <span className="block w-16 h-px bg-champagne mb-12" />

          <div className="prose-bridal space-y-6">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-ivory-deep">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-widest uppercase font-light text-charcoal/40 border border-ivory-deep px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-charcoal text-center">
        <div className="max-w-2xl mx-auto">
          <span className="section-label mb-6 block">Begin Your Journey</span>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-6">
            Ready to Find Your Gown?
          </h2>
          <span className="deco-line" />
          <p className="font-sans font-light text-ivory/50 max-w-md mx-auto mb-10 leading-relaxed">
            Book a private appointment at our Kerry boutique and let us guide you to the gown
            you will wear on the most important day of your life.
          </p>
          <Link href={siteConfig.appointmentUrl} className="btn-primary">
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <h2 className="font-serif text-3xl text-charcoal mb-10">More from the Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden bg-ivory-deep mb-4">
                    <Image
                      src={urlFor(p.coverImage).width(600).height(400).url()}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-champagne-dark transition-colors leading-tight">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
