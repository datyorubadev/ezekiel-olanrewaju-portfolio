import React from 'react'

export const metadata = {
    title: 'Payload CMS',
    description: 'Payload CMS',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
