'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Users, Globe, Plus, Trophy, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

type Category = 'all' | 'adolescenti' | 'tineri' | 'specializat'

interface Program {
  id: string
  slug: string
  name: string
  desc: string
  category: Exclude<Category, 'all'>
  badge: string
  badgeVariant: 'teal' | 'gold' | 'purple'
  featured?: boolean
  icon: React.ReactNode
}

const programs: Program[] = [
  {
    id: 'timotei',
    slug: 'scoala-timotei',
    name: 'Școala Timotei',
    desc: 'Tineri care au o relație personală cu Dumnezeu, sunt un exemplu pentru colegii lor și transmit Cuvântul altora.',
    category: 'adolescenti',
    badge: 'Adolescenți',
    badgeVariant: 'gold',
    icon: <BookOpen size={18} strokeWidth={1.5} />,
  },
  {
    id: 'baza',
    slug: 'institutul-biblic',
    name: 'Institutul Biblic Precept',
    desc: 'Formarea liderilor care cunosc Biblia și transmit credibil Cuvântul lui Dumnezeu în viața de zi cu zi a bisericii, înțelegând procesul uceniciei.',
    category: 'tineri',
    badge: 'Nivel de bază',
    badgeVariant: 'teal',
    featured: true,
    icon: <BookOpen size={18} strokeWidth={1.5} />,
  },
  {
    id: 'copii',
    slug: 'lucrare-copii',
    name: 'Lucrare cu Copii',
    desc: 'Slujitori care înțeleg specificul lucrului cu copiii și le predau Cuvântul lui Dumnezeu, formând o fundație biblică solidă în viața lor.',
    category: 'tineri',
    badge: 'Lucrare cu copii',
    badgeVariant: 'teal',
    icon: <Users size={18} strokeWidth={1.5} />,
  },
  {
    id: 'english',
    slug: 'efnl-a1',
    name: 'English for a New Life',
    desc: 'Profesori de limbă engleză care sunt implicați în evanghelism și ucenicie, utilizând engleza ca instrument de misiune.',
    category: 'specializat',
    badge: 'Specializat',
    badgeVariant: 'purple',
    icon: <Globe size={18} strokeWidth={1.5} />,
  },
  {
    id: 'misiune',
    slug: 'misiune-sport',
    name: 'Școala Internațională de Misiune',
    desc: 'Misionari care îndeplinesc marea poruncă a lui Hristos prin sport și slujire media, ajungând la generații diferite cu Evanghelia.',
    category: 'specializat',
    badge: 'Misionar',
    badgeVariant: 'purple',
    icon: <Globe size={18} strokeWidth={1.5} />,
  },
  {
    id: 'nivel2',
    slug: 'nivelul-2',
    name: 'Nivelul 2',
    desc: 'Pentru absolvenții nivelului de bază care doresc aprofundare și îndrumare continuă în studiul biblic inductiv.',
    category: 'specializat',
    badge: 'Nivel avansat',
    badgeVariant: 'teal',
    icon: <Plus size={18} strokeWidth={1.5} />,
  },
  {
    id: 'nivel34',
    slug: 'nivelul-3-4',
    name: 'Nivelul 3–4',
    desc: 'Lideri maturi care au convingeri biblice solide și predică eficient Cuvântul lui Dumnezeu, formând ucenici în jurul lor.',
    category: 'specializat',
    badge: 'Nivel avansat',
    badgeVariant: 'teal',
    icon: <Trophy size={18} strokeWidth={1.5} />,
  },
]

const filters: { label: string; value: Category }[] = [
  { label: 'Toate', value: 'all' },
  { label: 'Adolescenți', value: 'adolescenti' },
  { label: 'Tineri și adulți', value: 'tineri' },
  { label: 'Specializat', value: 'specializat' },
]

const badgeStyles = {
  teal:   'text-teal bg-teal/10',
  gold:   'text-green-dark bg-gold/20',
  purple: 'text-[#6b4f9e] bg-[rgba(107,79,158,0.1)]',
}

const catLabels: Record<Exclude<Category, 'all'>, string> = {
  adolescenti: 'Adolescenți',
  tineri: 'Tineri și adulți',
  specializat: 'Specializat',
}

export default function Programs() {
  const [active, setActive] = useState<Category>('all')

  const filtered = active === 'all' ? programs : programs.filter((p) => p.category === active)

  const groups =
    active === 'all'
      ? (['adolescenti', 'tineri', 'specializat'] as const).map((cat) => ({
          cat,
          label: catLabels[cat],
          items: programs.filter((p) => p.category === cat),
        }))
      : [{ cat: active as Exclude<Category, 'all'>, label: catLabels[active as Exclude<Category, 'all'>], items: filtered }]

  return (
    <section className="bg-beige-light py-24" id="programe" aria-labelledby="programs-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="mb-10">
          <SectionEyebrow>Facultăți</SectionEyebrow>
          <h2
            id="programs-heading"
            className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-3
              text-[clamp(28px,3.5vw,42px)]"
          >
            Alege <em className="italic text-teal">direcția ta</em>
          </h2>
          <p className="text-[15px] text-text-muted max-w-[520px]">
            Programe pentru toate vârstele — de la adolescenți până la misionari,
            de la baza biblică la leadership avansat.
          </p>
        </AnimatedSection>

        {/* Filter pills */}
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

        {/* Groups */}
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
                            {prog.badge}
                          </span>
                        </div>
                        <h3 className="font-['var(--font-display)'] text-[22px] font-medium text-green-dark mb-2.5 leading-[1.25]">
                          {prog.name}
                        </h3>
                        <p className="text-[13.5px] text-text-muted leading-[1.65] flex-1 mb-5">
                          {prog.desc}
                        </p>
                        <span
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] uppercase
                            text-teal group-hover:text-green-dark transition-colors duration-200"
                        >
                          Detalii complete
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-200 group-hover:translate-x-1.5"
                            aria-hidden="true"
                          />
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
