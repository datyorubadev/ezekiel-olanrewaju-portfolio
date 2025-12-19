import { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
    slug: 'about',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'About & Expertise',
            admin: {
                hidden: true,
            },
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
            label: 'Main Bio Content',
        },
        {
            name: 'expertise',
            type: 'array',
            label: 'Expertise Items',
            fields: [
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
        },
    ],
}
