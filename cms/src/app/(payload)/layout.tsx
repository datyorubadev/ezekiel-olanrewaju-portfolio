import configPromise from '@payload-config'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
/* This is the root layout for the Payload admin UI */
import React from 'react'
import { importMap } from './admin/importMap.js'

import '@payloadcms/next/css'
import './custom.scss'

type Args = {
    children: React.ReactNode
}

async function serverFunction(args: any) {
    'use server'
    return handleServerFunctions({
        ...args,
        config: configPromise,
    })
}

const Layout = ({ children }: Args) => (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
        {children}
    </RootLayout>
)

export default Layout
