// ============================================================
// REI BRIDAL — EDITABLE CONTENT DATA
// Update this file to change products, designers, and gallery
// ============================================================

export interface Gown {
  id: string;
  name: string;
  designer: string;
  category: 'wedding' | 'bridesmaid' | 'occasion';
  price?: string;
  priceRange?: string;
  description: string;
  features: string[];
  image: string;
  images?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  available: boolean;
}

export interface Designer {
  id: string;
  name: string;
  country: string;
  description: string;
  shortBio: string;
  image: string;
  coverImage: string;
  website?: string;
  featured: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'bride' | 'detail' | 'ceremony' | 'portrait' | 'editorial';
  width: number;
  height: number;
  caption?: string;
}

// ---------------------------------------------------------------
// DESIGNERS — Add / remove / edit as your designer lineup changes
// ---------------------------------------------------------------
export const designers: Designer[] = [
  {
    id: 'sarah-seven',
    name: 'Sarah Seven',
    country: 'USA',
    shortBio: 'Romantic, ethereal gowns for the modern bride.',
    description:
      'Sarah Seven creates romantically bohemian bridal gowns with a distinctly editorial edge. Each piece is crafted in San Francisco using the finest silk charmeuse, crepe de chine, and French lace.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=1200&q=80',
    featured: true,
  },
  {
    id: 'flora-and-lane',
    name: 'Flora & Lane',
    country: 'Australia',
    shortBio: 'Understated luxury for the quietly confident bride.',
    description:
      'Flora & Lane from Melbourne is celebrated for clean silhouettes with extraordinary fabric choices. Their collections are defined by exceptional construction and a purity of design that resonates with discerning brides worldwide.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    featured: true,
  },
  {
    id: 'anne-barge',
    name: 'Anne Barge',
    country: 'USA',
    shortBio: 'Timeless elegance with a contemporary sensibility.',
    description:
      'Anne Barge has been designing for brides since 1969. Each gown is a study in refined elegance — architectural cuts balanced with softness, creating silhouettes that are at once classic and thoroughly modern.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
    featured: true,
  },
  {
    id: 'rime-arodaky',
    name: 'Rime Arodaky',
    country: 'France',
    shortBio: 'Parisian cool meets bridal perfection.',
    description:
      'Rime Arodaky brings a distinctly Parisian sensibility to bridal fashion. Her designs are for the bride who wants to feel undeniably herself — cool, confident, and effortlessly romantic.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    featured: false,
  },
  {
    id: 'halfpenny-london',
    name: 'Halfpenny London',
    country: 'UK',
    shortBio: 'Quintessentially British. Gloriously romantic.',
    description:
      'Kate Halfpenny has been dressing London brides since 2000, earning a devoted following with her signature mix of delicate detailing, luxurious silk separates, and distinctive bridal separates.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
    featured: false,
  },
];

// ---------------------------------------------------------------
// GOWNS — Edit to match your current stock
// ---------------------------------------------------------------
export const gowns: Gown[] = [
  {
    id: 'elara',
    name: 'Elara',
    designer: 'Sarah Seven',
    category: 'wedding',
    priceRange: 'POA',
    description:
      'A flowing silk charmeuse gown with a deeply draped cowl back and long train. Effortlessly romantic for the modern minimalist bride.',
    features: ['Silk charmeuse', 'Cowl back', 'Cathedral train', 'Bespoke sizing available'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=800&q=80',
    isNew: true,
    isFeatured: true,
    available: true,
  },
  {
    id: 'celeste',
    name: 'Celeste',
    designer: 'Flora & Lane',
    category: 'wedding',
    priceRange: 'POA',
    description:
      'A structured crepe column gown with a statement off-shoulder neckline. The epitome of understated luxury.',
    features: ['Italian crepe', 'Off-shoulder', 'Fitted silhouette', 'Button back'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    isFeatured: true,
    available: true,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    designer: 'Anne Barge',
    category: 'wedding',
    priceRange: 'POA',
    description:
      'Layers of French Chantilly lace over silk organza create an A-line silhouette of ethereal romance.',
    features: ['French Chantilly lace', 'Silk organza', 'A-line', 'Chapel train'],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    isFeatured: true,
    available: true,
  },
  {
    id: 'margot',
    name: 'Margot',
    designer: 'Rime Arodaky',
    category: 'wedding',
    priceRange: 'POA',
    description:
      'A Parisian-inspired tailored suit with wide-leg trousers and an exquisitely crafted cropped jacket, finished with hand-stitched floral appliqué.',
    features: ['Tailored fit', 'Wide-leg trousers', 'Floral appliqué', 'French construction'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    isNew: true,
    available: true,
  },
  {
    id: 'isla',
    name: 'Isla',
    designer: 'Halfpenny London',
    category: 'wedding',
    priceRange: 'POA',
    description:
      'A delicate slip dress in ivory silk charmeuse, layered under a dramatic floral tulle coat. Designed to be worn together or apart.',
    features: ['Silk charmeuse slip', 'Tulle coat', 'Two-piece', 'Ivory & blush'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    available: true,
  },
  {
    id: 'grace',
    name: 'Grace',
    designer: 'Flora & Lane',
    category: 'bridesmaid',
    priceRange: 'From €280',
    description:
      'A versatile crepe bridesmaid gown available in 12 colour ways. The ruched skirt and adjustable wrap bodice make it ideal for every figure.',
    features: ['Stretch crepe', '12 colours', 'Wrap bodice', 'Adjustable'],
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
    available: true,
  },
];

// ---------------------------------------------------------------
// GALLERY — Update src with your actual photography
// ---------------------------------------------------------------
export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=900&q=80',
    alt: 'Bride in flowing silk gown',
    category: 'bride',
    width: 900,
    height: 1200,
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
    alt: 'Bridal portrait in garden',
    category: 'portrait',
    width: 900,
    height: 1200,
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80',
    alt: 'Lace detail on wedding dress',
    category: 'detail',
    width: 900,
    height: 1200,
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80',
    alt: 'Wedding ceremony moment',
    category: 'ceremony',
    width: 1200,
    height: 800,
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80',
    alt: 'Bridesmaids in matching gowns',
    category: 'bride',
    width: 900,
    height: 1200,
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
    alt: 'Elegant bridal editorial',
    category: 'editorial',
    width: 900,
    height: 1200,
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80',
    alt: 'Veil and bouquet detail',
    category: 'detail',
    width: 900,
    height: 1200,
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80',
    alt: 'Bride walking in natural light',
    category: 'portrait',
    width: 900,
    height: 1200,
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
    alt: 'Just married couple',
    category: 'ceremony',
    width: 1200,
    height: 800,
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
    alt: 'Bridal fashion editorial',
    category: 'editorial',
    width: 900,
    height: 1200,
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?w=900&q=80',
    alt: 'Wedding dress back detail',
    category: 'detail',
    width: 900,
    height: 1200,
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1549417229-aa67d3263049?w=900&q=80',
    alt: 'Bride in boutique',
    category: 'bride',
    width: 900,
    height: 1200,
  },
];

// ---------------------------------------------------------------
// REAL BRIDES — Update with actual client photography
// ---------------------------------------------------------------
export interface RealBride {
  id: string;
  brideName: string;
  partnerName?: string;
  weddingDate: string;
  location: string;
  gownName?: string;
  designerName?: string;
  quote?: string;
  image: string;
  images?: string[];
  featured?: boolean;
}

export const realBrides: RealBride[] = [
  {
    id: 'emma-michael-2024',
    brideName: 'Emma',
    partnerName: 'Michael',
    weddingDate: 'September 2024',
    location: 'Killarney, Kerry',
    gownName: 'Elara',
    designerName: 'Sarah Seven',
    quote:
      'Walking into REI Bridal was like stepping into a dream. I said yes to the most beautiful gown I have ever seen.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=900&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=80',
    ],
    featured: true,
  },
  {
    id: 'aoife-ciaran-2024',
    brideName: 'Aoife',
    partnerName: 'Ciarán',
    weddingDate: 'June 2024',
    location: 'Cork, Ireland',
    gownName: 'Celeste',
    designerName: 'Flora & Lane',
    quote:
      'From the first appointment to the final fitting, REI Bridal exceeded every expectation.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80',
    featured: true,
  },
  {
    id: 'sophie-james-2024',
    brideName: 'Sophie',
    partnerName: 'James',
    weddingDate: 'August 2024',
    location: 'Dublin, Ireland',
    gownName: 'Aurora',
    designerName: 'Anne Barge',
    quote:
      'I visited several boutiques before REI Bridal, and nothing compared. I felt like the most important person in the world.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80',
    featured: true,
  },
  {
    id: 'niamh-patrick-2024',
    brideName: 'Niamh',
    partnerName: 'Patrick',
    weddingDate: 'May 2024',
    location: 'Kenmare, Kerry',
    designerName: 'Halfpenny London',
    quote: 'The team made every moment feel effortless and completely ours.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80',
  },
  {
    id: 'sarah-david-2023',
    brideName: 'Sarah',
    partnerName: 'David',
    weddingDate: 'October 2023',
    location: 'Dingle, Kerry',
    gownName: 'Margot',
    designerName: 'Rime Arodaky',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80',
  },
  {
    id: 'claire-tom-2023',
    brideName: 'Claire',
    partnerName: 'Tom',
    weddingDate: 'July 2023',
    location: 'Tralee, Kerry',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=80',
  },
];

// ---------------------------------------------------------------
// TESTIMONIALS — Update with real client reviews
// ---------------------------------------------------------------
export const testimonials = [
  {
    id: '1',
    name: 'Emma & Michael',
    date: 'September 2024',
    text: 'Walking into REI Bridal was like stepping into a dream. The team made me feel utterly at ease, and finding my dress was an experience I will treasure forever. I said yes to the most beautiful gown I have ever seen.',
    location: 'Kerry, Ireland',
  },
  {
    id: '2',
    name: 'Aoife & Ciarán',
    date: 'June 2024',
    text: 'From the first appointment to the final fitting, REI Bridal exceeded every expectation. The attention to detail and genuine care for finding the perfect dress made all the difference.',
    location: 'Cork, Ireland',
  },
  {
    id: '3',
    name: 'Sophie & James',
    date: 'August 2024',
    text: 'I visited several boutiques before REI Bridal, and nothing compared. The curation of designers is exceptional, the space is beautiful, and I felt like the most important person in the world.',
    location: 'Dublin, Ireland',
  },
];
