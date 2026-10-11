import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
<<<<<<< HEAD
  return [{ url: 'https://ambamotors.in', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
=======
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
>>>>>>> b8dc656 (Update Navratri theme)
}
