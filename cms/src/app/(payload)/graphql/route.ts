import configPromise from '@payload-config'
import { GRAPHQL_POST, GRAPHQL_OPTIONS } from '@payloadcms/next/routes'

export const POST = GRAPHQL_POST(configPromise)
export const OPTIONS = GRAPHQL_OPTIONS(configPromise)
