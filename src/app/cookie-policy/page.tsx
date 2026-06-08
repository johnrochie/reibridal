import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cookie Policy | REI Bridal',
  description: 'Cookie Policy for REI Bridal — what cookies we use and how to manage them.',
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      name: 'Strictly Necessary',
      required: true,
      description:
        'These cookies are essential for the website to function and cannot be disabled. They include cookies that remember your cookie consent choice.',
      examples: 'rei-cookie-consent',
    },
    {
      name: 'Analytics',
      required: false,
      description:
        'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve the site.',
      examples: 'Google Analytics (_ga, _gid)',
    },
    {
      name: 'Marketing',
      required: false,
      description:
        'These cookies may be set through our site by social media services such as Instagram and Facebook to build a profile of your interests. We do not currently use active marketing cookies.',
      examples: 'None currently active',
    },
  ];

  return (
    <>
      <section className="pt-40 pb-16 px-6 lg:px-12 bg-charcoal">
        <div className="max-w-4xl mx-auto">
          <span className="section-label mb-4 block">Legal</span>
          <h1 className="section-title text-ivory">Cookie Policy</h1>
          <span className="block w-16 h-px bg-champagne mt-6" />
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-ivory">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-light text-charcoal/50 mb-12">
            Last updated: January 2025
          </p>

          <div className="mb-12">
            <h2 className="font-serif text-2xl text-charcoal mb-4">What Are Cookies?</h2>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed text-sm">
              Cookies are small text files placed on your device when you visit a website. They are widely
              used to make websites work, or to work more efficiently, and to provide information to
              website owners. This policy explains how REI Bridal uses cookies on{' '}
              <strong className="font-normal text-charcoal">{siteConfig.url}</strong>.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-2xl text-charcoal mb-6">Cookies We Use</h2>
            <div className="space-y-6">
              {cookieTypes.map((type) => (
                <div key={type.name} className="border border-ivory-deep p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl text-charcoal">{type.name}</h3>
                    <span className={`text-[10px] tracking-widest uppercase font-light px-3 py-1 ${
                      type.required
                        ? 'bg-charcoal text-ivory'
                        : 'bg-ivory-deep text-charcoal/50'
                    }`}>
                      {type.required ? 'Always Active' : 'Optional'}
                    </span>
                  </div>
                  <p className="font-sans font-light text-charcoal/60 text-sm leading-relaxed mb-3">
                    {type.description}
                  </p>
                  <p className="text-xs font-light text-charcoal/40">
                    <span className="text-champagne">Examples:</span> {type.examples}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-2xl text-charcoal mb-4">Managing Your Cookies</h2>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed text-sm mb-4">
              When you first visit our website, you will be shown a cookie banner allowing you to accept
              or decline non-essential cookies. You can change your preferences at any time by clearing
              your browser cookies and revisiting the site.
            </p>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed text-sm">
              You can also control cookies through your browser settings. Most browsers allow you to
              refuse cookies or delete existing ones. Please note that disabling cookies may affect
              the functionality of this website. For guidance on managing cookies in your browser, visit{' '}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne hover:text-champagne-dark transition-colors"
              >
                aboutcookies.org
              </a>.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-2xl text-charcoal mb-4">Third-Party Cookies</h2>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed text-sm">
              Some of our pages may include content from third-party services (such as embedded social
              media or booking widgets). These services may set their own cookies, which are subject to
              their respective privacy policies. We have no control over these cookies.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-2xl text-charcoal mb-4">Contact Us</h2>
            <p className="font-sans font-light text-charcoal/60 leading-relaxed text-sm">
              If you have any questions about our use of cookies, please contact us at{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-champagne hover:text-champagne-dark transition-colors"
              >
                {siteConfig.email}
              </a>. For more information about how we handle your personal data, please read our{' '}
              <Link href="/privacy-policy" className="text-champagne hover:text-champagne-dark transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </div>

          <div className="border-t border-ivory-deep pt-12">
            <Link href="/" className="nav-link text-champagne hover:text-champagne-dark">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
