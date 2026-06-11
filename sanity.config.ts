import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'rei-bridal',
  title: 'REI Bridal',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('REI Bridal Content')
          .items([
            S.listItem()
              .title('Gowns')
              .schemaType('gown')
              .child(S.documentTypeList('gown').title('Gowns')),
            S.listItem()
              .title('Designers')
              .schemaType('designer')
              .child(S.documentTypeList('designer').title('Designers')),
            S.divider(),
            S.listItem()
              .title('Real Brides')
              .schemaType('realBride')
              .child(S.documentTypeList('realBride').title('Real Brides')),
            S.listItem()
              .title('Gallery')
              .schemaType('galleryImage')
              .child(S.documentTypeList('galleryImage').title('Gallery')),
            S.divider(),
            S.listItem()
              .title('Journal Posts')
              .schemaType('blogPost')
              .child(S.documentTypeList('blogPost').title('Journal Posts')),
            S.divider(),
            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.listItem()
              .title('Team')
              .schemaType('teamMember')
              .child(S.documentTypeList('teamMember').title('Team')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
