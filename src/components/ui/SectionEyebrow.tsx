'use client'
import { m as motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function SectionEyebrow({ children, light, className = '' }: Props) {
  return (
    <motion.span
      className={`inline-block text-label font-semibold tracking-[0.11em] uppercase mb-4
        ${light ? 'text-gold' : 'text-teal'}
        ${className}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  )
}
