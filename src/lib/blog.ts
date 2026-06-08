// ============================================================
// REI BRIDAL — BLOG POSTS
// Add new posts to the array. Slugs must be unique.
// ============================================================

export interface BlogBlock {
  type: 'p' | 'h2' | 'h3' | 'ul' | 'blockquote';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: BlogBlock[];
  publishedAt: string; // ISO date string
  author: string;
  category: 'advice' | 'designers' | 'inspiration' | 'appointments';
  image: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'when-to-start-looking-for-your-wedding-dress',
    title: 'When Should You Start Looking for Your Wedding Dress?',
    excerpt:
      'One of the most common questions we hear at REI Bridal. The honest answer might surprise you — most brides leave it too late. Here is everything you need to know about timing.',
    publishedAt: '2025-01-15',
    author: 'The REI Bridal Team',
    category: 'advice',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b2399?w=1200&q=80',
    tags: ['wedding planning', 'bridal advice', 'appointments', 'Kerry'],
    featured: true,
    content: [
      {
        type: 'p',
        text: 'It is one of the first questions every newly engaged bride asks — and one of the most important. The timing of your wedding dress search can make all the difference between a relaxed, joyful experience and a stressful race against the clock.',
      },
      {
        type: 'h2',
        text: 'The Short Answer: 12–18 Months Before Your Wedding',
      },
      {
        type: 'p',
        text: 'For most brides, we recommend beginning your dress search 12 to 18 months before your wedding date. We know that might sound early — but when you break down the timeline, it makes perfect sense.',
      },
      {
        type: 'h2',
        text: 'Understanding the Wedding Dress Timeline',
      },
      {
        type: 'p',
        text: 'Most luxury and designer wedding gowns are not kept in stock — they are made to order, specifically for you. This means that once you say yes to your dress, the clock starts on a production process that typically takes 4 to 6 months. Add in 2 to 3 months for alterations and fittings, and you can see how quickly the calendar fills up.',
      },
      {
        type: 'ul',
        items: [
          'Dress shopping & decision: allow 1–3 months',
          'Designer production time: 4–6 months (varies by designer)',
          'Alterations & fittings: 2–3 months',
          'Final pick-up: 1–2 weeks before the wedding',
        ],
      },
      {
        type: 'p',
        text: 'Add those together and you are looking at a minimum of 9 months from first appointment to having the dress hanging in your wardrobe — and that assumes you find your gown at your very first appointment (which, while it does happen, is not something to rely on).',
      },
      {
        type: 'h2',
        text: 'What If You Have Less Than 12 Months?',
      },
      {
        type: 'p',
        text: 'Do not panic. Many designers offer rush production options, and some boutiques (including us) carry sample gowns that can be purchased off the rail and altered much more quickly. If your wedding is 6–9 months away, you have more options than you might think — but it is important to move quickly and work with a boutique that has strong designer relationships.',
      },
      {
        type: 'h2',
        text: 'What If You Have More Than 18 Months?',
      },
      {
        type: 'p',
        text: 'There is such a thing as too early. If your wedding is more than 18 months away, you may find that the collection you fall in love with today has sold out or been discontinued by the time you need to order. We generally recommend waiting until you are within the 12–18 month window before committing to a gown.',
      },
      {
        type: 'h2',
        text: 'A Note for Kerry & Ireland Brides',
      },
      {
        type: 'p',
        text: 'If you are planning a wedding in Kerry or the wider Munster region, bear in mind that peak wedding season runs from May through September, which means bridal boutiques are at their busiest from late spring through summer. Booking your appointments in advance — especially for a private boutique like ours — gives you the best chance of securing your preferred dates and the most relaxed experience.',
      },
      {
        type: 'blockquote',
        text: 'The brides who have the most beautiful dress experience are almost always the ones who gave themselves time. Time to explore, time to dream, and time to find not just a dress — but the dress.',
      },
      {
        type: 'h2',
        text: 'Ready to Begin?',
      },
      {
        type: 'p',
        text: 'At REI Bridal in Kerry, every appointment is private, unhurried, and entirely yours. If you are ready to start your search — or just curious about where to begin — we would love to hear from you. Book a private appointment and let us take care of the rest.',
      },
    ],
  },

  {
    slug: 'how-to-choose-your-wedding-dress-silhouette',
    title: 'How to Choose Your Wedding Dress Silhouette',
    excerpt:
      'A-line, column, ball gown, mermaid — the language of bridal silhouettes can be overwhelming. Here is our straightforward guide to finding the shape that will make you feel extraordinary.',
    publishedAt: '2025-02-03',
    author: 'The REI Bridal Team',
    category: 'advice',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    tags: ['bridal advice', 'wedding dress', 'silhouettes', 'styling'],
    featured: true,
    content: [
      {
        type: 'p',
        text: 'Walk into any bridal boutique and you will be met with a wall of beautiful but potentially confusing terminology. A-line. Column. Fit-and-flare. Ballgown. Tea-length. Before you can even begin to browse, it helps to understand what these words actually mean — and, more importantly, how to decide which silhouette is right for you.',
      },
      {
        type: 'h2',
        text: 'The Main Wedding Dress Silhouettes Explained',
      },
      {
        type: 'h3',
        text: 'A-Line',
      },
      {
        type: 'p',
        text: 'The A-line is the most universally flattering silhouette in bridal. It fits closely at the bodice and flows outward from the waist to the hem — creating the shape of a capital A. It works beautifully across all body shapes, creating an elegant, elongating line. If you are unsure where to start, an A-line is rarely the wrong choice.',
      },
      {
        type: 'h3',
        text: 'Column (or Sheath)',
      },
      {
        type: 'p',
        text: 'A column gown follows the natural line of the body from shoulder to hem with minimal flare. It is the choice of the minimalist, modern bride — sleek, sophisticated, and utterly chic. Column gowns showcase the fabric, which is why they are so often made in luxurious silk charmeuse or structured crepe. They work best for those who love the idea of clean lines and understated drama.',
      },
      {
        type: 'h3',
        text: 'Ball Gown',
      },
      {
        type: 'p',
        text: 'The ball gown is the quintessential princess silhouette — a fitted bodice that dramatically widens into a full, sweeping skirt. If you have dreamed of a grand entrance and a gown that fills a room, this is your silhouette. Ball gowns are particularly beautiful for formal church ceremonies and classic venue settings.',
      },
      {
        type: 'h3',
        text: 'Mermaid & Fit-and-Flare',
      },
      {
        type: 'p',
        text: 'Both of these silhouettes hug the body from the bodice through the hips, then flare out — the mermaid from the knee, the fit-and-flare slightly higher. They are statement silhouettes that celebrate curves. They require confidence to wear, and they reward it.',
      },
      {
        type: 'h2',
        text: 'How to Choose the Right Silhouette for You',
      },
      {
        type: 'p',
        text: 'The honest answer is: try everything. Even experienced stylists (and that includes us) are sometimes surprised by which silhouette makes a bride come alive in the mirror. Come to your appointment with an open mind, let your stylist guide you, and trust the process.',
      },
      {
        type: 'ul',
        items: [
          'Think about how you want to feel, not just how you want to look',
          'Consider your venue — a column gown might not suit a beach, a ball gown may overwhelm an intimate setting',
          'Think about dancing, sitting, and moving — comfort matters as much as beauty',
          'Bring inspiration images, but hold them loosely — your perfect dress might look nothing like what you pinned',
        ],
      },
      {
        type: 'blockquote',
        text: 'The best silhouette is the one that makes you stop. That moment when you look in the mirror and everything goes quiet — that is when you know.',
      },
      {
        type: 'p',
        text: 'At REI Bridal, our stylists will guide you through each silhouette with care and expertise, ensuring you have the space and time to truly feel each gown before moving on. Book a private appointment at our Kerry boutique and let us help you find your shape.',
      },
    ],
  },

  {
    slug: 'what-to-expect-at-your-first-bridal-appointment',
    title: 'What to Expect at Your First Bridal Boutique Appointment',
    excerpt:
      'Your first bridal appointment is one of the most memorable moments of your engagement. Here is how to prepare, what to bring, and what makes a private boutique experience different.',
    publishedAt: '2025-02-20',
    author: 'The REI Bridal Team',
    category: 'appointments',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
    tags: ['appointments', 'bridal advice', 'first appointment', 'Kerry bridal'],
    content: [
      {
        type: 'p',
        text: 'Your first bridal appointment is a milestone — the moment your engagement shifts from abstract excitement into something beautifully real. Whether you have been dreaming about this day for years or have no idea where to begin, knowing what to expect will help you get the most from the experience.',
      },
      {
        type: 'h2',
        text: 'Before Your Appointment',
      },
      {
        type: 'h3',
        text: 'Who to Bring',
      },
      {
        type: 'p',
        text: 'This is more important than most brides realise. We recommend bringing two to three people whose opinions you genuinely trust — and who will celebrate you, not project their own preferences onto you. Larger groups can create noise and indecision. Smaller, closer circles tend to result in clearer, more confident decisions.',
      },
      {
        type: 'h3',
        text: 'What to Wear',
      },
      {
        type: 'p',
        text: 'Wear nude or skin-toned underwear that fits well, and avoid a complicated outfit — you will be changing in and out of gowns. If you are planning to wear heels on your wedding day, bring a pair of similar height so you can see the gown at its intended length.',
      },
      {
        type: 'h3',
        text: 'Inspiration, Not Obsession',
      },
      {
        type: 'p',
        text: 'It is wonderful to arrive with a Pinterest board or a few saved images — it helps your stylist understand your aesthetic. But hold your references loosely. The gown you end up loving is often nothing like the one you imagined. The best first appointments are the ones where brides surprise themselves.',
      },
      {
        type: 'h2',
        text: 'During Your Appointment',
      },
      {
        type: 'p',
        text: 'At REI Bridal, your appointment is entirely private. The boutique is yours. We will welcome you and your guests, offer you champagne, and spend a few minutes getting to know you — your wedding date, your venue, your vision, and how you want to feel on the day.',
      },
      {
        type: 'p',
        text: 'From there, your stylist will guide you through the collection, selecting gowns based on what you have shared. We will help you in and out of each dress, offer honest and expert guidance, and give you the time and space to genuinely feel each gown — rather than rushing you to a decision.',
      },
      {
        type: 'h2',
        text: 'Do You Have to Decide at Your First Appointment?',
      },
      {
        type: 'p',
        text: 'Absolutely not. Some brides know immediately — they step into a gown and that is it. Others need a second appointment, or a night to sleep on it. Both are completely normal, and neither is wrong. What matters is that when you do say yes, you are saying it with complete confidence.',
      },
      {
        type: 'blockquote',
        text: 'There is no pressure, no rush, and no expectation. Just the pure joy of finding your dress.',
      },
      {
        type: 'h2',
        text: 'After Your Appointment',
      },
      {
        type: 'p',
        text: 'If you find your gown, we will talk you through the order process, lead times, and what happens next. If you need more time, we will discuss booking a follow-up appointment. Either way, you will leave with a clearer picture of your vision — and with champagne.',
      },
      {
        type: 'p',
        text: 'Ready to book your first appointment at our Kerry boutique? We would love to welcome you.',
      },
    ],
  },

  {
    slug: 'introducing-the-rei-bridal-designers',
    title: 'Introducing the REI Bridal Designers',
    excerpt:
      'Every designer we carry was chosen for a reason. Here is a closer look at the extraordinary labels behind our collection — and the brides they were made for.',
    publishedAt: '2025-03-10',
    author: 'The REI Bridal Team',
    category: 'designers',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
    tags: ['designers', 'collections', 'Sarah Seven', 'Flora and Lane', 'Anne Barge', 'bridal fashion'],
    featured: true,
    content: [
      {
        type: 'p',
        text: 'One of the things we are most proud of at REI Bridal is our curation. We do not carry hundreds of designers or thousands of gowns. We carry a small, deliberately chosen group of labels that we believe in completely — each one different, each one exceptional. Here is a closer look at who they are and why we chose them.',
      },
      {
        type: 'h2',
        text: 'Sarah Seven — San Francisco, USA',
      },
      {
        type: 'p',
        text: 'Sarah Seven is the designer for the bride who knows exactly who she is. Her gowns are romantically bohemian with an editorial edge — flowing, tactile, and deeply feminine without being conventional. Made in San Francisco using the finest silk charmeuse, crepe de chine, and French lace, each piece feels like it was made for a specific woman, not a specific trend. If your style is effortless and your taste is impeccable, Sarah Seven deserves your attention.',
      },
      {
        type: 'h2',
        text: 'Flora & Lane — Melbourne, Australia',
      },
      {
        type: 'p',
        text: 'From Melbourne, Flora & Lane has built a devoted following among brides who value quiet confidence over spectacle. Their gowns are defined by clean, architectural silhouettes, extraordinary fabric choices, and a purity of construction that rewards close inspection. These are gowns for the bride who does not need to announce herself — she simply arrives, and the room takes notice.',
      },
      {
        type: 'h2',
        text: 'Anne Barge — USA',
      },
      {
        type: 'p',
        text: 'Anne Barge has been dressing brides since 1969, and over five decades she has never gone out of style — because she has never chased it. Her designs are studies in refined elegance: architectural cuts balanced with softness, creating silhouettes that feel at once completely classic and thoroughly modern. Anne Barge is for the bride who wants to look back at her wedding photographs in thirty years and feel exactly the same way she felt that day.',
      },
      {
        type: 'h2',
        text: 'Rime Arodaky — Paris, France',
      },
      {
        type: 'p',
        text: 'Rime Arodaky brings a distinctly Parisian sensibility to bridal — cool without being cold, romantic without being saccharine. Her designs are for the bride who wants to feel like herself, only more so. Expect unexpected details, confident silhouettes, and a general air of effortlessness that only comes from extraordinary craft.',
      },
      {
        type: 'h2',
        text: 'Halfpenny London — London, UK',
      },
      {
        type: 'p',
        text: 'Kate Halfpenny has been dressing London brides since 2000, earning her devoted following through a signature mix of delicate detailing, luxurious silk separates, and an irreverent sense of fun that never undermines the romance. Halfpenny London is for the bride who wants to look stunning and have the time of her life simultaneously.',
      },
      {
        type: 'h2',
        text: 'Come and See Them in Person',
      },
      {
        type: 'p',
        text: 'Photography does not do these gowns justice. The fabrics, the weight, the way they move — none of it translates to a screen. The only way to truly experience a designer\'s work is to wear it. Book a private appointment at REI Bridal in Kerry and let us introduce you to your designer.',
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}
