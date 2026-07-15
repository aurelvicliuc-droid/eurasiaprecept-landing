'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, BookOpen, Clock, Download, ChevronLeft, ChevronRight, ExternalLink, Images, Quote, X } from 'lucide-react'
import type { ProgramData } from '@/lib/programs-data'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AboutModal from '@/components/modals/AboutModal'
import { useLanguage } from '@/lib/i18n/context'
import { localizeProgram } from '@/lib/i18n/programs-localized'

const badgeColors: Record<string, string> = {
  teal: 'bg-teal/10 text-teal border-teal/30',
  gold: 'bg-gold/10 text-[#7c7012] border-gold/40',
  purple: 'bg-clay/10 text-clay border-clay/30',
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
  const hasGallery = !!(p.gallery && p.gallery.length > 0)
  const hasTestimonials = !!(p.testimonials && p.testimonials.length > 0)

  // Lightbox pentru galeria foto
  const gallery = p.gallery ?? []
  const [lightbox, setLightbox] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const stepLightbox = useCallback(
    (d: number) => setLightbox((cur) => (cur === null ? cur : (cur + d + gallery.length) % gallery.length)),
    [gallery.length],
  )
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') stepLightbox(1)
      else if (e.key === 'ArrowLeft') stepLightbox(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, closeLightbox, stepLightbox])

  const ctaPrimaryHref = p.ctaPrimary.href ?? program.ctaPrimary.href
  const ctaSecondaryHref = p.ctaSecondary?.href ?? program.ctaSecondary?.href
  const ctaTertiaryHref = p.ctaTertiary?.href ?? program.ctaTertiary?.href
  const ctaPrimaryTarget = /^https?:\/\//.test(ctaPrimaryHref ?? '') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const ctaSecondaryTarget = /^https?:\/\//.test(ctaSecondaryHref ?? '') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className="min-h-screen bg-[#f7f6f4]">
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
            className={`object-cover ${program.heroImagePosition ?? 'object-center'}`}
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
                          {course.manuals && course.manuals.length > 0 ? (
                            <div className="mt-2">
                              <p className="text-[11px] uppercase tracking-[0.08em] text-text-muted/80 font-semibold mb-1.5">
                                {pp.manualsLabel}
                              </p>
                              <ul className="flex flex-col gap-1.5">
                                {course.manuals.map((m, mi) => (
                                  <li
                                    key={mi}
                                    className="flex items-start gap-1.5 text-[13.5px] leading-snug flex-wrap"
                                  >
                                    <BookOpen size={13} className="mt-[3px] flex-shrink-0 text-teal opacity-70" aria-hidden />
                                    <ManualLink m={m} />
                                    {m.alternatives?.map((alt, ai) => (
                                      <span key={ai} className="inline-flex items-baseline gap-x-1.5">
                                        <span className="text-text-muted/50" aria-hidden>/</span>
                                        <ManualLink m={alt} />
                                      </span>
                                    ))}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : course.manual ? (
                            <p className="text-[12px] text-teal font-medium tracking-[0.04em] mt-0.5">
                              {pp.manualLabel}:{' '}
                              {course.manualHref ? (
                                <a
                                  href={course.manualHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-teal/30 underline-offset-2 hover:text-green-dark
                                    hover:decoration-green-dark/60 transition-colors duration-200"
                                >
                                  {course.manual}
                                </a>
                              ) : (
                                course.manual
                              )}
                            </p>
                          ) : null}
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

            {/* Testimonials */}
            {hasTestimonials && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                <SectionLabel icon={<Quote size={15} />}>{pp.testimonials}</SectionLabel>
                <div className="flex flex-col gap-4 mt-5">
                  {p.testimonials!.map((t, i) => (
                    <motion.figure
                      key={i}
                      className="bg-cream border border-beige-dark rounded-2xl p-6"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    >
                      <Quote size={22} className="text-teal/25 mb-2" aria-hidden />
                      <blockquote className="text-[15.5px] text-text-dark leading-[1.75]">
                        {t.quote}
                      </blockquote>
                      <figcaption className="flex items-center gap-3 mt-5">
                        {t.photo && (
                          <span className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-beige ring-1 ring-beige-dark">
                            <Image src={t.photo} alt={t.name} fill sizes="44px" className="object-cover" />
                          </span>
                        )}
                        <span className="flex flex-col">
                          <span className="text-[14px] font-semibold text-green-dark">{t.name}</span>
                          <span className="text-[13px] text-text-muted">{t.location}</span>
                        </span>
                      </figcaption>
                    </motion.figure>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Photo gallery */}
            {hasGallery && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                <SectionLabel icon={<Images size={15} />}>{pp.gallery}</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                  {p.gallery!.map((src, i) => (
                    <motion.button
                      key={src}
                      type="button"
                      onClick={() => setLightbox(i)}
                      aria-label={`${p.name}: deschide fotografia ${i + 1}`}
                      className={`group relative overflow-hidden rounded-xl bg-beige h-44 sm:h-56 cursor-pointer
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2
                        ${i === 0 ? 'col-span-2' : ''}`}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.08 + i * 0.06 }}
                    >
                      <Image
                        src={src}
                        alt={`${p.name}, fotografie ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <span
                        className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/15 transition-colors duration-300
                          flex items-center justify-center"
                        aria-hidden
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          w-10 h-10 rounded-full bg-white/90 text-green-dark flex items-center justify-center shadow-md">
                          <Images size={18} aria-hidden />
                        </span>
                      </span>
                    </motion.button>
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
                      <CheckCircle size={15} className="text-teal flex-shrink-0 mt-[3px]" />
                      <span className="flex-1 min-w-0 text-[15px] text-text-dark leading-[1.6]">{item}</span>
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
                      <Clock size={15} className="text-gold-deep flex-shrink-0 mt-[3px]" />
                      <span className="flex-1 min-w-0 text-[15px] text-text-dark leading-[1.6]">{item}</span>
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
                href={ctaPrimaryHref}
                {...ctaPrimaryTarget}
                className="w-full bg-teal text-white text-center py-4 px-6 rounded-xl text-[15px] font-semibold
                  hover:bg-green-dark transition-colors duration-200 shadow-sm"
              >
                {p.ctaPrimary.label}
              </a>
              {p.ctaSecondary && (
                <a
                  href={ctaSecondaryHref}
                  {...ctaSecondaryTarget}
                  className="w-full border-[1.5px] border-teal text-teal text-center py-3.5 px-6 rounded-xl
                    text-[14px] font-medium hover:bg-teal/5 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {p.downloadLabel && <Download size={14} aria-hidden />}
                  {p.ctaSecondary.label}
                </a>
              )}
              {p.ctaTertiary && (
                <a
                  href={ctaTertiaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(program.ctaTertiary?.download ? { download: true } : {})}
                  className="w-full border border-beige-dark text-text-muted py-3 px-6 rounded-xl
                    text-[13px] font-medium hover:border-teal hover:text-teal transition-all duration-200
                    flex items-center justify-center gap-2"
                >
                  {program.ctaTertiary?.download && <Download size={14} aria-hidden />}
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
              href={ctaPrimaryHref}
              {...ctaPrimaryTarget}
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

      {/* Lightbox galerie foto */}
      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${p.name}: fotografia ${lightbox + 1} din ${gallery.length}`}
          >
            <div className="absolute inset-0 bg-green-dark/85 backdrop-blur-sm" onClick={closeLightbox} aria-hidden />

            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Închide"
            >
              <X size={20} aria-hidden />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => stepLightbox(-1)}
                  className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                    text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fotografia anterioară"
                >
                  <ChevronLeft size={24} aria-hidden />
                </button>
                <button
                  onClick={() => stepLightbox(1)}
                  className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                    text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fotografia următoare"
                >
                  <ChevronRight size={24} aria-hidden />
                </button>
              </>
            )}

            <motion.div
              key={lightbox}
              className="relative w-full max-w-[1100px] aspect-[3/2] max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 0.68, 0, 1.2] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[lightbox]}
                alt={`${p.name}, fotografia ${lightbox + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {gallery.length > 1 && (
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/80 text-[13px] tracking-wide">
                {lightbox + 1} / {gallery.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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

function ManualLink({ m }: { m: { title: string; href?: string } }) {
  // No shop link → render the manual title as plain (non-linked) text.
  if (!m.href) {
    return <span className="text-teal font-medium">{m.title}</span>
  }
  return (
    <a
      href={m.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-1 text-teal font-medium hover:text-green-dark transition-colors duration-200"
    >
      <span className="underline decoration-teal/30 underline-offset-2 group-hover:decoration-green-dark/60">
        {m.title}
      </span>
      <ExternalLink
        size={11}
        className="self-center flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
        aria-hidden
      />
    </a>
  )
}
