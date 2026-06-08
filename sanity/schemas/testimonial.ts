import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'e.g. "Emma & Michael"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Wedding Date',
      description: 'e.g. "September 2024"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'e.g. "Kerry, Ireland"',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Review',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'date' },
  },
});
