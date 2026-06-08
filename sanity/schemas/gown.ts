import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gown',
  title: 'Gowns',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Gown Name',
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
      name: 'designer',
      title: 'Designer',
      type: 'reference',
      to: [{ type: 'designer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding Gown', value: 'wedding' },
          { title: 'Bridesmaid', value: 'bridesmaid' },
          { title: 'Occasion Wear', value: 'occasion' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceRange',
      title: 'Price / Price Range',
      type: 'string',
      description: 'e.g. "POA", "From €2,500", "€1,800 – €2,400"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features & Details',
      description: 'Key details about the gown (fabric, silhouette, etc.)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'isNew',
      title: 'New Arrival?',
      description: 'Shows a "New" badge on the gown card.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured on Homepage?',
      description: 'Show this gown in the homepage featured section.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Currently Available?',
      description: 'Uncheck to hide this gown from the website.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designer.name',
      media: 'image',
    },
  },
});
