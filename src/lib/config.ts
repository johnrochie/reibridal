export const siteConfig = {
  name: 'REI Bridal',
  tagline: 'Luxury Bridal Boutique, Killorglin, Co. Kerry',
  description:
    'REI Bridal is a luxury bridal boutique in Killorglin, Co. Kerry. Book a private appointment to view the collection.',
  url: 'https://www.reibridal.ie',
  email: 'hello@reibridal.ie',
  /** Leave blank until confirmed — empty values are hidden on the site and in structured data. */
  phone: '',
  address: {
    street: 'Upper Bridge Street',
    city: 'Killorglin',
    county: 'Co. Kerry',
    country: 'Ireland',
    /** Eircode — leave blank until confirmed. */
    postcode: '',
  },
  /** Map coordinates for structured data — set once the exact shopfront location is confirmed. */
  geo: null as { lat: number; lng: number } | null,
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
  appointmentUrl: '/booking',
  /**
   * Working title for the experience page. Change here — Header and Footer read this.
   * Do not hardcode the label in components.
   */
  experienceNavLabel: 'Experience',
};

export const TBD_COPY = {
  brandStory: 'Brand story to be confirmed.',
  section: 'Content to be confirmed.',
  pageIntro: 'This page is being prepared. Details will appear once they are confirmed.',
};

export function getMainNav() {
  return [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: siteConfig.experienceNavLabel, href: '/experience' },
    { label: 'Designers', href: '/designers' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Booking Form', href: '/booking' },
  ];
}

export const defaultMeta = {
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@reibridal',
  },
};
