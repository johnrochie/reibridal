import { defineField, defineType } from 'sanity';

export const gownImage = defineType({
  name: 'gownImage',
  title: 'Gown image',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Image type',
      description: 'Leave empty unless the type can actually be established.',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Front', value: 'front' },
          { title: 'Back', value: 'back' },
          { title: 'Side', value: 'side' },
          { title: 'Detail', value: 'detail' },
          { title: 'Fabric / detail', value: 'fabric' },
          { title: 'Model', value: 'model' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Real bride', value: 'real-bride' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Sanity asset',
      type: 'image',
      options: { hotspot: true },
      description: 'Preferred CMS upload path. Production delivery still goes through the media abstraction.',
    }),
    defineField({
      name: 'external',
      title: 'External storage',
      type: 'object',
      description: 'Use when the file lives in Cloudinary, Vercel Blob, Supabase, S3, or local sample storage — not Git.',
      fields: [
        defineField({
          name: 'provider',
          title: 'Provider',
          type: 'string',
          options: {
            list: [
              { title: 'Local sample', value: 'local' },
              { title: 'Cloudinary', value: 'cloudinary' },
              { title: 'Vercel Blob', value: 'vercel-blob' },
              { title: 'Supabase', value: 'supabase' },
              { title: 'S3 / CDN', value: 's3' },
            ],
          },
        }),
        defineField({
          name: 'key',
          title: 'Object key or public URL',
          type: 'string',
        }),
        defineField({ name: 'width', type: 'number', hidden: true }),
        defineField({ name: 'height', type: 'number', hidden: true }),
      ],
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
    defineField({
      name: 'matchConfidence',
      title: 'Match confidence',
      description: 'From photo ingest. High = suggested; medium = review; low = unmatched. Never publish low-confidence matches.',
      type: 'string',
      options: {
        list: [
          { title: 'High — suggested match', value: 'high' },
          { title: 'Medium — review required', value: 'medium' },
          { title: 'Low — unmatched', value: 'low' },
        ],
      },
    }),
    defineField({
      name: 'reviewNotes',
      title: 'Review notes',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      type: 'type',
      alt: 'alt',
      provider: 'external.provider',
      media: 'image',
      confidence: 'matchConfidence',
    },
    prepare({ type, alt, provider, media, confidence }) {
      return {
        title: type || alt || 'Unclassified image',
        subtitle: [provider || 'sanity', confidence].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
