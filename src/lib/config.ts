export const siteConfig = {
  name: 'REI Bridal',
  tagline: 'Where Every Love Story Begins',
  description:
    'REI Bridal is a luxury bridal boutique offering an exquisite collection of wedding gowns, bridesmaid dresses, and bridal accessories. Book your private appointment today.',
  url: 'https://www.reibridal.ie',
  email: 'hello@reibridal.ie',
  phone: '+353 XX XXX XXXX',
  address: {
    street: '1 Bridal Lane',
    city: 'Kerry',
    county: 'Co. Kerry',
    country: 'Ireland',
    postcode: 'V93 XXXX',
  },
  social: {
    instagram: 'https://www.instagram.com/reibridal',
    facebook: 'https://www.facebook.com/reibridal',
    pinterest: 'https://www.pinterest.ie/reibridal',
  },
  openingHours: [
    { day: 'Tuesday – Friday', hours: '10:00 – 18:00' },
    { day: 'Saturday', hours: '09:00 – 17:00' },
    { day: 'Sunday & Monday', hours: 'By Appointment' },
  ],
  appointmentUrl: '/appointments', // Replace with Calendly or booking URL
};

export const defaultMeta = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'REI Bridal — Luxury Bridal Boutique Kerry, Ireland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@reibridal',
  },
};
