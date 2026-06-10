import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/programs-data'

const BASE_URL = 'https://eurasiaprecept.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const programSlugs = getAllSlugs()

  const programPages = programSlugs.map((slug) => ({
    url: `${BASE_URL}/programe/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...programPages,
  ]
}
