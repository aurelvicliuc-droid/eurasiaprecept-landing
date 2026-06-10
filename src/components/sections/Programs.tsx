'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Users, Globe, Plus, Trophy, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { useLanguage } from '@/lib/i18n/context'

type Category = 'all' | 'adolescenti' | 'tineri' | 'specializat'

interface Program {
  id: string
  slug: string
  names: { ro: string; en: string; ru: string }
  descs: { ro: string; en: string; ru: string }
  badges: { ro: string; en: string; ru: string }
  category: Exclude<Category, 'all'>
  badgeVariant: 'teal' | 'gold' | 'purple'
  featured?: boolean
  icon: React.ReactNode
}

const programs: Program[] = [
  {
    id: 'timotei',
    slug: 'scoala-timotei',
    names: { ro: 'Școala Timotei', en: 'Timothy School', ru: 'Школа Тимофея' },
    descs: {
      ro: 'Tineri care au o relație personală cu Dumnezeu, sunt un exemplu pentru colegii lor și transmit Cuvântul altora.',
      en: 'Young people who have a personal relationship with God, are an example to their peers, and pass on the Word to others.',
      ru: 'Молодые люди, имеющие личные отношения с Богом, являющиеся примером для сверстников и передающие Слово другим.',
    },
    badges: { ro: 'Adolescenți', en: 'Teens', ru: 'Подростки' },
    category: 'adolescenti',
    badgeVariant: 'gold',
    icon: <BookOpen size={18} strokeWidth={1.5} />,
  },
  {
    id: 'baza',
    slug: 'institutul-biblic',
    names: { ro: 'Institutul Biblic Precept', en: 'Precept Bible Institute', ru: 'Библейский институт Precept' },
    descs: {
      ro: 'Formarea liderilor care cunosc Biblia și transmit credibil Cuvântul lui Dumnezeu în viața de zi cu zi a bisericii.',
      en: 'Training leaders who know the Bible and credibly communicate the Word of God in the daily life of the church.',
      ru: 'Подготовка лидеров, знающих Библию и достоверно передающих Слово Божье в повседневной жизни церкви.',
    },
    badges: { ro: 'Nivel de bază', en: 'Foundational level', ru: 'Базовый уровень' },
    category: 'tineri',
    badgeVariant: 'teal',
    featured: true,
    icon: <BookOpen size={18} strokeWidth={1.5} />,
  },
  {
    id: 'copii',
    slug: 'lucrare-copii',
    names: { ro: 'Lucrare cu Copii', en: 'Ministry with Children', ru: 'Служение детям' },
    descs: {
      ro: 'Slujitori care înțeleg specificul lucrului cu copiii și le predau Cuvântul lui Dumnezeu, formând o fundație biblică solidă.',
      en: 'Servants who understand the specifics of working with children and teach them the Word of God, building a solid biblical foundation.',
      ru: 'Служители, понимающие специфику работы с детьми и обучающие их Слову Божьему, закладывающие твёрдый библейский фундамент.',
    },
    badges: { ro: 'Lucrare cu copii', en: 'Children\'s ministry', ru: 'Детское служение' },
    category: 'tineri',
    badgeVariant: 'teal',
    icon: <Users size={18} strokeWidth={1.5} />,
  },
  {
    id: 'english',
    slug: 'efnl-a1',
    names: { ro: 'English for a New Life', en: 'English for a New Life', ru: 'Английский для новой жизни' },
    descs: {
      ro: 'Profesori de limbă engleză implicați în evanghelism și ucenicie, utilizând engleza ca instrument de misiune.',
      en: 'English language teachers engaged in evangelism and discipleship, using English as a mission tool.',
      ru: 'Преподаватели английского языка, участвующие в евангелизации и ученичестве, используя английский как инструмент миссии.',
    },
    badges: { ro: 'Specializat', en: 'Specialized', ru: 'Специализированный' },
    category: 'specializat',
    badgeVariant: 'purple',
    icon: <Globe size={18} strokeWidth={1.5} />,
  },
  {
    id: 'misiune',
    slug: 'misiune-sport',
    names: { ro: 'Escola Internațională de Misiune', en: 'International School of Mission', ru: 'Международная школа миссии' },
    descs: {
      ro: 'Misionari care îndeplinesc marea poruncă a lui Hristos prin sport, ajungând la generații diferite cu Evanghelia.',
      en: 'Missionaries fulfilling the Great Commission of Christ through sport, reaching different generations with the Gospel.',
      ru: 'Миссионеры, исполняющие великое поручение Христа через спорт, достигая разные поколения с Евангелием.',
    },
    badges: { ro: 'Misionar', en: 'Missionary', ru: 'Миссионерский' },
    category: 'specializat',
    badgeVariant: 'purple',
    icon: <Globe size={18} strokeWidth={1.5} />,
  },
  {
    id: 'nivel2',
    slug: 'nivelul-2',
    names: { ro: 'Nivelul 2', en: 'Level 2', ru: 'Уровень 2' },
    descs: {
      ro: 'Pentru absolvenții nivelului de bază care doresc aprofundare și îndrumare continuă în studiul biblic inductiv.',
      en: 'For graduates of the foundational level who desire deeper training and continued guidance in inductive Bible study.',
      ru: 'Для выпускников базового уровня, желающих углублённой подготовки в индуктивном изучении Библии.',
    },
    badges: { ro: 'Nivel avansat', en: 'Advanced level', ru: 'Продвинутый уровень' },
    category: 'specializat',
    badgeVariant: 'teal',
    icon: <Plus size={18} strokeWidth={1.5} />,
  },
  {
    id: 'nivel34',
    slug: 'nivelul-3-4',
    names: { ro: 'Nivelul 3–4', en: 'Levels 3–4', ru: 'Уровни 3–4' },
    descs: {
      ro: 'Lideri maturi care au convingeri biblice solide și predică eficient Cuvântul lui Dumnezeu, formând ucenici.',
      en: 'Mature leaders with solid biblical convictions who preach the Word of God effectively, making disciples.',
      ru: 'Зрелые лидеры с твёрдыми библейскими убеждениями, эффективно проповедующие Слово Божье и воспитывающие учеников.',
    },
    badges: { ro: 'Nivel avansat', en: 'Advanced level', ru: 'Продвинутый уровень' },
    category: 'specializat',
    badgeVariant: 'teal',
    icon: <Trophy size={18} strokeWidth={1.5} />,
  },
]

const badgeStyles = {
  teal:   'text-teal bg-teal/10',
  gold:   'text-green-dark bg-gold/20',
  purple: 'text-[#6b4f9e] bg-[rgba(107,79,158,0.1)]',
}

export default function Programs() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState<Category>('all')

  const p = t.programs

  const filters = [
    { label: p.filters.all, value: 'all' as Category },
    { label: p.filters.adolescenti, value: 'adolescenti' as Category },
    { label: p.filters.tineri, value: 'tineri' as Category },
    { label: p.filters.specializat, value: 'specializat' as Category },
  ]

  const catLabels: Record<Exclude<Category, 'all'>, string> = {
    adolescenti: p.groupLabels.adolescenti,
    tineri: p.groupLabels.tineri,
    specializat: p.groupLabels.specializat,
  }

  const filtered = active === 'all' ? programs : programs.filter((prog) => prog.category === active)
  const groups =
    active === 'all'
      ? (['adolescenti', 'tineri', 'specializat'] as const).map((cat) => ({
          cat,
          label: catLabels[cat],
          items: programs.filter((prog) => prog.category === cat),
        }))
      : [{ cat: active as Exclude<Category, 'all'>, label: catLabels[active as Exclude<Category, 'all'>], items: filtered }]

  return (
    <section className="bg-beige-light py-24" id="programe" aria-labelledby="programs-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-10">
          <SectionEyebrow>{p.eyebrow}</SectionEyebrow>
          <h2
            id="programs-heading"
            className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-3
              text-[clamp(28px,3.5vw,42px)]"
          >
            {p.heading.split(' ').slice(0, -2).join(' ')}{' '}
            <em className="italic text-teal">{p.heading.split(' ').slice(-2).join(' ')}</em>
          </h2>
          <p className="text-[16.5px] text-text-muted max-w-[520px] leading-[1.7]">{p.subtext}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-[12px] font-medium tracking-[0.08em] uppercase
                border-[1.5px] transition-all duration-200 cursor-pointer
                ${active === f.value
                  ? 'bg-green-dark border-green-dark text-white'
                  : 'bg-transparent border-beige-dark text-text-mid hover:border-green-mid hover:text-green-dark'
                }`}
              whileTap={{ scale: 0.97 }}
              aria-pressed={active === f.value}
            >
              {f.label}
            </motion.button>
          ))}
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {groups.map((group) => (
              <div key={group.cat} className="mb-12">
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-text-muted
                  mb-4 pb-3 border-b border-beige-dark">
                  {group.label}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {group.items.map((prog, i) => (
                    <motion.div
                      key={prog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/programe/${prog.slug}`}
                        className={`group bg-cream rounded-xl p-6 flex flex-col border transition-all duration-200 cursor-pointer
                          ${prog.featured
                            ? 'border-teal border-[1.5px]'
                            : 'border-beige-dark hover:border-teal/40'
                          } hover:shadow-[0_8px_24px_rgba(26,58,42,0.1)] hover:-translate-y-[2px] block`}
                      >
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-11 h-11 rounded-[10px] bg-beige-light flex items-center justify-center
                            text-text-mid flex-shrink-0">
                            {prog.icon}
                          </div>
                          <span className={`text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${badgeStyles[prog.badgeVariant]}`}>
                            {prog.badges[lang]}
                          </span>
                        </div>
                        <h3 className="font-['var(--font-display)'] text-[22px] font-medium text-green-dark mb-2.5 leading-[1.25]">
                          {prog.names[lang]}
                        </h3>
                        <p className="text-[15px] text-text-muted leading-[1.7] flex-1 mb-5">
                          {prog.descs[lang]}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] uppercase
                          text-teal group-hover:text-green-dark transition-colors duration-200">
                          {p.cta}
                          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
