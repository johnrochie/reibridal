import type { DesignerRecord, GownRecord } from './types';
import { missing, verified } from './status';
import type { MediaRef } from '@/lib/media/types';

function localPhoto(key: string, alt: string): MediaRef {
  return { provider: 'local', key, alt };
}

/**
 * Phase 1 sample only.
 *
 * These records reuse photography already published on the site as Jane Aston
 * catalogue images. Associations are curator-authored (not ingest guesses).
 * Factual fields stay empty rather than inventing collection, fabric, price,
 * or silhouette. Names remain needs-review until the client confirms them.
 */
export const localDesigners: DesignerRecord[] = [
  {
    id: 'designer.jane-aston',
    slug: 'jane-aston',
    name: verified('Jane Aston', 'confirmed'),
    country: missing(),
    shortBio: missing(),
    description: missing(),
    portrait: null,
    cover: null,
    website: null,
    featured: false,
    order: 10,
  },
];

const janeAston = {
  id: 'designer.jane-aston',
  slug: 'jane-aston',
  name: 'Jane Aston',
};

function sampleGown(
  slug: string,
  name: string,
  styleCode: string | null,
  imageKeys: string[]
): GownRecord {
  return {
    id: `gown.${slug}`,
    slug,
    name: verified(name, 'needs-review'),
    designer: janeAston,
    category: missing(),
    styleCode: styleCode ? verified(styleCode, 'needs-review') : missing(),
    sizes: missing(),
    silhouette: missing(),
    style: missing(),
    fabric: missing(),
    price: missing(),
    availability: missing(),
    description: missing(),
    images: imageKeys.map((key, index) => ({
      id: `${slug}-${index + 1}`,
      type: null,
      matchConfidence: null,
      media: localPhoto(key, `${name} — photography at REI Bridal`),
    })),
    featured: false,
    isNew: false,
    listed: true,
  };
}

export const localGowns: GownRecord[] = [
  sampleGown('evie-ja138', 'Evie', 'JA138', ['gowns/evie-ja138.jpg']),
  sampleGown('gracie-ja171', 'Gracie', 'JA171', ['gowns/gracie-ja171.jpg']),
  sampleGown('harriet-ja117', 'Harriet', 'JA117', ['gowns/harriet-ja117.jpg']),
  sampleGown('farrah-ja163', 'Farrah', 'JA163', ['gowns/farrah-ja163.jpg']),
  sampleGown('jules-ja192', 'Jules', 'JA192', ['gowns/jules-ja192-8.jpg', 'gowns/jules-ja192-2.jpg']),
  sampleGown('luise-ja204', 'Luise', 'JA204', ['gowns/luise-ja204.jpg']),
  sampleGown('emily-ja101', 'Emily', 'JA101', ['gowns/emily-ja101.jpg']),
  sampleGown('margo-ja184', 'Margo', 'JA184', ['gowns/margo-ja184.jpg']),
  sampleGown('carmel-ja122', 'Carmel', 'JA122', ['gowns/carmel-ja122.jpg']),
  sampleGown('marnie-ja200', 'Marnie', 'JA200', ['gowns/marnie-ja200.jpg']),
  sampleGown('willow-jap119', 'Willow', 'JAP119', ['gowns/willow-jap119.jpg']),
];
