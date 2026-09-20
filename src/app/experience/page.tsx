import type { Metadata } from 'next';
import { siteConfig, TBD_COPY } from '@/lib/config';
import ComingSoonEnquiry from '@/components/ui/ComingSoonEnquiry';

export const metadata: Metadata = {
  title: siteConfig.experienceNavLabel,
  description: `${siteConfig.experienceNavLabel} at REI Bridal, Killorglin, Co. Kerry. Details to be confirmed.`,
};

const sections = [
  { heading: 'The visit', body: TBD_COPY.section },
  { heading: 'What to bring', body: TBD_COPY.section },
  { heading: 'Aftercare', body: TBD_COPY.section },
];

export default function ExperiencePage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-4 block">REI Bridal</span>
          <h1 className="section-title text-ivory">{siteConfig.experienceNavLabel}</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-xl leading-relaxed">{TBD_COPY.pageIntro}</p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-charcoal-deep">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif text-4xl text-ivory mb-4">{section.heading}</h2>
              <p className="font-sans font-light text-ivory/50 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ComingSoonEnquiry />
    </>
  );
}
