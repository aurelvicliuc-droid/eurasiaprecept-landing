'use client'
import { motion } from 'framer-motion'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function VisionBanner() {
  return (
    <div className="bg-beige-dark border-t border-[#c8c3b8] border-b py-[70px] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionEyebrow className="text-teal mb-6 block">Viziunea institutului</SectionEyebrow>
        <blockquote>
          <p className="font-['var(--font-display)'] italic text-green-dark leading-[1.55] max-w-[860px] mx-auto mb-5
            text-[clamp(20px,2.8vw,30px)]">
            „A pregăti lideri care au o relație personală transformatoare cu Dumnezeu
            prin studiul Cuvântului și sunt capabili să influențeze pe alții."
          </p>
          <footer className="text-[14px] text-text-muted tracking-[0.04em]">
            — Vasile Filat, Director Precept Eurasia
          </footer>
        </blockquote>
      </motion.div>
    </div>
  )
}
