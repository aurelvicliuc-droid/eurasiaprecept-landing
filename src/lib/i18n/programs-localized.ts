import type { ProgramData } from '@/lib/programs-data'
import type { Lang } from './translations'
import type { ProgramTranslation } from './programs-en'
import { programsEn } from './programs-en'
import { programsRu } from './programs-ru'

export type LocalizedProgram = Omit<ProgramData, 'name' | 'tagline' | 'overview' | 'whoCanApply' | 'documents' | 'curriculum' | 'structure' | 'outcomes' | 'ctaPrimary' | 'ctaSecondary' | 'ctaTertiary' | 'downloadLabel'> & ProgramTranslation

export function localizeProgram(program: ProgramData, lang: Lang): LocalizedProgram {
  const t = lang === 'en' ? programsEn[program.slug] : lang === 'ru' ? programsRu[program.slug] : undefined
  if (t) {
    // Manual shop links live only in the base (Romanian) data — single source of truth.
    // Merge them into the localized curriculum by position so every language uses the same links.
    const curriculum = t.curriculum.map((course, ci) => {
      const baseManuals = program.curriculum[ci]?.manuals
      if (!course.manuals || !baseManuals) return course
      return {
        ...course,
        manuals: course.manuals.map((m, mi) => {
          const base = baseManuals[mi]
          return {
            ...m,
            href: m.href ?? base?.href,
            alternatives: m.alternatives?.map((a, ai) => ({ ...a, href: a.href ?? base?.alternatives?.[ai]?.href })),
          }
        }),
      }
    })
    return { ...program, ...t, curriculum }
  }
  // Romanian (default) — cast base data as LocalizedProgram
  return program as unknown as LocalizedProgram
}
