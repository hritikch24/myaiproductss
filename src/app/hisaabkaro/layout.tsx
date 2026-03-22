import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HisaabKaro - Digital Hisaab',
  description: 'Simple billing and udhar (credit) tracker for Indian shopkeepers',
  manifest: '/hisaabkaro/manifest.json',
  themeColor: '#2563EB',
  appleWebApp: {
    capable: true,
    title: 'HisaabKaro',
    statusBarStyle: 'default'
  }
}

export default function HisaabKaroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/hisaabkaro/favicon.svg" />
        <link rel="apple-touch-icon" href="/hisaabkaro/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  )
}
