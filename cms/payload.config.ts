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
    // CORS: Allow Frontend and CMS itself
    cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
    csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
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
    rateLimit: {
        trustProxy: true,
        window: 15 * 60 * 1000, // 15 minutes
        limit: 500, // limit each IP to 500 requests per windowMs
    },
})
