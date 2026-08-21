import type { ProgramData } from '@/lib/programs-data'
import type { Lang } from './translations'
import type { ProgramTranslation } from './programs-en'

export type LocalizedProgram = Omit<ProgramData, 'name' | 'tagline' | 'overview' | 'whoCanApply' | 'documents' | 'curriculum' | 'structure' | 'outcomes' | 'ctaPrimary' | 'ctaSecondary' | 'ctaTertiary' | 'downloadLabel'> & ProgramTranslation

/**
 * Traducerile en si ru vin ca argument, nu din import.
 *
 * Inainte, fisierul importa dictionarele intregi si cauta in ele dupa slug la
 * executie. Turbopack nu poate elimina o cautare dinamica, deci toate cele 7
 * programe, in doua limbi, calatoreau in bundle-ul fiecarei pagini de program,
 * care randeaza un singur program. Acum pagina de server ia doar intrarea
 * programului curent si o paseaza mai departe.
 */
export function localizeProgram(
  program: ProgramData,
  lang: Lang,
  en: ProgramTranslation | null,
  ru: ProgramTranslation | null,
): LocalizedProgram {
  const t = lang === 'en' ? (en ?? undefined) : lang === 'ru' ? (ru ?? undefined) : undefined
  if (t) {
    // Manual shop links live only in the base (Romanian) data - single source of truth.
    // Merge them into the localized curriculum by position so every language uses the same links.
    const curriculum = t.curriculum.map((course, ci) => {
      const baseCourse = program.curriculum[ci]
      // Single-manual link (e.g. Institutul Biblic) - inherited from the base data by position.
      const merged = { ...course, manualHref: course.manualHref ?? baseCourse?.manualHref }
      const baseManuals = baseCourse?.manuals
      if (!course.manuals || !baseManuals) return merged
      return {
        ...merged,
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
  // Romanian (default) - cast base data as LocalizedProgram
  return program as unknown as LocalizedProgram
}
