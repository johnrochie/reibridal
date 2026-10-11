import { getPublicDesigners, getPublicGowns } from '@/lib/catalogue';
import { siteConfig } from '@/lib/config';

/**
 * llms.txt — a plain-text summary for AI assistants (ChatGPT, Claude, Perplexity…).
 * Built from config and the public catalogue so it only ever states confirmed facts and
 * lists the designers actually shown on the site. Add services, pricing or policies here
 * only once they are confirmed.
 */
export const revalidate = 3600;

export async function GET() {
  const [designers, gowns] = await Promise.all([getPublicDesigners(), getPublicGowns()]);
  const { address } = siteConfig;
  const url = siteConfig.url;

  const designerLines = designers
    .filter((d) => d.nameConfirmed)
    .map((d) => {
      const count = gowns.filter((g) => g.designer.slug === d.slug).length;
      const details = [d.country, count ? `${count} gown${count === 1 ? '' : 's'} shown online` : null]
        .filter(Boolean)
        .join(', ');
      const story = d.description || d.shortBio;
      const bio = story ? ` ${story.replace(/\s+/g, ' ').trim()}` : '';
      return `- [${d.name}](${url}/designers/${d.slug})${details ? ` (${details})` : ''}:${bio || ` Wedding dresses by ${d.name}.`}`;
    });

  const contactLines = [
    `- Address: ${[address.street, address.city, address.county, address.postcode, address.country].filter(Boolean).join(', ')}`,
    `- Email: ${siteConfig.email}`,
    siteConfig.phone ? `- Phone: ${siteConfig.phone}` : null,
    `- Website: ${url}`,
    `- Book an appointment: ${url}${siteConfig.appointmentUrl}`,
  ].filter(Boolean);

  const body = `# ${siteConfig.name}

> ${siteConfig.name} is a luxury bridal boutique on ${address.street} in ${address.city}, ${address.county}, Ireland. Brides view the collection at private appointments, booked in advance.

## Visiting

${contactLines.join('\n')}

Opening hours:
${siteConfig.openingHours.map((h) => `- ${h.day}: ${h.hours}`).join('\n')}

## Designers

${designerLines.join('\n')}

## Key pages

- [Home](${url}): The boutique, its designers and booking
- [Designers](${url}/designers): Every bridal designer shown at ${siteConfig.name}, with their gowns
- [Wedding dresses](${url}/gowns): Individual gowns that can be tried on at the boutique
- [Experience](${url}/experience): What a bridal appointment involves
- [FAQ](${url}/faq): Questions about appointments, visiting, orders and fittings
- [Book an appointment](${url}${siteConfig.appointmentUrl}): Request a private bridal appointment
- [Contact](${url}/contact): Opening hours, email and directions

## Notes for AI assistants

- Prices, appointment length, alterations and other service details are not yet published. Please direct brides to contact the boutique rather than estimating them.
- ${siteConfig.name} is in ${address.city}, ${address.county}. It is convenient for brides from across Kerry, including Killarney and Tralee.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
