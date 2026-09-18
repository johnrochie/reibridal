import { defineField, defineType } from 'sanity';

export const CONTENT_STATUS_LIST = [
  { title: 'Confirmed — may appear as a public fact', value: 'confirmed' },
  { title: 'Needs review', value: 'needs-review' },
  { title: 'Missing', value: 'missing' },
  { title: 'Draft', value: 'draft' },
];

const statusField = defineField({
  name: 'status',
  title: 'Content status',
  type: 'string',
  options: { list: CONTENT_STATUS_LIST, layout: 'radio' },
  initialValue: 'missing',
  validation: (Rule) => Rule.required(),
});

export const verifiedString = defineType({
  name: 'verifiedString',
  title: 'Verified text',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string' }),
    statusField,
  ],
  preview: {
    select: { title: 'value', status: 'status' },
    prepare({ title, status }) {
      return { title: title || '—', subtitle: status || 'missing' };
    },
  },
});

export const verifiedText = defineType({
  name: 'verifiedText',
  title: 'Verified long text',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'text', rows: 4 }),
    statusField,
  ],
});

export const verifiedStringList = defineType({
  name: 'verifiedStringList',
  title: 'Verified list',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Values',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    statusField,
  ],
});
