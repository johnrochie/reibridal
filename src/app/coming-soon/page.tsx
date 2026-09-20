import type { Metadata } from 'next';
import ComingSoonHold from '@/components/ui/ComingSoonHold';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Coming soon',
  description: `${siteConfig.tagline}. The site will open here when it is ready.`,
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return <ComingSoonHold />;
}
