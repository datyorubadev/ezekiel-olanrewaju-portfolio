import { CollectionConfig } from 'payload/types';

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tech Stack',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'tools',
      type: 'array',
      fields: [
        {
          name: 'tool',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
