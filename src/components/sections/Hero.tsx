'use client'
import { useState, useEffect, useCallback } from 'react'
import { m as motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/context'
import SweepButton from '@/components/ui/SweepButton'

/** Cadre largi, cu oameni. Prima e LCP-ul paginii, deci singura preincarcata. */
const SLIDES = [
  { src: '/programs/institutul-biblic.jpg', pos: 'object-[center_35%]' },
  { src: '/carousel/g-grup-pakistan.jpg', pos: 'object-center' },
  { src: '/programs/nivel34-gallery-1.jpg', pos: 'object-center' },
  { src: '/carousel/g-clasa-ucraina.jpg', pos: 'object-center' },
  { src: '/programs/scoala-timotei.jpg', pos: 'object-center' },
  { src: '/programs/nivel2-gallery-2.jpg', pos: 'object-center' },
  { src: '/carousel/491839674_1473685407225843_2576459391495508359_n.jpg', pos: 'object-center' },
  { src: '/programs/nivelul-2.jpg', pos: 'object-center' },
]
const INTERVAL = 6500

// Intrarea continutului din hero, in CSS (vezi .precept-enter din globals.css).
// Aceleasi valori pe care le avea framer-motion; 'easeOut' din framer inseamna
// cubic-bezier(0, 0, 0.58, 1). Diferenta e ca acum textul e vizibil din HTML,
// nu dupa ce se hidrateaza pagina.
const EASE_OUT = 'cubic-bezier(0, 0, 0.58, 1)'
const ENTER = {
  badge: { '--enter-y': '8px',  '--enter-duration': '400ms', '--enter-ease': EASE_OUT },
  title: { '--enter-y': '28px', '--enter-duration': '700ms', '--enter-delay': '100ms' },
  desc:  { '--enter-y': '20px', '--enter-duration': '600ms', '--enter-ease': EASE_OUT, '--enter-delay': '300ms' },
  cta:   { '--enter-y': '20px', '--enter-duration': '600ms', '--enter-ease': EASE_OUT, '--enter-delay': '420ms' },
} as Record<string, React.CSSProperties>

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero
  const reduced = useReducedMotion()

  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const advance = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), [])

  // Fără autoplay dacă utilizatorul a cerut mișcare redusă sau a pus pauză.
  useEffect(() => {
    if (reduced || !playing) return
    const id = setInterval(advance, INTERVAL)
    return () => clearInterval(id)
  }, [reduced, playing, advance])

  const animate = !reduced
  const next = (index + 1) % SLIDES.length

  return (
    <section
      className="relative isolate flex items-center overflow-hidden bg-black
        min-h-[clamp(580px,88svh,860px)]"
      aria-labelledby="hero-title"
    >
      {/* Slideshow */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animate ? 1.3 : 0, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0"
              initial={animate ? { scale: 1 } : false}
              animate={animate ? { scale: 1.07 } : undefined}
              transition={{ duration: (INTERVAL + 1300) / 1000, ease: 'linear' }}
            >
              <Image
                src={SLIDES[index].src}
                alt=""
                fill
                preload={index === 0}
                sizes="100vw"
                quality={65}
                className={`object-cover ${SLIDES[index].pos}`}
                draggable={false}
                onLoad={index === 0 ? () => setLoaded(true) : undefined}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Urmatorul cadru, cerut exact la adresa pe care o va cere cand intra in scena:
          acelasi fill, acelasi sizes, aceeasi calitate. Doar dupa ce primul cadru s-a
          incarcat, altfel ar concura cu LCP-ul chiar in momentul care conteaza.
          Prima tranzitie e la 6,5 secunde, deci timp e destul. */}
      {animate && loaded && (
        <div className="absolute inset-0 opacity-0 pointer-events-none -z-30" aria-hidden="true">
          <Image
            src={SLIDES[next].src}
            alt=""
            fill
            sizes="100vw"
            quality={65}
            className="object-cover"
            draggable={false}
          />
        </div>
      )}

      {/* Contrast: negru neutru, nu verde. Un overlay colorat s-ar citi ca un filtru peste
          fotografii si le-ar stinge culorile; negrul le lasa asa cum sunt.
          Puternic in stanga (unde sta textul), se stinge spre dreapta. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/92 via-black/72 to-black/25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-black/38" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-44 -z-10 bg-gradient-to-t from-black/75 to-transparent"
        aria-hidden="true"
      />

      {/* Conținut */}
      <div className="relative w-full max-w-[1200px] mx-auto px-6 lg:px-12 pt-[124px] pb-28">
        <div className="max-w-[760px]">
          <span
            className="precept-enter inline-block text-label font-semibold tracking-[0.12em] uppercase
              text-golden border border-golden/35 bg-golden/[0.07] px-3 py-1.5 rounded-full mb-7"
            style={ENTER.badge}
          >
            {h.badge}
          </span>

          <h1
            id="hero-title"
            className="precept-enter font-display font-medium text-fog leading-[1.04] tracking-[-0.01em]
              text-[clamp(46px,7.4vw,98px)] [text-wrap:balance]
              [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]"
            style={ENTER.title}
          >
            {h.title1} {h.title2}
            <br />
            {h.title3} <em className="not-italic text-ocean">{h.titleAccent}</em>
          </h1>

          <p
            className="precept-enter text-[clamp(18px,1.7vw,22px)] text-fog/80 leading-[1.7] mt-6 max-w-[540px]"
            style={ENTER.desc}
          >
            {h.desc}
          </p>

          <div className="precept-enter flex flex-wrap gap-3 mt-9" style={ENTER.cta}>
            <SweepButton href="#programe" variant="solid-gold" arrow>
              {h.ctaPrimary}
            </SweepButton>
            <SweepButton href="#contact" variant="outline-light">
              {h.ctaSecondary}
            </SweepButton>
          </div>
        </div>
      </div>

      {/* Control slideshow: puncte + pauză (WCAG 2.2.2, conținut care se schimbă singur) */}
      {!reduced && (
        <div className="absolute bottom-7 right-6 lg:right-12 z-10 flex items-center gap-3">
          {/* role="tablist" fara niciun tabpanel e o relatie ARIA inventata: singurul
              continut candidat e slideshow-ul, care e aria-hidden. Un grup de butoane
              cu aria-current spune adevarul.
              Tintele erau de 12x3 px, adica 36 px². px-1.5 pe buton si gap-0 pe
              container le duc la exact 24x24, cerinta 2.5.8, fara sa mute bara
              vizuala cu un pixel: ea sta intr-un span interior. */}
          <div className="flex items-center" role="group" aria-label="Fotografii fundal">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-current={i === index}
                aria-label={`Fotografia ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-6 px-1.5 flex items-center cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-fog focus-visible:ring-offset-2
                  focus-visible:ring-offset-black rounded-sm"
              >
                <span
                  aria-hidden="true"
                  className={`block h-[3px] rounded-full transition-all duration-300
                    ${i === index ? 'w-7 bg-fog' : 'w-3 bg-fog/40 group-hover:bg-fog/70'}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Oprește slideshow-ul' : 'Pornește slideshow-ul'}
            className="w-8 h-8 rounded-full border border-fog/30 text-fog/80 flex items-center justify-center
              hover:bg-fog/15 hover:text-fog transition-colors duration-200 cursor-pointer
              focus:outline-none focus-visible:ring-2 focus-visible:ring-fog"
          >
            {playing ? <Pause size={13} aria-hidden /> : <Play size={13} aria-hidden />}
          </button>
        </div>
      )}
    </section>
  )
}
