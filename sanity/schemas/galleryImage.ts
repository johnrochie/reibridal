import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryImage',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      description: 'Describe the image for accessibility and SEO.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bride', value: 'bride' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Detail', value: 'detail' },
          { title: 'Ceremony', value: 'ceremony' },
          { title: 'Editorial', value: 'editorial' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      description: 'Optional — shown on hover.',
      type: 'string',
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
      title: 'alt',
      subtitle: 'category',
      media: 'image',
    },
  },
});
