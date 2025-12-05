import { CollectionConfig } from 'payload/types';

export const ProcessSteps: CollectionConfig = {
  slug: 'process-steps',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
};
