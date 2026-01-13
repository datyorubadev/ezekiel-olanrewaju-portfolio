import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users.ts'
import { Projects } from './src/collections/Projects.ts'
import { Profile } from './src/collections/Profile.ts'
import { Media } from './src/collections/Media.ts'
import { FAQs } from './src/collections/FAQs.ts'
import { ProcessSteps } from './src/collections/ProcessSteps.ts'
import { Services } from './src/collections/Services.ts'
import { TechStack } from './src/collections/TechStack.ts'
import { Testimonials } from './src/collections/Testimonials.ts'
import { Hero } from './src/collections/Hero.ts'
import { About } from './src/collections/About.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    // Define the Server URL (Critical for Production)
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    // CORS: Allow Frontend, CMS itself, and Vercel Deployment URLs
    cors: [
        process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '', // Dynamic Vercel URL
        'https://ezekiel-olanrewaju.vercel.app', // Explicitly allow Frontend
        'http://localhost:5173', // Allow local frontend
    ].filter(Boolean),
    csrf: [
        process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '', // Dynamic Vercel URL
        'https://ezekiel-olanrewaju.vercel.app',
        'http://localhost:5173',
    ].filter(Boolean),
    collections: [
        Users,
        Hero,
        About,
        Projects,
        Profile,
        Media,
        FAQs,
        ProcessSteps,
        Services,
        TechStack,
        Testimonials,
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'test-secret',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI,
        },
    }),
})
