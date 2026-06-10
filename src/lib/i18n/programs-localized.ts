import type { ProgramData } from '@/lib/programs-data'
import type { Lang } from './translations'
import type { ProgramTranslation } from './programs-en'
import { programsEn } from './programs-en'
import { programsRu } from './programs-ru'

export type LocalizedProgram = Omit<ProgramData, 'name' | 'tagline' | 'overview' | 'whoCanApply' | 'documents' | 'curriculum' | 'structure' | 'outcomes' | 'ctaPrimary' | 'ctaSecondary' | 'ctaTertiary' | 'downloadLabel'> & ProgramTranslation

export function localizeProgram(program: ProgramData, lang: Lang): LocalizedProgram {
  if (lang === 'en') {
    const t = programsEn[program.slug]
    if (t) return { ...program, ...t }
  }
  if (lang === 'ru') {
    const t = programsRu[program.slug]
    if (t) return { ...program, ...t }
  }
  // Romanian (default) — cast base data as LocalizedProgram
  return program as unknown as LocalizedProgram
}
