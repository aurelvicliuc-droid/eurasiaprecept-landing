'use client'
import { motion } from 'framer-motion'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { useLanguage } from '@/lib/i18n/context'

export default function VisionBanner() {
  const { t } = useLanguage()
  return (
    <div className="bg-beige-dark border-t border-[#c8c3b8] border-b py-[70px] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow className="text-teal mb-6 block">{t.vision.eyebrow}</SectionEyebrow>
        <blockquote>
          <p className="font-['var(--font-display)'] italic text-green-dark leading-[1.55] max-w-[860px] mx-auto mb-5
            text-[clamp(20px,2.8vw,30px)]">
            {t.vision.quote}
          </p>
          <footer className="text-[15px] text-text-muted tracking-[0.04em]">
            {t.vision.author}
          </footer>
        </blockquote>
      </motion.div>
    </div>
  )
}
