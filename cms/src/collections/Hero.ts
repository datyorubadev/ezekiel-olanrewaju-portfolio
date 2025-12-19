import { CollectionConfig } from 'payload'

export const Hero: CollectionConfig = {
    slug: 'hero',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'role',
            type: 'text',
            required: true,
            label: 'Role',
        },
        {
            name: 'headline',
            type: 'textarea',
            required: true,
            label: 'Headline',
        },
        {
            name: 'subheadline',
            type: 'textarea',
            required: true,
            label: 'Subheadline',
        },
    ],
}
