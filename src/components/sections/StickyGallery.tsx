'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { useLanguage } from '@/lib/i18n/context'

const C = '/carousel'

// Poze păstrate / featured
const FOUNDERS = `${C}/precept-founders.jpg`                                     // grup istoric Precept Ministries (Jack & Kay Arthur)
const KAY = `${C}/kayarthur.jpg`                                                 // Kay Arthur
const FESTIVAL = `${C}/584449220_1659615898632792_2399585120794362465_n.jpg`     // Festivalul Precept Moldova 2025
const VASILE = `${C}/vasilefilat.jpg`                                            // Vasile Filat
const CLASA = `${C}/491839674_1473685407225843_2576459391495508359_n.jpg`        // sală de studiu, tineri
const AMVON = `${C}/492032397_1473761967218187_161237512797718303_n.jpg`         // predicator la amvon

// Poze noi
const N = [
  'g-graduation.jpg',    // 0 - graduație cu steaguri
  'g-grup-pakistan.jpg', // 1 - grup mare Pakistan
  'g-copii.jpg',         // 2 - copii cu cărți
  'g-clasa-adulti.jpg',  // 3 - clasă adulți
  'g-masa-rotunda.jpg',  // 4 - masă rotundă
  'g-clasa-ucraina.jpg', // 5 - clasă Ucraina
  'g-tineri.jpg',        // 6 - tineri
  'g-citire-barbat.jpg', // 7 - bărbat citind (portret)
  'g-citire-femeie.jpg', // 8 - femeie citind (portret)
].map((f) => `${C}/${f}`)

type Img = { src: string; pos?: string }

// 5 cadre x 3 imagini = toate cele 15 poze, la marime plina.
// Efectul sticky costa aproximativ un ecran de scroll per cadru, deci numarul de cadre
// da lungimea sectiunii. Cadrele sunt de 52vh (nu 70vh, cum erau initial), ca sectiunea
// sa ramana mai scurta desi are toate pozele.
const FRAMES: Img[][] = [
  [{ src: FOUNDERS, pos: 'object-center' }, { src: KAY, pos: 'object-center' }, { src: FESTIVAL, pos: 'object-center' }],
  [{ src: VASILE, pos: 'object-center' }, { src: N[0], pos: 'object-center' }, { src: N[1], pos: 'object-center' }],
  [{ src: CLASA, pos: 'object-center' }, { src: AMVON, pos: 'object-center' }, { src: N[2], pos: 'object-center' }],
  [{ src: N[3], pos: 'object-center' }, { src: N[4], pos: 'object-center' }, { src: N[5], pos: 'object-center' }],
  [{ src: N[6], pos: 'object-center' }, { src: N[7] }, { src: N[8] }],
]

const FLAT: Img[] = FRAMES.flat()

function Frame({
  srcs,
  i,
  progress,
  range,
  targetScale,
  baseIndex,
  onOpen,
}: {
  srcs: Img[]
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  baseIndex: number
  onOpen: (idx: number) => void
}) {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    // Fiecare cadru: 52vh inaltime, lipit la 24vh de sus, deci sta centrat pe ecran.
    // Inaltimea cadrului da si scroll-ul per cadru, si golul din jurul pozei.
    <div className="sticky top-[24vh] h-[52vh] w-full flex items-center">
      <motion.div
        style={{ scale, transformOrigin: 'top center' }}
        className="w-full px-8 grid grid-cols-3 gap-6"
      >
        {srcs.map((img, j) => (
          <button
            key={j}
            type="button"
            onClick={() => onOpen(baseIndex + j)}
            aria-label={`Deschide fotografia ${baseIndex + j + 1}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer
              focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <Image
              src={img.src}
              alt=""
              fill
              quality={65}
              sizes="33vw"
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${img.pos ?? 'object-top'}`}
              draggable={false}
            />
            <span className="absolute inset-0 bg-green-dark/0 group-hover:bg-green-dark/15 transition-colors duration-300
              flex items-center justify-center" aria-hidden>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                w-10 h-10 rounded-full bg-white/90 text-green-dark flex items-center justify-center shadow-md">
                <Images size={18} aria-hidden />
              </span>
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}

export default function StickyGallery() {
  const { t } = useLanguage()
  const g = t.gallery
  const container = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // Lightbox
  const [lightbox, setLightbox] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const stepLightbox = useCallback(
    (d: number) => setLightbox((cur) => (cur === null ? cur : (cur + d + FLAT.length) % FLAT.length)),
    [],
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

  return (
    <section className="relative bg-beige-light pt-16" aria-labelledby="gallery-heading">
      {/* Titlu. Aceleasi margini ca pozele (px-4 pe mobil, px-8 pe desktop), ca sa fie
          aliniat cu ele in stanga; galeria e full-bleed, nu sta in containerul de 1200px. */}
      <div className="px-4 md:px-8">
        <AnimatedSection className="mb-4">
          <SectionEyebrow>{g.eyebrow}</SectionEyebrow>
          <h2
            id="gallery-heading"
            className="font-display text-green-dark font-medium leading-tight mb-3
              text-[clamp(32px,4.2vw,50px)]"
          >
            {g.heading} <em className="not-italic text-teal">{g.headingEm}</em>
          </h2>
          <p className="text-[16.5px] text-text-muted max-w-[520px] leading-[1.7]">{g.subtext}</p>
        </AnimatedSection>
      </div>

      {/* Mobile: galerie compactă, o poză pe rând, scroll normal */}
      <div className="md:hidden px-4 py-8 flex flex-col gap-3">
        {FLAT.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={`Deschide fotografia ${i + 1}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer
              focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <Image
              src={img.src}
              alt=""
              fill
              quality={65}
              sizes="100vw"
              className={`object-cover ${img.pos ?? 'object-top'}`}
              draggable={false}
            />
            <span className="absolute inset-0 bg-green-dark/0 group-active:bg-green-dark/15 transition-colors duration-200
              flex items-center justify-center" aria-hidden>
              <span className="w-9 h-9 rounded-full bg-white/85 text-green-dark flex items-center justify-center shadow-md">
                <Images size={16} aria-hidden />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Desktop: efect sticky (5 frame-uri × 70vh) */}
      <div ref={container} className="hidden md:block pb-[6vh]">
        {FRAMES.map((srcs, i) => {
          const n = FRAMES.length
          const targetScale = 1 - (n - i - 1) * 0.06
          return (
            <Frame
              key={i}
              i={i}
              srcs={srcs}
              progress={scrollYProgress}
              range={[i / n, 1]}
              targetScale={targetScale}
              baseIndex={i * 3}
              onOpen={setLightbox}
            />
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && FLAT[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Fotografia ${lightbox + 1} din ${FLAT.length}`}
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
                src={FLAT[lightbox].src}
                alt={`Fotografia ${lightbox + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-white/80 text-[13px] tracking-wide">
              {lightbox + 1} / {FLAT.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
