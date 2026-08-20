import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Devanagari, Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], style: ['italic'], weight: ['500', '600', '700'], variable: '--font-accent' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const notoDevanagari = Noto_Sans_Devanagari({ subsets: ['devanagari'], variable: '--font-indic' })
export const metadata: Metadata = {
  metadataBase: new URL('https://ambamotors.in'),

  title:
    'Amba Motors | Car Service & Repair Garage in Amravati',

  description:
    'Amba Motors is a trusted car service and repair garage in Amravati, Maharashtra, offering car servicing, diagnostics, engine repair, brake service, AC repair, denting, painting, tyre service and wheel alignment.',

  generator: 'Abhishek Kuntare',

  keywords: [
    // Brand
    'Amba Motors',
    'Amba Motors Amravati',
    'Amba Motors garage',
    'Amba Motors car service',

    // Core local searches
    'car service Amravati',
    'car servicing Amravati',
    'car repair Amravati',
    'car garage Amravati',
    'car mechanic Amravati',
    'automobile garage Amravati',
    'auto repair Amravati',
    'car workshop Amravati',

    // Services
    'car diagnostics Amravati',
    'engine repair Amravati',
    'engine service Amravati',
    'brake service Amravati',
    'brake repair Amravati',
    'car AC service Amravati',
    'car AC repair Amravati',
    'battery service Amravati',
    'car electrical repair Amravati',
    'clutch repair Amravati',
    'car suspension repair Amravati',
    'steering repair Amravati',
    'tyre service Amravati',
    'wheel alignment Amravati',
    'wheel balancing Amravati',
    'oil change Amravati',
    'car denting Amravati',
    'car painting Amravati',
    'denting painting Amravati',

    // Intent-based searches
    'best car service in Amravati',
    'best car garage in Amravati',
    'car repair shop near me',
    'car service near me',
    'car mechanic near me',
    'car garage near me',

    // Location
    'car service Badnera Road',
    'car garage Badnera Road',
    'car repair Badnera Road',
    'car service Sharda Vihar',
    'car garage Sharda Vihar',
    'car service Maharashtra',
  ],

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/amba-motors-logo.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'Amba Motors | Car Service & Repair in Amravati',
    description:
      'Professional car servicing, repairs, diagnostics, AC service, brakes, denting, painting, tyres and wheel alignment in Amravati, Maharashtra.',
    url: 'https://ambamotors.in',
    siteName: 'Amba Motors',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Amba Motors | Car Service & Repair in Amravati',
    description:
      'Professional car service and repair garage in Amravati, Maharashtra.',
  },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#e7d6bb', width: 'device-width', initialScale: 1 }

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'AutoRepair', name: 'Amba Motors', telephone: '+91 9823028110',
  address: { '@type': 'PostalAddress', streetAddress: 'WP2X+VHJ, No 1, Ram Vattika Hareeiali, Badnera Road, Sharda Vihar', addressLocality: 'Amravati', addressRegion: 'Maharashtra', postalCode: '444607', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: 20.9023273, longitude: 77.7487636 },
  areaServed: 'Amravati', url: 'https://maps.app.goo.gl/pQgiSuMJqdmjTbVp6', priceRange: '$$', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', bestRating: '5', ratingCount: '1' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable} ${dmSans.variable} ${notoDevanagari.variable} bg-background`}><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
