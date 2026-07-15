'use client'
import { motion } from 'framer-motion'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { useLanguage } from '@/lib/i18n/context'

export default function VisionBanner() {
  const { t } = useLanguage()
  return (
    <div className="bg-beige-dark border-t border-[#bdbbb1] border-b py-[70px] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow className="text-teal mb-6 block">{t.vision.eyebrow}</SectionEyebrow>
        <blockquote>
          <p className="font-['var(--font-display)'] text-green-dark leading-[1.55] max-w-[900px] mx-auto
            text-[clamp(19px,2.5vw,28px)]">
            {t.vision.quote}
          </p>
        </blockquote>
      </motion.div>
    </div>
  )
}
