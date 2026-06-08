import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms & Conditions | REI Bridal',
  description: 'Terms and Conditions for REI Bridal boutique, Kerry, Ireland.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <span className="section-label mb-4 block">Legal</span>
          <h1 className="section-title text-ivory">Terms &amp; Conditions</h1>
          <span className="block w-16 h-px bg-champagne mt-6" />
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-light text-charcoal/50 mb-12">
            Last updated: January 2025
          </p>

          <LegalSection title="1. About Us">
            <p>
              REI Bridal is a luxury bridal boutique located at {siteConfig.address.street},{' '}
              {siteConfig.address.city}, {siteConfig.address.county}, Ireland. By using our website
              ({siteConfig.url}) or booking an appointment with us, you agree to these Terms &amp; Conditions.
            </p>
          </LegalSection>

          <LegalSection title="2. Appointments">
            <p className="mb-4">
              All appointments at REI Bridal are private and by booking only. When you request an
              appointment, you agree to the following:
            </p>
            <ul className="space-y-2 list-none pl-0">
              {[
                'Appointments are subject to availability and are confirmed only upon receipt of our confirmation email or call.',
                'We ask that you arrive promptly. Late arrivals may result in a shortened appointment out of respect for other clients.',
                'We recommend bringing no more than 2–3 guests to ensure the most relaxed experience.',
                'We reserve the right to refuse entry to guests who are disruptive to the boutique environment.',
                'Cancellations should be made with as much notice as possible. Please contact us at ' + siteConfig.email + ' or ' + siteConfig.phone + '.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-charcoal/60">
                  <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                  {item}
                </li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="3. Orders & Gown Purchases">
            <p className="mb-4">
              All gown orders are subject to separate written order agreements provided at the time of
              purchase. Generally:
            </p>
            <ul className="space-y-2 list-none pl-0">
              {[
                'A non-refundable deposit is required to place a gown order. The amount will be confirmed at the time of purchase.',
                'Gowns are made to order and are typically delivered within 4–6 months. Lead times are given in good faith and may vary by designer.',
                'Prices are confirmed in writing at the time of order. All prices are in Euro (€) and inclusive of VAT where applicable.',
                'REI Bridal acts as a retailer for the designers we stock. Specific designer terms may also apply.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-charcoal/60">
                  <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                  {item}
                </li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="4. Returns & Cancellations">
            <p>
              As gowns are made to order specifically for each client, we are unable to accept returns
              or offer refunds except in cases of manufacturing defects or where required by Irish
              consumer law. We will always work with you to resolve any issues with your gown.
              Please contact us as soon as possible if you have any concerns.
            </p>
          </LegalSection>

          <LegalSection title="5. Alterations">
            <p>
              Alteration services are available in-house and are quoted separately. Alterations begin
              only once the gown has arrived and a fitting appointment has been completed. REI Bridal
              is not responsible for alterations carried out by third parties.
            </p>
          </LegalSection>

          <LegalSection title="6. Website Use">
            <p className="mb-4">
              The content on this website, including text, images, and design, is the property of REI Bridal
              or our licensors and is protected by copyright. You may not reproduce, distribute, or use
              any content without our express written permission.
            </p>
            <p>
              We make every effort to ensure the information on this website is accurate and up to date,
              but we cannot guarantee this. Product images are for illustrative purposes and may differ
              slightly from the physical gown. Prices and availability are subject to change.
            </p>
          </LegalSection>

          <LegalSection title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by Irish law, REI Bridal shall not be liable for any
              indirect, incidental, or consequential damages arising from your use of this website or
              our services. Our liability for any direct loss shall not exceed the amount paid by you
              for the relevant service or product.
            </p>
          </LegalSection>

          <LegalSection title="8. Governing Law">
            <p>
              These Terms &amp; Conditions are governed by and construed in accordance with the laws
              of the Republic of Ireland. Any disputes shall be subject to the exclusive jurisdiction
              of the Irish courts.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to These Terms">
            <p>
              We reserve the right to update these Terms &amp; Conditions at any time. Changes will be
              posted on this page with an updated date. Continued use of our website or services
              constitutes acceptance of the revised terms.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact">
            <p>
              For any questions regarding these Terms, please contact us at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-champagne hover:text-champagne-dark transition-colors"
              >
                {siteConfig.email}
              </a>{' '}
              or by post to {siteConfig.address.street}, {siteConfig.address.city},{' '}
              {siteConfig.address.county}, Ireland.
            </p>
          </LegalSection>

          <div className="border-t border-ivory-deep pt-12 mt-12">
            <Link href="/" className="nav-link text-champagne hover:text-champagne-dark">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-serif text-2xl text-charcoal mb-4">{title}</h2>
      <div className="font-sans font-light text-charcoal/60 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
}
