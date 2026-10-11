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

<<<<<<< HEAD
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
=======
  title: 'Amba Motors | Car Service & Repair in Amravati',
  description:
    'Amba Motors provides car servicing and repair in Amravati, Maharashtra. Find diagnostics, engine and brake repair, AC service and wheel alignment on Badnera Road.',
  applicationName: 'Amba Motors',
  category: 'Automotive',
  keywords: [
    'Amba Motors',
    'Amba Motors Amravati',
>>>>>>> b8dc656 (Update Navratri theme)
    'car service Amravati',
    'car servicing Amravati',
    'car repair Amravati',
    'car garage Amravati',
<<<<<<< HEAD
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
=======
    'car workshop Amravati',
    'car mechanic Amravati',
    'auto repair Amravati',
    'car service Badnera Road',
    'car garage Badnera Road',
    'car repair Sharda Vihar',
    'car diagnostics Amravati',
    'engine repair Amravati',
    'brake repair Amravati',
    'car AC repair Amravati',
    'car electrical repair Amravati',
    'battery service Amravati',
    'clutch repair Amravati',
    'suspension repair Amravati',
>>>>>>> b8dc656 (Update Navratri theme)
    'tyre service Amravati',
    'wheel alignment Amravati',
    'wheel balancing Amravati',
    'oil change Amravati',
<<<<<<< HEAD
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
=======
    'car denting and painting Amravati',
    'roadside assistance Amravati',
  ],
  authors: [{ name: 'Amba Motors', url: 'https://ambamotors.in' }],
  publisher: 'Amba Motors',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
>>>>>>> b8dc656 (Update Navratri theme)

  alternates: {
    canonical: '/',
  },

  icons: {
<<<<<<< HEAD
    icon: '/amba-motors-logo.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
=======
    icon: [
      { url: '/amba-motors-logo.ico' },
      { url: '/amba-motors-logo.png', type: 'image/png' },
    ],
    shortcut: '/amba-motors-logo.ico',
    apple: '/apple-icon.png',
>>>>>>> b8dc656 (Update Navratri theme)
  },

  openGraph: {
    title: 'Amba Motors | Car Service & Repair in Amravati',
    description:
<<<<<<< HEAD
      'Professional car servicing, repairs, diagnostics, AC service, brakes, denting, painting, tyres and wheel alignment in Amravati, Maharashtra.',
    url: 'https://ambamotors.in',
    siteName: 'Amba Motors',
    type: 'website',
=======
      'Car servicing and repair in Amravati, Maharashtra. Find Amba Motors on Badnera Road for diagnostics, engine and brake repair, AC, denting, painting and wheel alignment.',
    url: 'https://ambamotors.in/',
    siteName: 'Amba Motors',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/amba-navratri-poster.png',
        width: 768,
        height: 1152,
        alt: 'Amba Motors wishes you safe rides and happy vibes this Navratri',
      },
    ],
>>>>>>> b8dc656 (Update Navratri theme)
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Amba Motors | Car Service & Repair in Amravati',
    description:
<<<<<<< HEAD
      'Professional car service and repair garage in Amravati, Maharashtra.',
  },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#e7d6bb', width: 'device-width', initialScale: 1 }

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'AutoRepair', name: 'Amba Motors', telephone: '+91 9823028110',
  address: { '@type': 'PostalAddress', streetAddress: 'WP2X+VHJ, No 1, Ram Vattika Hareeiali, Badnera Road, Sharda Vihar', addressLocality: 'Amravati', addressRegion: 'Maharashtra', postalCode: '444607', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: 20.9023273, longitude: 77.7487636 },
  areaServed: 'Amravati', url: 'https://maps.app.goo.gl/pQgiSuMJqdmjTbVp6', priceRange: '$$', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', bestRating: '5', ratingCount: '1' },
=======
      'Car servicing, diagnostics and repairs on Badnera Road, Amravati. Call Amba Motors to enquire or book.',
    images: ['/images/amba-navratri-poster.png'],
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#110b16', width: 'device-width', initialScale: 1 }

const businessJsonLd = {
  '@type': 'AutoRepair',
  '@id': 'https://ambamotors.in/#auto-repair',
  name: 'Amba Motors',
  alternateName: 'Amba Motors Amravati',
  url: 'https://ambamotors.in/',
  image: [
    'https://ambamotors.in/images/amba-navratri-poster.png',
    'https://ambamotors.in/amba-motors-logo.png',
  ],
  logo: 'https://ambamotors.in/amba-motors-logo.png',
  telephone: '+919823028110',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+919823028110',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'WP2X+VHJ, No 1, Ram Vattika Hareeiali, Badnera Road, Sharda Vihar',
    addressLocality: 'Amravati',
    addressRegion: 'Maharashtra',
    postalCode: '444607',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 20.9023273,
    longitude: 77.7487636,
  },
  hasMap: 'https://maps.app.goo.gl/pQgiSuMJqdmjTbVp6',
  areaServed: {
    '@type': 'City',
    name: 'Amravati',
  },
  sameAs: ['https://maps.app.goo.gl/pQgiSuMJqdmjTbVp6'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'https://schema.org/Saturday',
        'https://schema.org/Sunday',
        'https://schema.org/Monday',
        'https://schema.org/Tuesday',
        'https://schema.org/Wednesday',
        'https://schema.org/Thursday',
      ],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  makesOffer: [
    'Periodic car servicing',
    'Car diagnostics and engine repair',
    'Brake, clutch and suspension repair',
    'Car AC and electrical repair',
    'Battery and tyre services',
    'Wheel alignment and balancing',
    'Car denting and painting',
    'Roadside assistance',
  ].map(name => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name },
    areaServed: 'Amravati',
  })),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    businessJsonLd,
    {
      '@type': 'WebSite',
      '@id': 'https://ambamotors.in/#website',
      url: 'https://ambamotors.in/',
      name: 'Amba Motors',
      publisher: { '@id': 'https://ambamotors.in/#auto-repair' },
      inLanguage: ['en-IN', 'hi-IN', 'mr-IN'],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://ambamotors.in/#webpage',
      url: 'https://ambamotors.in/',
      name: 'Amba Motors | Car Service & Repair in Amravati',
      description: 'Car servicing and repairs in Amravati, Maharashtra, at Amba Motors on Badnera Road.',
      isPartOf: { '@id': 'https://ambamotors.in/#website' },
      about: { '@id': 'https://ambamotors.in/#auto-repair' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://ambamotors.in/images/amba-navratri-poster.png',
      },
      inLanguage: 'en-IN',
    },
  ],
>>>>>>> b8dc656 (Update Navratri theme)
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable} ${dmSans.variable} ${notoDevanagari.variable} bg-background`}><body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
