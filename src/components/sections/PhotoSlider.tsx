'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `Fotografia ${i + 1}`,
}))

export default function PhotoSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const total = slides.length

  const go = useCallback(
    (next: number) => {
      const normalized = ((next % total) + total) % total
      setDirection(next > current || (current === total - 1 && next === 0) ? 1 : -1)
      setCurrent(normalized)
    },
    [current, total],
  )

  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4500)
  }, [total])

  useEffect(() => {
    startAuto()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startAuto])

  const move = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    go(current + dir)
    startAuto()
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
    exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.4, ease: 'easeIn' as const } }),
  }

  return (
    <div
      className="relative bg-beige-light overflow-hidden border-b border-beige-dark select-none"
      style={{ height: 'clamp(280px, 40vw, 520px)' }}
      aria-label="Galerie foto"
      role="region"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1)
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Placeholder — replace with <Image> when photos available */}
          <div className="w-full h-full flex flex-col items-center justify-center gap-3
            text-text-muted bg-beige-light">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="text-[12px] tracking-[0.12em] uppercase">
              {slides[current].label}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <button
        onClick={() => move(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
          bg-cream border border-beige-dark flex items-center justify-center
          hover:bg-beige-dark transition-all duration-200 cursor-pointer shadow-sm"
        aria-label="Fotografie anterioară"
      >
        <ChevronLeft size={20} className="text-text-dark" aria-hidden="true" />
      </button>
      <button
        onClick={() => move(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
          bg-cream border border-beige-dark flex items-center justify-center
          hover:bg-beige-dark transition-all duration-200 cursor-pointer shadow-sm"
        aria-label="Fotografie următoare"
      >
        <ChevronRight size={20} className="text-text-dark" aria-hidden="true" />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2"
        role="tablist"
        aria-label="Selectează fotografia"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (timerRef.current) clearInterval(timerRef.current); go(i); startAuto() }}
            role="tab"
            aria-selected={i === current}
            aria-label={`Fotografia ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer
              ${i === current ? 'bg-teal w-[22px]' : 'bg-beige-dark w-2 hover:bg-teal/50'}`}
          />
        ))}
      </div>
    </div>
  )
}
