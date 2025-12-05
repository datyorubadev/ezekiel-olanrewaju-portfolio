import { CollectionConfig } from 'payload/types';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'problem',
      type: 'textarea',
      required: true,
    },
    {
      name: 'solution',
      type: 'textarea',
      required: true,
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'chartData',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Before', value: 'before' },
            { label: 'After', value: 'after' },
          ],
          required: true,
        },
      ],
    },
  ],
};
