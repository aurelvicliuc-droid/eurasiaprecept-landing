'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/context'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="relative bg-beige-light pt-[68px] overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/[0.03] rounded-full translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.04] rounded-full -translate-x-1/2 translate-y-1/4" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mb-6"
            >
              <span className="inline-block text-[11px] font-semibold tracking-[0.16em] uppercase text-teal bg-teal/10 px-3 py-1.5 rounded-full">
                {h.badge}
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              className="font-['var(--font-body)'] font-bold text-[#111] leading-[1.05] tracking-[-0.02em]
                text-[clamp(42px,6vw,76px)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {h.title1}<br />
              {h.title2}<br />
              {h.title3}{' '}
              <em className="not-italic text-teal">{h.titleAccent}</em>
            </motion.h1>
          </div>

          <div className="mt-10 lg:mt-0 lg:pl-12">
            <motion.div
              className="w-full h-px bg-gradient-to-r from-[#ccc] to-transparent mb-8 hidden lg:block"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              aria-hidden="true"
            />

            <motion.p
              className="text-[16px] text-[#555] leading-[1.75] mb-8 max-w-[440px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              {h.desc}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              <a
                href="#programe"
                className="inline-flex items-center gap-2 bg-teal text-white px-7 py-3.5 rounded-[6px]
                  text-[14px] font-medium hover:bg-green-dark transition-colors duration-200 group"
              >
                {h.ctaPrimary}
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-[#ccc] text-[#444] px-7 py-3.5 rounded-[6px]
                  text-[14px] font-normal hover:border-teal hover:text-teal transition-all duration-200"
              >
                {h.ctaSecondary}
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-16 lg:mt-20 h-px bg-beige-dark"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
