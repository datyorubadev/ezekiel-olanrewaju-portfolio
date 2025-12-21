import { CollectionConfig } from 'payload'

export const Profile: CollectionConfig = {
  slug: 'profile',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true, // Contact Email
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true,
    },
    {
      name: 'contactHeadline', // Renamed for camelCase consistency
      type: 'text',
      label: 'Contact Headline',
      required: true,
    },
    {
      name: 'contactDescription',
      type: 'textarea',
      label: 'Contact Description',
      required: true,
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'github',
          type: 'text',
        },
      ],
    },
  ],
}
