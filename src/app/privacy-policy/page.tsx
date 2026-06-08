import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy | REI Bridal',
  description: 'Privacy Policy for REI Bridal — how we collect, use, and protect your personal data in accordance with GDPR.',
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <span className="section-label mb-4 block">Legal</span>
          <h1 className="section-title text-ivory">Privacy Policy</h1>
          <span className="block w-16 h-px bg-champagne mt-6" />
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-ivory">
        <div className="max-w-4xl mx-auto prose-legal">
          <p className="text-sm font-light text-charcoal/50 mb-12">
            Last updated: January 2025
          </p>

          <LegalSection title="1. Who We Are">
            <p>
              REI Bridal (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a luxury bridal boutique located at{' '}
              {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.county}, Ireland.
              We are the data controller responsible for your personal information.
            </p>
            <p className="mt-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-champagne hover:text-champagne-dark transition-colors">
                {siteConfig.email}
              </a>.
            </p>
          </LegalSection>

          <LegalSection title="2. What Data We Collect">
            <p>We may collect the following personal data when you interact with our website or contact us:</p>
            <ul className="mt-4 space-y-2 list-none pl-0">
              {[
                'Name and contact details (email address, phone number)',
                'Wedding date and appointment preferences',
                'Messages and enquiries you send us',
                'Technical data such as IP address, browser type, and pages visited (via analytics)',
                'Cookie preferences',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-charcoal/60">
                  <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                  {item}
                </li>
              ))}
            </ul>
          </LegalSection>

          <LegalSection title="3. How We Use Your Data">
            <p>We use your personal data to:</p>
            <ul className="mt-4 space-y-2 list-none pl-0">
              {[
                'Respond to appointment requests and enquiries',
                'Manage your bridal appointment and provide our services',
                'Send you information you have requested about our collections',
                'Improve our website and services through analytics',
                'Comply with legal obligations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-charcoal/60">
                  <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              Our legal basis for processing is: <strong className="font-normal text-charcoal">contract performance</strong> (to fulfil your appointment),{' '}
              <strong className="font-normal text-charcoal">legitimate interests</strong> (to improve our services), and{' '}
              <strong className="font-normal text-charcoal">consent</strong> (for marketing communications and analytics cookies).
            </p>
          </LegalSection>

          <LegalSection title="4. How We Share Your Data">
            <p>
              We do not sell your personal data. We may share it with trusted third-party service providers
              who help us operate our business (such as appointment scheduling platforms, email services, and
              website hosting), and only to the extent necessary to provide those services. All processors
              are contractually required to handle your data securely and in accordance with GDPR.
            </p>
          </LegalSection>

          <LegalSection title="5. How Long We Keep Your Data">
            <p>
              We retain your personal data for as long as is necessary to fulfil the purposes described in
              this policy, or as required by law. Appointment enquiries are typically retained for 2 years
              after your wedding date. You may request deletion at any time.
            </p>
          </LegalSection>

          <LegalSection title="6. Your Rights">
            <p>Under GDPR, you have the right to:</p>
            <ul className="mt-4 space-y-2 list-none pl-0">
              {[
                'Access the personal data we hold about you',
                'Correct inaccurate data',
                'Request erasure of your data ("right to be forgotten")',
                'Object to or restrict processing of your data',
                'Data portability (receive your data in a structured, machine-readable format)',
                'Withdraw consent at any time where consent is the legal basis',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-light text-charcoal/60">
                  <span className="w-3 h-px bg-champagne mt-2.5 flex-shrink-0 block" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              To exercise any of these rights, contact us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-champagne hover:text-champagne-dark transition-colors">
                {siteConfig.email}
              </a>. You also have the right to lodge a complaint with the{' '}
              <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer" className="text-champagne hover:text-champagne-dark transition-colors">
                Data Protection Commission of Ireland
              </a>.
            </p>
          </LegalSection>

          <LegalSection title="7. Cookies">
            <p>
              We use cookies to enhance your experience and analyse website traffic. For full details, please
              read our{' '}
              <Link href="/cookie-policy" className="text-champagne hover:text-champagne-dark transition-colors">
                Cookie Policy
              </Link>.
            </p>
          </LegalSection>

          <LegalSection title="8. Security">
            <p>
              We implement appropriate technical and organisational measures to protect your personal data
              against unauthorised access, loss, or destruction. Our website is served over HTTPS.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes
              by updating the date at the top of this page. Continued use of our website following any changes
              constitutes acceptance of the updated policy.
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
