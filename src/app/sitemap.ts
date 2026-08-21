import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/programs-data'
import { BASE_URL } from '@/lib/site'

// Fara lastModified: se calcula cu new Date() la build, deci toate adresele
// primeau ora deploy-ului si spuneau ca s-a schimbat tot, de fiecare data.
// Niciun semnal bate un semnal fals.
export default function sitemap(): MetadataRoute.Sitemap {
  const programPages = getAllSlugs().map((slug) => ({
    url: `${BASE_URL}/programe/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...programPages,
  ]
}
