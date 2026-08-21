'use client'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { LanguageProvider } from '@/lib/i18n/context'

/**
 * LazyMotion + domAnimation incarca doar animatiile si gesturile. Componenta
 * `motion` completa mai aduce si `drag` si motorul de proiectie pentru `layout`,
 * pe care site-ul asta nu le foloseste nicaieri (singurele `draggable={false}`
 * sunt atribute HTML). De aceea toate componentele importa `m as motion`.
 * `strict` face ca o folosire de `motion.*` sa arunce, nu sa incarce pe ascuns
 * pachetul intreg.
 *
 * MotionConfig reducedMotion="user" opreste animatiile de transform pentru cine
 * a cerut miscare redusa. Blocul din globals.css nu putea face asta: el zeroeaza
 * durate CSS, iar framer-motion scrie direct in style, din JavaScript.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>{children}</LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
