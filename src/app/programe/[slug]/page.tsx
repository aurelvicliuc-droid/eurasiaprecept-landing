import { notFound } from 'next/navigation'
import { getProgramBySlug, getAllSlugs, type ProgramData } from '@/lib/programs-data'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, BookOpen, Users, Clock, Download } from 'lucide-react'
import ProgramPageClient from './ProgramPageClient'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) return {}
  return {
    title: `${program.name} — Precept Eurasia`,
    description: program.overview,
  }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  return <ProgramPageClient program={program} />
}
