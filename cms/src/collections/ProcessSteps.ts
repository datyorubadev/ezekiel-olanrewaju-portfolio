import { CollectionConfig } from 'payload'

export const ProcessSteps: CollectionConfig = {
  slug: 'process-steps',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'stepNumber',
      type: 'number',
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
}
