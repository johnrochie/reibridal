import type { DesignerRecord, GownRecord } from './types';
import { CONFIRMED_DESIGNER_STORIES } from './designer-stories';
import { missing, verified } from './status';
import type { MediaRef } from '@/lib/media/types';

function localPhoto(key: string, alt: string): MediaRef {
  return { provider: 'local', key, alt };
}

/**
 * Phase 1 sample only.
 *
 * These records reuse photography already published on the site as catalogue
 * images. Associations are curator-authored (not ingest guesses). Factual
 * fields stay empty rather than inventing collection, fabric, price, or
 * silhouette. Names remain needs-review until the client confirms them.
 */
export const localDesigners: DesignerRecord[] = [
  {
    id: 'designer.jane-aston',
    slug: 'jane-aston',
    name: verified('Jane Aston', 'confirmed'),
    country: missing(),
    shortBio: missing(),
    description: verified(CONFIRMED_DESIGNER_STORIES['jane-aston'], 'confirmed'),
    portrait: null,
    cover: null,
    website: null,
    featured: false,
    order: 10,
  },
  {
    id: 'designer.anna-kara',
    slug: 'anna-kara',
    name: verified('Anna Kara', 'confirmed'),
    country: missing(),
    shortBio: missing(),
    description: verified(CONFIRMED_DESIGNER_STORIES['anna-kara'], 'confirmed'),
    portrait: null,
    cover: null,
    website: null,
    featured: false,
    order: 20,
  },
  {
    id: 'designer.truvelle',
    slug: 'truvelle',
    name: verified('Truvelle', 'confirmed'),
    country: missing(),
    shortBio: missing(),
    description: verified(CONFIRMED_DESIGNER_STORIES.truvelle, 'confirmed'),
    portrait: null,
    cover: null,
    website: null,
    featured: false,
    order: 30,
  },
  {
    id: 'designer.caroline-takvorian',
    slug: 'caroline-takvorian',
    name: verified('Caroline Takvorian', 'confirmed'),
    country: missing(),
    shortBio: missing(),
    description: verified(CONFIRMED_DESIGNER_STORIES['caroline-takvorian'], 'confirmed'),
    portrait: null,
    cover: null,
    website: null,
    featured: false,
    order: 40,
  },
];

const janeAston = {
  id: 'designer.jane-aston',
  slug: 'jane-aston',
  name: 'Jane Aston',
};

const annaKara = {
  id: 'designer.anna-kara',
  slug: 'anna-kara',
  name: 'Anna Kara',
};

const truvelle = {
  id: 'designer.truvelle',
  slug: 'truvelle',
  name: 'Truvelle',
};

interface SampleGownOptions {
  sizes?: string[];
}

function sampleGown(
  designer: { id: string; slug: string; name: string },
  slug: string,
  name: string,
  styleCode: string | null,
  imageKeys: string[],
  options: SampleGownOptions = {}
): GownRecord {
  return {
    id: `gown.${slug}`,
    slug,
    name: verified(name, 'needs-review'),
    designer,
    category: missing(),
    styleCode: styleCode ? verified(styleCode, 'needs-review') : missing(),
    sizes: options.sizes ? verified(options.sizes, 'confirmed') : missing(),
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
  sampleGown(janeAston, 'evie-ja138', 'Evie', 'JA138', ['gowns/evie-ja138.jpg']),
  sampleGown(janeAston, 'gracie-ja171', 'Gracie', 'JA171', ['gowns/gracie-ja171.jpg']),
  sampleGown(janeAston, 'harriet-ja117', 'Harriet', 'JA117', ['gowns/harriet-ja117.jpg']),
  sampleGown(janeAston, 'farrah-ja163', 'Farrah', 'JA163', ['gowns/farrah-ja163.jpg']),
  sampleGown(janeAston, 'jules-ja192', 'Jules', 'JA192', ['gowns/jules-ja192-8.jpg', 'gowns/jules-ja192-2.jpg']),
  sampleGown(janeAston, 'luise-ja204', 'Luise', 'JA204', ['gowns/luise-ja204.jpg']),
  sampleGown(janeAston, 'emily-ja101', 'Emily', 'JA101', ['gowns/emily-ja101.jpg']),
  sampleGown(janeAston, 'margo-ja184', 'Margo', 'JA184', ['gowns/margo-ja184.jpg']),
  sampleGown(janeAston, 'carmel-ja122', 'Carmel', 'JA122', ['gowns/carmel-ja122.jpg']),
  sampleGown(janeAston, 'marnie-ja200', 'Marnie', 'JA200', ['gowns/marnie-ja200.jpg']),
  sampleGown(janeAston, 'willow-jap119', 'Willow', 'JAP119', ['gowns/willow-jap119.jpg']),

  // Truvelle — only styles that are both in the boutique's stock order and photographed.
  sampleGown(truvelle, 'cindy-truvelle', 'Cindy', null, [
    'gowns/cindy-truvelle-1.jpg',
    'gowns/cindy-truvelle-2.jpg',
    'gowns/cindy-truvelle-3.jpg',
    'gowns/cindy-truvelle-4.jpg',
    'gowns/cindy-truvelle-5.jpg',
  ], { sizes: ['UK 14'] }),
  sampleGown(truvelle, 'sarah-truvelle', 'Sarah', null, [
    'gowns/sarah-truvelle-1.jpg',
    'gowns/sarah-truvelle-2.jpg',
    'gowns/sarah-truvelle-3.jpg',
    'gowns/sarah-truvelle-4.jpg',
    'gowns/sarah-truvelle-5.jpg',
  ], { sizes: ['UK 12'] }),
  sampleGown(truvelle, 'lumi-truvelle', 'Lumi', null, [
    'gowns/lumi-truvelle-1.jpg',
    'gowns/lumi-truvelle-2.jpg',
    'gowns/lumi-truvelle-3.jpg',
    'gowns/lumi-truvelle-4.jpg',
    'gowns/lumi-truvelle-5.jpg',
  ], { sizes: ['UK 14'] }),
  sampleGown(truvelle, 'june-truvelle', 'June', null, [
    'gowns/june-truvelle-1.jpg',
    'gowns/june-truvelle-2.jpg',
    'gowns/june-truvelle-3.jpg',
    'gowns/june-truvelle-4.jpg',
    'gowns/june-truvelle-5.jpg',
  ], { sizes: ['UK 18'] }),

  // Anna Kara — only styles ordered from the 2027 Sommeil collection.
  // Sizes noted in stock records are bare numbers with no confirmed sizing
  // system (EU vs UK), so left unpublished rather than guessed.
  sampleGown(annaKara, 'alessia-anna-kara', 'Alessia', null, [
    'gowns/alessia-anna-kara-1.jpg',
    'gowns/alessia-anna-kara-2.jpg',
    'gowns/alessia-anna-kara-3.jpg',
    'gowns/alessia-anna-kara-4.jpg',
    'gowns/alessia-anna-kara-5.jpg',
  ]),
  sampleGown(annaKara, 'aveline-anna-kara', 'Aveline', null, [
    'gowns/aveline-anna-kara-1.jpg',
    'gowns/aveline-anna-kara-2.jpg',
    'gowns/aveline-anna-kara-3.jpg',
  ]),
  sampleGown(annaKara, 'liora-anna-kara', 'Liora', null, [
    'gowns/liora-anna-kara-1.jpg',
    'gowns/liora-anna-kara-2.jpg',
    'gowns/liora-anna-kara-3.jpg',
    'gowns/liora-anna-kara-4.jpg',
    'gowns/liora-anna-kara-5.jpg',
  ]),
  sampleGown(annaKara, 'melissa-anna-kara', 'Melissa', null, [
    'gowns/melissa-anna-kara-1.jpg',
    'gowns/melissa-anna-kara-2.jpg',
    'gowns/melissa-anna-kara-3.jpg',
    'gowns/melissa-anna-kara-4.jpg',
    'gowns/melissa-anna-kara-5.jpg',
    'gowns/melissa-anna-kara-6.jpg',
  ]),
  sampleGown(annaKara, 'shira-anna-kara', 'Shira', null, [
    'gowns/shira-anna-kara-1.jpg',
    'gowns/shira-anna-kara-2.jpg',
    'gowns/shira-anna-kara-3.jpg',
  ]),
  sampleGown(annaKara, 'evora-anna-kara', 'Evora', null, [
    'gowns/evora-anna-kara-1.jpg',
    'gowns/evora-anna-kara-2.jpg',
    'gowns/evora-anna-kara-3.jpg',
  ]),
];
