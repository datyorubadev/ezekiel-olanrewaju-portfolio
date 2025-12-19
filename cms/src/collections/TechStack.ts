import { CollectionConfig } from 'payload'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tools',
      type: 'array',
      fields: [
        {
          name: 'tool',
          type: 'text',
        },
      ],
    },
  ],
}
