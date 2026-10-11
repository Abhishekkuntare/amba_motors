import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: 'https://ambamotors.in/',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    images: [
      'https://ambamotors.in/images/amba-navratri-poster.png',
      'https://ambamotors.in/images/durga-navratri.png',
      'https://ambamotors.in/images/pravin-kuntare.png',
    ],
  }]
}
