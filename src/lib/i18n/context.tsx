'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang, type T } from './translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ro')

  // <html lang> ramanea 'ro' si cand continutul era englez sau rus, deci
  // cititoarele de ecran il pronuntau cu fonetica romana. WCAG 3.1.1, nivel A.
  // Randarea de server pleaca tot cu 'ro', limba implicita a site-ului.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as T }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
