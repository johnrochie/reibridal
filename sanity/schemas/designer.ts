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
      description: 'e.g. "France", "Australia", "USA"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      description: 'One sentence shown on the designer card.',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      description: 'Shown on the designer detail page.',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Portrait / Card Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover / Hero Image',
      description: 'Wide image used on the designer detail page hero.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
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
      description: 'Lower numbers appear first.',
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
