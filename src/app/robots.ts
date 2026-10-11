import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Don't block /_next/: search engines need the CSS and JS to render pages.
const disallow = ['/api/', '/studio/'];

// AI search and assistant crawlers, allowed explicitly so the boutique can be cited in AI answers.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: aiCrawlers, allow: '/', disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
