import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

// Import collections
import { Users } from './collections/Users';
import { Profile } from './collections/Profile';
import { Services } from './collections/Services';
import { Projects } from './collections/Projects';
import { ProcessSteps } from './collections/ProcessSteps';
import { TechStack } from './collections/TechStack';
import { FAQs } from './collections/FAQs';
import { Testimonials } from './collections/Testimonials';
import { Media } from './collections/Media';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
  },
  collections: [
    Users,
    Profile,
    Services,
    Projects,
    ProcessSteps,
    TechStack,
    FAQs,
    Testimonials,
    Media,
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: 'cms/src/payload-types.ts',
  },
});
