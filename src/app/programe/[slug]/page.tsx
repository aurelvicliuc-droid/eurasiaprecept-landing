import { notFound } from 'next/navigation'
import { getProgramBySlug, getAllSlugs } from '@/lib/programs-data'
import Script from 'next/script'
import type { Metadata } from 'next'
import ProgramPageClient from './ProgramPageClient'

const BASE_URL = 'https://eurasiaprecept.org'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return {}

  const title = `${program.name} — Precept Eurasia`
  const url = `${BASE_URL}/programe/${slug}`

  return {
    title,
    description: program.overview,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'ro_MD',
      url,
      siteName: 'Precept Eurasia',
      title,
      description: program.overview,
      images: [
        {
          url: program.heroImage,
          width: 1400,
          alt: program.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: program.overview,
      images: [program.heroImage],
    },
  }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.name,
    description: program.overview,
    url: `${BASE_URL}/programe/${slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Precept Eurasia',
      url: BASE_URL,
    },
    image: program.heroImage,
    educationalLevel: program.badge,
    inLanguage: 'ro',
  }

  return (
    <>
      <Script
        id={`json-ld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProgramPageClient program={program} />
    </>
  )
}
