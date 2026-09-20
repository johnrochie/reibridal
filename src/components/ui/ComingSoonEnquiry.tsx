import { siteConfig } from '@/lib/config';

export default function ComingSoonEnquiry({
  line = 'Questions in the meantime? We would be glad to hear from you.',
}: {
  line?: string;
}) {
  return (
    <section className="py-16 px-6 lg:px-12 border-t border-ivory/10">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-sans font-light text-ivory/60 leading-relaxed mb-4">{line}</p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-xs tracking-widest uppercase font-light text-champagne hover:text-champagne-light transition-colors"
        >
          {siteConfig.email}
        </a>
      </div>
    </section>
  );
}
