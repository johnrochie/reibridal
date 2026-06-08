import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'realBride',
  title: 'Real Brides',
  type: 'document',
  fields: [
    defineField({
      name: 'brideName',
      title: "Bride's Name",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partnerName',
      title: "Partner's Name",
      type: 'string',
    }),
    defineField({
      name: 'weddingDate',
      title: 'Wedding Date',
      description: 'e.g. "September 2024"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Wedding Location',
      description: 'e.g. "Killarney, Kerry"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gown',
      title: 'Gown Worn',
      type: 'reference',
      to: [{ type: 'gown' }],
    }),
    defineField({
      name: 'quote',
      title: 'Bride Quote',
      description: 'A short quote from the bride about her experience.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Main Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story?',
      description: 'Featured brides appear as large stories at the top of the Real Brides page.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'brideName',
      subtitle: 'weddingDate',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
