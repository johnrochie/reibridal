/**
 * Client-confirmed designer brand stories.
 * Use verbatim. Do not invent extra facts.
 */
export const CONFIRMED_DESIGNER_STORIES = {
  truvelle:
    "Founded in 2013 when Gaby Bayona designed and sewed her first collection from her Vancouver apartment, Truvelle has grown from a one-woman studio into one of Canada's leading bridal houses. Rooted in her mother's custom dress shop, Gaby's approach has always been personal — gowns that feel refined and quietly romantic, made for brides to feel like themselves. Every Truvelle piece is still designed and handmade entirely in-house at the brand's own East Vancouver atelier, made to order by a close-knit team who care about craft as much as the story behind each dress.",
  'anna-kara':
    "Born and raised in Cracow, Anna Kara grew up steeped in art before founding her namesake brand in 2007, fresh out of art and fashion design school. Her early passions for drawing, photography, and literature evolved into a distinctive design voice — one that blends classic tailoring with a grunge-inspired, modern romanticism. Every gown is still made in-house at the brand's Krakow atelier, sewn to order by hand with a less-waste philosophy that keeps fabric and space to a minimum. The result is a collection that celebrates individuality and feminine sensuality, building Anna Kara into one of Europe's most sought-after bridal names.",
  'caroline-takvorian':
    'A French designer trained at Esmod and steeped in Parisian haute couture, Caroline Takvorian built her craft at storied houses including Lolita Lempicka and Isabel Marant before launching her own label in Paris in 2011. She began in luxury ready-to-wear, prized for eco-conscious French fabrics and impeccable tailoring — bridal came later, almost by accident, when her own 2012 engagement sent her to the sketchbook to design her wedding dress. Friends who saw it wanted one too, and a bridal collection was born. Her gowns remain true to that instinct: confident, understated, and made for women who wear them on their own terms.',
  'jane-aston':
    'A second-generation bridal retailer with over three decades in the industry, Jane Aston built her expertise working closely with brides and collaborating with established designers before launching her own label, Jane Aston Bridal, in London. Her collections are built around a simple belief: every bride should find the perfect dress at the right price, without compromising on quality. Each design brings timeless, classic silhouettes with a modern twist, made from luxurious fabrics with impeccable construction — accessible designer bridal wear that still feels exquisite.',
} as const;

export type ConfirmedDesignerSlug = keyof typeof CONFIRMED_DESIGNER_STORIES;
