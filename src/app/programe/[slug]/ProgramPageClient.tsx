'use client'
import { useState, useEffect } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, BookOpen, Clock, Download, ChevronLeft, ChevronRight, ExternalLink, Images, Quote, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { ProgramData } from '@/lib/programs-data'
import type { ProgramTranslation } from '@/lib/i18n/programs-en'
import Nav from '@/components/layout/Nav'
import SkipLink from '@/components/ui/SkipLink'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/lib/i18n/context'
import { useFocusTrap } from '@/lib/useFocusTrap'
import { localizeProgram } from '@/lib/i18n/programs-localized'
import SweepButton from '@/components/ui/SweepButton'

const badgeColors: Record<string, string> = {
  teal: 'bg-teal/10 text-teal border-teal/30',
  gold: 'bg-gold/10 text-[#7c7012] border-gold/40',
  purple: 'bg-clay/10 text-clay border-clay/30',
  green: 'bg-green-mid/10 text-green-mid border-green-mid/30',
}

/**
 * Intrarea sectiunilor, in CSS (vezi .precept-enter din globals.css).
 * Inainte, fiecare sectiune era un <motion.*> cu initial={{opacity:0}}, deci
 * HTML-ul servit al paginii de program era complet invizibil pana se hidrata
 * bundle-ul. Acum sunt aceleasi valori, dar animate de browser din primul cadru.
 * 'easeOut' e curba implicita a lui framer-motion pentru tween-uri.
 */
const EASE_OUT = 'cubic-bezier(0, 0, 0.58, 1)'

function enter(v: {
  x?: number
  y?: number
  scale?: number
  duration: number
  delay?: number
}): React.CSSProperties {
  return {
    ...(v.x !== undefined && { '--enter-x': `${v.x}px` }),
    ...(v.y !== undefined && { '--enter-y': `${v.y}px` }),
    ...(v.scale !== undefined && { '--enter-scale': `${v.scale}` }),
    '--enter-duration': `${v.duration}ms`,
    '--enter-ease': EASE_OUT,
    ...(v.delay && { '--enter-delay': `${v.delay}ms` }),
  } as React.CSSProperties
}

// Vezi comentariul din src/app/page.tsx: montat la prima deschidere, lasat montat.
const AboutModal = dynamic(() => import('@/components/modals/AboutModal'))

interface Props {
  program: ProgramData
  en: ProgramTranslation | null
  ru: ProgramTranslation | null
}

export default function ProgramPageClient({ program, en, ru }: Props) {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [aboutMounted, setAboutMounted] = useState(false)
  const { lang, t } = useLanguage()
  const pp = t.programPage

  const openAbout = () => {
    setAboutMounted(true)
    setAboutOpen(true)
  }

  const p = localizeProgram(program, lang, en, ru)

  const hasCurriculum = p.curriculum.length > 0
  const hasDocuments = p.documents.length > 0
  const hasStructure = p.structure.length > 0
  const hasOutcomes = p.outcomes && p.outcomes.length > 0
  const hasGallery = !!(p.gallery && p.gallery.length > 0)
  const hasTestimonials = !!(p.testimonials && p.testimonials.length > 0)

  // Lightbox pentru galeria foto
  const gallery = p.gallery ?? []
  const galleryCount = gallery.length
  const [lightbox, setLightbox] = useState<number | null>(null)
  const closeLightbox = () => setLightbox(null)
  const stepLightbox = (d: number) =>
    setLightbox((cur) => (cur === null ? cur : (cur + d + galleryCount) % galleryCount))

  // Escape, blocarea scroll-ului, focusul si trapa vin din hook. Aici raman doar
  // sagetile, care sunt specifice galeriei.
  const trapRef = useFocusTrap(lightbox !== null, closeLightbox)
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightbox((cur) => (cur === null ? cur : (cur + 1) % galleryCount))
      else if (e.key === 'ArrowLeft') setLightbox((cur) => (cur === null ? cur : (cur - 1 + galleryCount) % galleryCount))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, galleryCount])

  const ctaPrimaryHref = p.ctaPrimary.href ?? program.ctaPrimary.href
  const ctaSecondaryHref = p.ctaSecondary?.href ?? program.ctaSecondary?.href
  const ctaTertiaryHref = p.ctaTertiary?.href ?? program.ctaTertiary?.href
  const ctaPrimaryTarget = /^https?:\/\//.test(ctaPrimaryHref ?? '') ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const ctaSecondaryTarget = /^https?:\/\//.test(ctaSecondaryHref ?? '') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className="min-h-screen bg-[#f7f6f4]">
      <SkipLink />
      <Nav onAboutOpen={openAbout} />
      {aboutMounted && <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />}

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
            preload
            sizes="100vw"
            className={`object-cover ${program.heroImagePosition ?? 'object-center'}`}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-dark/90 via-green-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-dark/50 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 lg:px-16 max-w-[1200px] mx-auto left-0 right-0">
            <div
              className="precept-enter"
              style={{ '--enter-y': '24px', '--enter-duration': '600ms' } as React.CSSProperties}
            >
              <span className={`inline-block text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-1.5
                rounded-full border backdrop-blur-sm mb-4 ${badgeColors[program.badgeColor]}`}>
                {program.badge}
              </span>
              <h1 className="font-display text-white font-medium leading-tight mb-3
                text-[clamp(32px,4.6vw,60px)]">
                {p.name}
              </h1>
              <p className="text-white/80 text-[clamp(16px,1.6vw,19px)] max-w-[560px] leading-[1.55]">
                {p.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main id="continut" className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">

          {/* Left: main content */}
          <div className="flex flex-col gap-14">

            {/* Overview */}
            <section className="precept-enter" style={enter({ y: 20, duration: 550, delay: 100 })}>
              <SectionLabel icon={<BookOpen size={15} />}>{pp.aboutSection}</SectionLabel>
              <p className="text-[19px] text-text-dark leading-[1.8] mt-4">
                {p.overview}
              </p>
            </section>

            {/* Curriculum */}
            {hasCurriculum && (
              <section className="precept-enter" style={enter({ y: 20, duration: 550, delay: 150 })}>
                <SectionLabel icon={<BookOpen size={15} />}>{pp.curriculum}</SectionLabel>
                <div className="flex flex-col gap-4 mt-5">
                  {p.curriculum.map((course, i) => (
                    <div
                      key={i}
                      className="precept-enter border border-beige-dark rounded-xl p-5 bg-cream hover:border-teal/40 hover:shadow-sm transition-all duration-200"
                      style={enter({ y: 12, duration: 400, delay: 100 + i * 50 })}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-teal/10 text-teal
                          flex items-center justify-center text-[12px] font-bold">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-[19px] text-green-dark font-medium leading-snug">
                            {course.title}
                          </h3>
                          {course.manuals && course.manuals.length > 0 ? (
                            <div className="mt-2">
                              <p className="text-tag uppercase tracking-[0.08em] text-text-muted font-semibold mb-1.5">
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
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Outcomes */}
            {hasOutcomes && (
              <section className="precept-enter" style={enter({ y: 20, duration: 550, delay: 200 })}>
                <SectionLabel icon={<CheckCircle size={15} />}>{pp.outcomes}</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {p.outcomes!.map((outcome, i) => (
                    <div
                      key={i}
                      className="precept-enter bg-cream border border-beige-dark rounded-xl p-5"
                      style={enter({ scale: 0.97, duration: 350, delay: 100 + i * 60 })}
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center mb-3">
                        <ChevronRight size={16} className="text-teal" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-green-dark mb-1">{outcome.title}</h3>
                      <p className="text-[15.5px] text-text-muted leading-[1.65]">{outcome.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials */}
            {hasTestimonials && (
              <section className="precept-enter" style={enter({ y: 20, duration: 550, delay: 200 })}>
                <SectionLabel icon={<Quote size={15} />}>{pp.testimonials}</SectionLabel>
                <div className="flex flex-col gap-4 mt-5">
                  {p.testimonials!.map((t, i) => (
                    <figure
                      key={i}
                      className="precept-enter bg-cream border border-beige-dark rounded-2xl p-6"
                      style={enter({ y: 12, duration: 400, delay: 100 + i * 80 })}
                    >
                      <Quote size={22} className="text-teal/25 mb-2" aria-hidden />
                      <blockquote className="text-[17px] text-text-dark leading-[1.75]">
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
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* Photo gallery */}
            {hasGallery && (
              <section className="precept-enter" style={enter({ y: 20, duration: 550, delay: 200 })}>
                <SectionLabel icon={<Images size={15} />}>{pp.gallery}</SectionLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                  {p.gallery!.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setLightbox(i)}
                      aria-label={`${p.name}: deschide fotografia ${i + 1}`}
                      className={`precept-enter group relative overflow-hidden rounded-xl bg-beige h-44 sm:h-56 cursor-pointer
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2
                        ${i === 0 ? 'col-span-2' : ''}`}
                      style={enter({ scale: 0.97, duration: 400, delay: 80 + i * 60 })}
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
                    </button>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right: sticky sidebar */}
          <div className="lg:sticky lg:top-[84px] flex flex-col gap-5">

            {/* Who can apply */}
            {p.whoCanApply.length > 0 && (
              <div
                className="precept-enter bg-white border border-beige-dark rounded-2xl p-6 shadow-sm"
                style={enter({ x: 20, duration: 500, delay: 200 })}
              >
                <h3 className="font-display text-[18px] font-semibold text-green-dark mb-4">
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
              </div>
            )}

            {/* Structure */}
            {hasStructure && (
              <div
                className="precept-enter bg-white border border-beige-dark rounded-2xl p-6 shadow-sm"
                style={enter({ x: 20, duration: 500, delay: 280 })}
              >
                <h3 className="font-display text-[18px] font-semibold text-green-dark mb-4">
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
              </div>
            )}

            {/* Documents */}
            {hasDocuments && (
              <div
                className="precept-enter bg-white border border-beige-dark rounded-2xl p-6 shadow-sm"
                style={enter({ x: 20, duration: 500, delay: 340 })}
              >
                <h3 className="font-display text-[18px] font-semibold text-green-dark mb-4">
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
              </div>
            )}

            {/* CTAs */}
            <div className="precept-enter flex flex-col gap-3" style={enter({ y: 12, duration: 450, delay: 400 })}>
              <SweepButton
                href={ctaPrimaryHref}
                external={!!ctaPrimaryTarget.target}
                variant="solid-primary"
                className="w-full !rounded-xl !py-4 !text-[15px] !font-semibold shadow-sm"
              >
                {p.ctaPrimary.label}
              </SweepButton>
              {p.ctaSecondary && (
                <SweepButton
                  href={ctaSecondaryHref}
                  external={!!ctaSecondaryTarget.target}
                  variant="outline-dark"
                  icon={p.downloadLabel ? <Download size={14} aria-hidden /> : undefined}
                  className="w-full !rounded-xl"
                >
                  {p.ctaSecondary.label}
                </SweepButton>
              )}
              {p.ctaTertiary && (
                <SweepButton
                  href={ctaTertiaryHref}
                  external
                  download={!!program.ctaTertiary?.download}
                  variant="outline-muted"
                  icon={program.ctaTertiary?.download ? <Download size={14} aria-hidden /> : undefined}
                  className="w-full !rounded-xl !py-3 !text-[13px]"
                >
                  {p.ctaTertiary.label}
                </SweepButton>
              )}
            </div>

            {/* Contact nudge */}
            <p
              className="precept-enter text-[14px] text-text-muted text-center leading-[1.65]"
              style={enter({ duration: 400, delay: 500 })}
            >
              {pp.questions}{' '}
              <Link href="/#contact" className="text-teal underline underline-offset-2 hover:no-underline">
                {pp.contactUs}
              </Link>
              {' '}{pp.contactNudge}
            </p>

          </div>
        </div>
      </main>

      {/* Bottom CTA banner */}
      <div className="relative bg-beige py-20 overflow-hidden border-t border-beige-dark">
        {/* Subtle decorative circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold/6 pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-teal mb-4">
            {pp.applyBadge}
          </span>
          <h2 className="font-display text-green-dark text-[clamp(28px,3.6vw,46px)] font-medium mb-4 leading-tight">
            {pp.ctaBannerTitle}
          </h2>
          <p className="text-text-mid text-[19px] mb-10 max-w-[460px] mx-auto leading-[1.7]">
            {pp.ctaBannerDesc(p.name)}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <SweepButton
              href={ctaPrimaryHref}
              external={!!ctaPrimaryTarget.target}
              variant="solid-spruce"
              className="!px-8 !py-4 !rounded-xl !text-[15px] !font-semibold shadow-sm"
            >
              {p.ctaPrimary.label}
            </SweepButton>
            <SweepButton
              href="/#contact"
              variant="outline-dark"
              className="!px-8 !py-4 !rounded-xl !text-[15px]"
            >
              {pp.contactUs}
            </SweepButton>
          </div>
        </div>
      </div>

      {/* Lightbox galerie foto */}
      <AnimatePresence>
        {lightbox !== null && gallery[lightbox] && (
          <motion.div
            ref={trapRef}
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
                sizes="(max-width: 1180px) 100vw, 1100px"
                className="object-contain"
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
      <h2 className="font-display text-[clamp(20px,2.1vw,25px)] font-medium text-green-dark leading-tight">{children}</h2>
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
