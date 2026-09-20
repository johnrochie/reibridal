import type { Metadata } from 'next';
import { TBD_COPY } from '@/lib/config';
import ComingSoonEnquiry from '@/components/ui/ComingSoonEnquiry';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions about visiting REI Bridal. Answers will appear once they are confirmed.',
};

const topics = [
  { heading: 'Appointments', body: TBD_COPY.section },
  { heading: 'Visiting the boutique', body: TBD_COPY.section },
  { heading: 'Orders and fittings', body: TBD_COPY.section },
];

export default function FaqPage() {
  return (
    <>
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-8xl mx-auto">
          <span className="section-label mb-4 block">Help</span>
          <h1 className="section-title text-ivory">FAQ</h1>
          <span className="block w-16 h-px bg-champagne mt-6 mb-8" />
          <p className="font-sans font-light text-ivory/50 max-w-xl leading-relaxed">{TBD_COPY.pageIntro}</p>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 bg-charcoal-deep">
        <div className="max-w-4xl mx-auto divide-y divide-champagne/10">
          {topics.map((topic) => (
            <div key={topic.heading} className="py-8 first:pt-0">
              <h2 className="font-serif text-3xl text-ivory mb-3">{topic.heading}</h2>
              <p className="font-sans font-light text-ivory/50 leading-relaxed">{topic.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ComingSoonEnquiry />
    </>
  );
}
