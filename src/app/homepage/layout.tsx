import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'GEO AI',
    description: 'GEO AI GIS APPLICATION',
}

export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div>{children}</div>
}