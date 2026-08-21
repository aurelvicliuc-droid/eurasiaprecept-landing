'use client'
import { useLanguage } from '@/lib/i18n/context'

/**
 * Prima oprire cu Tab pe orice pagina. Fara ea, ca sa ajungi la continut
 * treceai prin logo, patru linkuri de meniu, trei butoane de limba si butonul
 * de intrare, la fiecare navigare. WCAG 2.4.1.
 * Se vede doar cand primeste focus.
 */
export default function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#continut"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200]
        focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-green-dark focus:text-white
        focus:text-copy focus:font-medium focus:shadow-lg"
    >
      {t.nav.skipToContent}
    </a>
  )
}
