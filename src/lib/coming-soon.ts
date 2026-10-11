import { siteConfig } from './config';

const FLAG_ON = new Set(['1', 'true', 'yes', 'on']);
const FLAG_OFF = new Set(['0', 'false', 'no', 'off']);

/**
 * Site-wide coming-soon hold.
 *
 * - COMING_SOON=true (or 1/on/yes) forces the hold in every environment.
 * - COMING_SOON=false (or 0/off/no) forces the full site, including production.
 * - Unset: hold on the production/final domain and on Vercel Production
 *   deployments. Preview and localhost keep the working site.
 */
export function parseComingSoonFlag(value: string | undefined | null): boolean | null {
  if (value == null || value.trim() === '') return null;
  const normalized = value.trim().toLowerCase();
  if (FLAG_ON.has(normalized)) return true;
  if (FLAG_OFF.has(normalized)) return false;
  return null;
}

export function hostnameFromHostHeader(host: string | null | undefined): string {
  if (!host) return '';
  return host.split(',')[0].trim().replace(/:\d+$/, '').toLowerCase();
}

export function productionHosts(siteUrl: string = siteConfig.url): string[] {
  try {
    const host = new URL(siteUrl).hostname.toLowerCase();
    const bare = host.replace(/^www\./, '');
    return Array.from(new Set([host, bare, `www.${bare}`]));
  } catch {
    return ['www.reibridal.ie', 'reibridal.ie'];
  }
}

export function isProductionHost(host: string | null | undefined, siteUrl?: string): boolean {
  const hosts = (host ?? '')
    .split(',')
    .map((value) => hostnameFromHostHeader(value))
    .filter(Boolean);
  const allowed = productionHosts(siteUrl);
  return hosts.some((hostname) => allowed.includes(hostname));
}

export function isComingSoonHold({
  flag = process.env.COMING_SOON,
  host,
  vercelEnv = process.env.VERCEL_ENV,
}: {
  flag?: string | null;
  host: string | null | undefined;
  vercelEnv?: string | null;
}): boolean {
  const parsed = parseComingSoonFlag(flag);
  if (parsed === false) return false;
  if (parsed === true) return true;
  if (vercelEnv === 'production') return true;
  return isProductionHost(host);
}
