import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'designer',
  title: 'Designers',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Designer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from the name. Used in the page URL.',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'Leave empty rather than guessing. Only confirmed facts should be published as public copy.',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      description: 'One sentence shown on the designer card. Optional until confirmed.',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'description',
      title: 'Brand story',
      description:
        'Confirmed copy appears on the Designers listing. Leave empty rather than inventing a story.',
      type: 'verifiedText',
    }),
    defineField({
      name: 'image',
      title: 'Portrait / Card Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover / Hero Image',
      description: 'Wide image used on the designer detail page hero.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'website',
      title: 'Designer Website',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Designer?',
      description: 'Featured designers appear as large cards on the Designers page.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Studio list order. The public Designers listing is alphabetical by name.',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'image',
    },
  },
});
