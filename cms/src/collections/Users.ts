import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        // Password is automatically added by auth: true
    ],
}
