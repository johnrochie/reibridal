import { siteConfig } from '@/lib/config';

/**
 * Sitewide structured data: the boutique as a local business, plus the website entity.
 * Only confirmed values are emitted — blank config fields (phone, postcode, geo) are omitted
 * rather than published as placeholders.
 */
export function LocalBusinessSchema() {
  const { address } = siteConfig;
  const boutiqueId = `${siteConfig.url}/#boutique`;

  const boutique = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': boutiqueId,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    logo: `${siteConfig.url}/icon.png`,
    image: `${siteConfig.url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.county,
      ...(address.postcode ? { postalCode: address.postcode } : {}),
      addressCountry: 'IE',
    },
    ...(siteConfig.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng } }
      : {}),
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(
      `${siteConfig.name}, ${address.street}, ${address.city}, Ireland`
    )}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'en-IE',
    publisher: { '@id': boutiqueId },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(boutique) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
