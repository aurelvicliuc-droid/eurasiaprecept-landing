import { notFound } from 'next/navigation'
import { getProgramBySlug, getAllSlugs } from '@/lib/programs-data'
import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/site'
import { programsEn } from '@/lib/i18n/programs-en'
import { programsRu } from '@/lib/i18n/programs-ru'
import ProgramPageClient from './ProgramPageClient'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return {}

  // title.template din layout adauga deja ' | Precept Eurasia'. Daca punem
  // sufixul si aici, iese de doua ori in SERP. Cardurile sociale nu au template,
  // deci acolo il scriem intreg.
  const socialTitle = `${program.name} | Precept Eurasia`
  const url = `${BASE_URL}/programe/${slug}`

  return {
    title: program.name,
    description: program.overview,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'ro_MD',
      url,
      siteName: 'Precept Eurasia',
      title: socialTitle,
      description: program.overview,
      images: [
        {
          url: program.heroImage,
          alt: program.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
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

  // Firimiturile pe care le arata si pagina: Programe, apoi numele programului.
  // Ultima nu primeste 'item', e pagina curenta.
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Programe', item: `${BASE_URL}/#programe` },
      { '@type': 'ListItem', position: 2, name: program.name },
    ],
  }

  return (
    <>
      {/* Script simplu, nu next/script: vezi comentariul din layout.tsx. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }}
      />
      {/* Doar traducerile programului curent, nu dictionarele intregi. */}
      <ProgramPageClient
        program={program}
        en={programsEn[slug] ?? null}
        ru={programsRu[slug] ?? null}
      />
    </>
  )
}
