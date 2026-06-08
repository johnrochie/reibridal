import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Journal | REI Bridal',
  description:
    'The REI Bridal Journal — expert bridal advice, designer spotlights, and inspiration for brides planning their wedding in Kerry, Ireland and beyond.',
  openGraph: {
    title: 'The REI Bridal Journal',
    description: 'Expert bridal advice and inspiration from our Kerry boutique.',
  },
};

const categoryLabels: Record<string, string> = {
  advice: 'Bridal Advice',
  designers: 'Our Designers',
  inspiration: 'Inspiration',
  appointments: 'Appointments',
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const [hero, ...rest] = sorted;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-charcoal overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 40% 60%, #c9b882, transparent 55%)' }}
        />
        <div className="relative max-w-8xl mx-auto">
          <span className="section-label mb-4 block">From the Boutique</span>
          <h1 className="section-title text-ivory">The Journal</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-lg leading-relaxed">
            Bridal advice, designer stories, and inspiration from the team at REI Bridal in Kerry, Ireland.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {hero && (
        <section className="bg-ivory">
          <Link href={`/blog/${hero.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] block">
            <div className="relative min-h-[50vh] lg:min-h-full overflow-hidden bg-ivory-deep">
              <Image
                src={hero.image}
                alt={hero.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-charcoal-deep/10 group-hover:bg-charcoal-deep/20 transition-colors duration-500" />
            </div>
            <div className="flex items-center px-8 py-16 lg:px-16 xl:px-24 bg-ivory">
              <div className="max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                  <span className="section-label">{categoryLabels[hero.category]}</span>
                  <span className="text-charcoal/20">·</span>
                  <time className="text-xs font-light text-charcoal/40 tracking-widest">
                    {new Date(hero.publishedAt).toLocaleDateString('en-IE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6 group-hover:text-champagne-dark transition-colors duration-300">
                  {hero.title}
                </h2>
                <p className="font-sans font-light text-charcoal/60 leading-relaxed mb-8">
                  {hero.excerpt}
                </p>
                <span className="text-xs tracking-widest uppercase font-light text-champagne group-hover:translate-x-2 transition-transform duration-300 inline-block">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Post grid */}
      {rest.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-ivory-warm">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function PostCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-video overflow-hidden bg-ivory-deep mb-5">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="section-label text-[10px]">{categoryLabels[post.category]}</span>
        <span className="text-charcoal/20 text-xs">·</span>
        <time className="text-xs font-light text-charcoal/40">
          {new Date(post.publishedAt).toLocaleDateString('en-IE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
      <h2 className="font-serif text-2xl text-charcoal leading-tight mb-3 group-hover:text-champagne-dark transition-colors">
        {post.title}
      </h2>
      <p className="text-sm font-light text-charcoal/50 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
    </Link>
  );
}
