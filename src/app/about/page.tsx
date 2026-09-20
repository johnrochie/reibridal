import type { Metadata } from 'next';
import { TBD_COPY } from '@/lib/config';
import ComingSoonEnquiry from '@/components/ui/ComingSoonEnquiry';

export const metadata: Metadata = {
  title: 'About',
  description: 'About REI Bridal, Killorglin, Co. Kerry. History and story to be confirmed.',
};

const sections = [
  { heading: 'History', body: TBD_COPY.section },
  { heading: 'Experience', body: TBD_COPY.section },
  { heading: 'Story', body: TBD_COPY.section },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-4 block">REI Bridal</span>
          <h1 className="section-title text-ivory">About</h1>
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
