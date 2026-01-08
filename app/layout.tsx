import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'MathLearn - Mathematics Education from Basics to Expertise',
  description: 'Open-source mathematics education platform covering 11 domains, 87 topics, and 4000+ exercises. Learn math from basics to expertise level.',
  keywords: ['mathematics', 'math education', 'learning platform', 'calculus', 'algebra', 'geometry', 'open source'],
  authors: [{ name: 'MathLearn Team' }],
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'MathLearn - Mathematics Education Platform',
    description: 'Open-source mathematics education from basics to expertise',
    type: 'website',
    images: ['/logo.svg'],
  },
  twitter: {
    card: 'summary',
    title: 'MathLearn - Mathematics Education Platform',
    description: 'Open-source mathematics education from basics to expertise',
    images: ['/logo.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
