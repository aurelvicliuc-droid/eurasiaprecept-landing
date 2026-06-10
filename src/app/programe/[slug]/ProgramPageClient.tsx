'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, BookOpen, Clock, Download, ChevronRight } from 'lucide-react'
import type { ProgramData } from '@/lib/programs-data'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AboutModal from '@/components/modals/AboutModal'
import { useLanguage } from '@/lib/i18n/context'
import { localizeProgram } from '@/lib/i18n/programs-localized'

const badgeColors: Record<string, string> = {
  teal: 'bg-teal/10 text-teal border-teal/30',
  gold: 'bg-gold/10 text-[#a07820] border-gold/40',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  green: 'bg-green-mid/10 text-green-mid border-green-mid/30',
}

interface Props {
  program: ProgramData
}

export default function ProgramPageClient({ program }: Props) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const { lang, t } = useLanguage()
  const pp = t.programPage

  const p = localizeProgram(program, lang)

  const hasCurriculum = p.curriculum.length > 0
  const hasDocuments = p.documents.length > 0
  const hasStructure = p.structure.length > 0
  const hasOutcomes = p.outcomes && p.outcomes.length > 0

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <Nav onAboutOpen={() => setAboutOpen(true)} />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* Breadcrumb below nav */}
      <div className="pt-[68px] bg-white border-b border-beige-dark/60">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-11 flex items-center gap-2 text-[13px]">
          <Link href="/#programe" className="inline-flex items-center gap-1.5 text-text-muted hover:text-teal transition-colors duration-200 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden />
            {pp.backLabel}
          </Link>
          <span className="text-beige-dark">/</span>
          <span className="text-text-dark font-medium truncate">{p.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="relative w-full overflow-hidden" style={{ height: 'clamp(300px, 42vw, 560px)' }}>
          <Image
            src={program.heroImage}
            alt={program.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-dark/90 via-green-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 lg:px-16 max-w-[1200px] mx-auto left-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`inline-block text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-1.5
                rounded-full border backdrop-blur-sm mb-4 ${badgeColors[program.badgeColor]}`}>
                {program.badge}
              </span>
              <h1 className="font-['var(--font-display)'] text-white font-normal leading-tight mb-3
                text-[clamp(28px,4vw,52px)]">
                {p.name}
              </h1>
              <p className="text-white/80 text-[clamp(15px,1.6vw,18px)] max-w-[560px] leading-[1.55]">
                {p.tagline}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">

          {/* Left: main content */}
          <div className="flex flex-col gap-14">

            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <SectionLabel icon={<BookOpen size={15} />}>{pp.aboutSection}</SectionLabel>
              <p className="text-[17px] text-text-dark leading-[1.8] mt-4">
                {p.overview}
              </p>
            </motion.section>

            {/* Curriculum */}
            {hasCurriculum && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                <SectionLabel icon={<BookOpen size={15} />}>{pp.curriculum}</SectionLabel>
                <div className="flex flex-col gap-4 mt-5">
                  {p.curriculum.map((course, i) => (
                    <motion.div
                      key={i}
                      className="border border-beige-dark rounded-xl p-5 bg-cream hover:border-teal/40 hover:shadow-sm transition-all duration-200"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-teal/10 text-teal
                          flex items-center justify-center text-[12px] font-bold">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-['var(--font-display)'] text-[17px] text-green-dark font-medium leading-snug">
                            {course.title}
                          </h3>
                          {course.manual && (
                            <p className="text-[12px] text-teal font-medium tracking-[0.04em] mt-0.5">
                              {pp.manualLabel}: {course.manual}
                            </p>
                          )}
                          {course.desc && (
                            <p className="text-[15px] text-text-muted leading-[1.65] mt-2">
                              {course.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Outcomes */}
            {hasOutcomes && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                <SectionLabel icon={<CheckCircle size={15} />}>{pp.outcomes}</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {p.outcomes!.map((outcome, i) => (
                    <motion.div
                      key={i}
                      className="bg-cream border border-beige-dark rounded-xl p-5"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center mb-3">
                        <ChevronRight size={16} className="text-teal" />
                      </div>
                      <h4 className="text-[15px] font-semibold text-green-dark mb-1">{outcome.title}</h4>
                      <p className="text-[14.5px] text-text-muted leading-[1.65]">{outcome.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

          </div>

          {/* Right: sticky sidebar */}
          <div className="lg:sticky lg:top-[84px] flex flex-col gap-5">

            {/* Who can apply */}
            {p.whoCanApply.length > 0 && (
              <motion.div
                className="bg-white border border-beige-dark rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-[13px] font-bold tracking-[0.12em] uppercase text-teal mb-4">
                  {pp.whoCanApply}
                </h3>
                <ul className="flex flex-col gap-3">
                  {p.whoCanApply.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle size={15} className="text-teal flex-shrink-0 mt-0.5" />
                      <span className="text-[15px] text-text-dark leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Structure */}
            {hasStructure && (
              <motion.div
                className="bg-white border border-beige-dark rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
              >
                <h3 className="text-[13px] font-bold tracking-[0.12em] uppercase text-teal mb-4">
                  {pp.structure}
                </h3>
                <ul className="flex flex-col gap-3">
                  {p.structure.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Clock size={15} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-[15px] text-text-dark leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Documents */}
            {hasDocuments && (
              <motion.div
                className="bg-white border border-beige-dark rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.34 }}
              >
                <h3 className="text-[13px] font-bold tracking-[0.12em] uppercase text-teal mb-4">
                  {pp.documents}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {p.documents.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                      <span className="text-[15px] text-text-dark">{doc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 }}
            >
              <a
                href={program.ctaPrimary.href}
                className="w-full bg-teal text-white text-center py-4 px-6 rounded-xl text-[15px] font-semibold
                  hover:bg-green-dark transition-colors duration-200 shadow-sm"
              >
                {p.ctaPrimary.label}
              </a>
              {p.ctaSecondary && (
                <a
                  href={program.ctaSecondary?.href}
                  className="w-full border-[1.5px] border-teal text-teal text-center py-3.5 px-6 rounded-xl
                    text-[14px] font-medium hover:bg-teal/5 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {p.downloadLabel && <Download size={14} aria-hidden />}
                  {p.ctaSecondary.label}
                </a>
              )}
              {p.ctaTertiary && (
                <a
                  href={program.ctaTertiary?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-beige-dark text-text-muted text-center py-3 px-6 rounded-xl
                    text-[13px] font-medium hover:border-teal hover:text-teal transition-all duration-200"
                >
                  {p.ctaTertiary.label}
                </a>
              )}
            </motion.div>

            {/* Contact nudge */}
            <motion.p
              className="text-[14px] text-text-muted text-center leading-[1.65]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {pp.questions}{' '}
              <a href="/#contact" className="text-teal underline underline-offset-2 hover:no-underline">
                {pp.contactUs}
              </a>
              {' '}{pp.contactNudge}
            </motion.p>

          </div>
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div className="relative bg-beige py-20 overflow-hidden border-t border-beige-dark">
        {/* Subtle decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold/6 pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-teal mb-4">
            {pp.applyBadge}
          </span>
          <h2 className="font-['var(--font-display)'] text-green-dark text-[clamp(24px,3vw,40px)] font-normal mb-4 leading-tight">
            {pp.ctaBannerTitle}
          </h2>
          <p className="text-text-muted text-[16.5px] mb-10 max-w-[460px] mx-auto leading-[1.7]">
            {pp.ctaBannerDesc(p.name)}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={program.ctaPrimary.href}
              className="inline-block bg-green-dark text-white font-semibold px-8 py-4 rounded-xl text-[15px]
                hover:bg-teal transition-colors duration-200 shadow-sm"
            >
              {p.ctaPrimary.label}
            </a>
            <a
              href="/#contact"
              className="inline-block border-[1.5px] border-green-dark/30 text-green-dark font-medium
                px-8 py-4 rounded-xl text-[15px] hover:border-teal hover:text-teal transition-all duration-200"
            >
              {pp.contactUs}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 pb-3 border-b border-beige-dark">
      <span className="text-teal">{icon}</span>
      <h2 className="text-[13px] font-bold tracking-[0.13em] uppercase text-text-muted">{children}</h2>
    </div>
  )
}
