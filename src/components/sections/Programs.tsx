'use client'
import { m as motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { useLanguage } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/translations'

interface Program {
  id: string
  slug: string
  names: { ro: string; en: string; ru: string }
  descs: { ro: string; en: string; ru: string }
  badges: { ro: string; en: string; ru: string }
  badgeVariant: 'teal' | 'gold' | 'purple'
  featured?: boolean
  /** 'core' = treapta din parcursul de formare; 'special' = program paralel. */
  track: 'core' | 'special'
  /** Treapta, doar pentru parcurs: I, II, III-IV. */
  level?: string
  /** Fotografia de fundal a cardului (aceeasi cu hero-ul paginii programului). */
  image: string
}

const programs: Program[] = [
  {
    id: 'timotei',
    slug: 'scoala-timotei',
    track: 'special',
    image: '/programs/scoala-timotei.jpg',
    names: { ro: 'Școala Timotei', en: 'Timothy School', ru: 'Школа Тимофея' },
    descs: {
      ro: 'Tineri care au o relație personală cu Dumnezeu, sunt un exemplu pentru colegii lor și transmit Cuvântul altora.',
      en: 'Young people who have a personal relationship with God, are an example to their peers, and pass on the Word to others.',
      ru: 'Молодые люди, имеющие личные отношения с Богом, являющиеся примером для сверстников и передающие Слово другим.',
    },
    badges: { ro: 'Adolescenți', en: 'Teens', ru: 'Подростки' },
    badgeVariant: 'gold',
  },
  {
    id: 'baza',
    slug: 'institutul-biblic',
    track: 'core',
    level: 'I',
    image: '/programs/institutul-biblic.jpg',
    names: { ro: 'Institutul Biblic Precept', en: 'Precept Bible Institute', ru: 'Библейский институт Precept' },
    descs: {
      ro: 'Formarea liderilor care cunosc Biblia și transmit credibil Cuvântul lui Dumnezeu în viața de zi cu zi a bisericii.',
      en: 'Training leaders who know the Bible and credibly communicate the Word of God in the daily life of the church.',
      ru: 'Подготовка лидеров, знающих Библию и достоверно передающих Слово Божье в повседневной жизни церкви.',
    },
    badges: { ro: 'Nivel de bază', en: 'Foundational level', ru: 'Базовый уровень' },
    badgeVariant: 'teal',
    featured: true,
  },
  {
    id: 'copii',
    slug: 'lucrare-copii',
    track: 'special',
    image: '/programs/lucrare-copii.jpg',
    names: { ro: 'Lucrare cu Copiii', en: 'Ministry with Children', ru: 'Служение детям' },
    descs: {
      ro: 'Slujitori care înțeleg specificul lucrului cu copiii și le predau Cuvântul lui Dumnezeu, formând o fundație biblică solidă.',
      en: 'Servants who understand the specifics of working with children and teach them the Word of God, building a solid biblical foundation.',
      ru: 'Служители, понимающие специфику работы с детьми и обучающие их Слову Божьему, закладывающие твёрдый библейский фундамент.',
    },
    badges: { ro: 'Lucrare cu copiii', en: 'Children\'s ministry', ru: 'Детское служение' },
    badgeVariant: 'teal',
  },
  {
    id: 'english',
    slug: 'efnl',
    track: 'special',
    image: '/programs/efnl-cover.jpg',
    names: { ro: 'English for a New Life', en: 'English for a New Life', ru: 'Английский для новой жизни' },
    descs: {
      ro: 'Profesori de limbă engleză implicați în evanghelism și ucenicie, utilizând engleza ca instrument de misiune.',
      en: 'English language teachers engaged in evangelism and discipleship, using English as a mission tool.',
      ru: 'Преподаватели английского языка, участвующие в евангелизации и ученичестве, используя английский как инструмент миссии.',
    },
    badges: { ro: 'Specializat', en: 'Specialized', ru: 'Специализированный' },
    badgeVariant: 'purple',
  },
  {
    id: 'misiune',
    slug: 'misiune-sport',
    track: 'special',
    image: '/programs/misiune-sport.jpg',
    names: { ro: 'Școala Internațională de Misiune prin Sport', en: 'International School of Mission through Sport', ru: 'Международная школа миссии через спорт' },
    descs: {
      ro: 'Misionari care îndeplinesc marea poruncă a lui Hristos prin sport, ajungând la generații diferite cu Evanghelia.',
      en: 'Missionaries fulfilling the Great Commission of Christ through sport, reaching different generations with the Gospel.',
      ru: 'Миссионеры, исполняющие великое поручение Христа через спорт, достигая разные поколения с Евангелием.',
    },
    badges: { ro: 'Misionar', en: 'Missionary', ru: 'Миссионерский' },
    badgeVariant: 'purple',
  },
  {
    id: 'nivel2',
    slug: 'nivelul-2',
    track: 'core',
    level: 'II',
    image: '/programs/nivelul-2.jpg',
    names: { ro: 'Nivelul 2', en: 'Level 2', ru: 'Уровень 2' },
    descs: {
      ro: 'Pentru absolvenții nivelului de bază care doresc aprofundare și îndrumare continuă în studiul biblic inductiv.',
      en: 'For graduates of the foundational level who desire deeper training and continued guidance in inductive Bible study.',
      ru: 'Для выпускников базового уровня, желающих углублённой подготовки в индуктивном изучении Библии.',
    },
    badges: { ro: 'Nivel avansat', en: 'Advanced level', ru: 'Продвинутый уровень' },
    badgeVariant: 'teal',
  },
  {
    id: 'nivel34',
    slug: 'nivelul-3-4',
    track: 'core',
    level: 'III-IV',
    image: '/programs/nivelul-3-4.jpg',
    names: { ro: 'Nivelul 3-4', en: 'Levels 3-4', ru: 'Уровни 3-4' },
    descs: {
      ro: 'Lideri maturi care au convingeri biblice solide și predică eficient Cuvântul lui Dumnezeu, formând ucenici.',
      en: 'Mature leaders with solid biblical convictions who preach the Word of God effectively, making disciples.',
      ru: 'Зрелые лидеры с твёрдыми библейскими убеждениями, эффективно проповедующие Слово Божье и воспитывающие учеников.',
    },
    badges: { ro: 'Nivel avansat', en: 'Advanced level', ru: 'Продвинутый уровень' },
    badgeVariant: 'teal',
  },
]

// Pe card, peste fotografie: eticheta si bara de hover, in culorile brandului.
// Contrastele textului pe bara: teal+alb 5.78, Golden+Spruce 8.35, Clay+alb 5.70.
const accents = {
  teal:   { badge: 'bg-teal text-white',        bar: 'bg-teal text-white',        tint: 'bg-teal/30' },
  gold:   { badge: 'bg-golden text-green-dark', bar: 'bg-golden text-green-dark', tint: 'bg-golden/25' },
  purple: { badge: 'bg-clay text-white',        bar: 'bg-clay text-white',        tint: 'bg-clay/30' },
}

export default function Programs() {
  const { lang, t } = useLanguage()
  const p = t.programs

  // Ordinea conteaza: parcursul se citeste I -> II -> III-IV.
  const core = ['institutul-biblic', 'nivelul-2', 'nivelul-3-4']
    .map((slug) => programs.find((x) => x.slug === slug)!)
  const special = programs.filter((x) => x.track === 'special')

  return (
    <section className="bg-beige-light py-24" id="programe" aria-labelledby="programs-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-12">
          <SectionEyebrow>{p.eyebrow}</SectionEyebrow>
          <h2
            id="programs-heading"
            className="font-display text-green-dark font-medium leading-tight mb-3
              text-[clamp(32px,4.2vw,50px)]"
          >
            {p.heading.split(' ').slice(0, -2).join(' ')}{' '}
            <em className="not-italic text-teal">{p.heading.split(' ').slice(-2).join(' ')}</em>
          </h2>
          <p className="text-lead text-text-muted max-w-[600px]">{p.subtext}</p>
        </AnimatedSection>

        {/* Parcursul: trei trepte, in ordine */}
        <AnimatedSection delay={0.05}>
          <GroupHeader label={p.trackLabel} note={p.trackNote} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none">
            {core.map((prog, i) => (
              <li key={prog.id} className="relative">
                <ProgramCard prog={prog} lang={lang} cta={p.cta} index={i} />
                {/* Sageata dintre trepte, doar pe ecran lat */}
                {i < core.length - 1 && (
                  <span
                    className="hidden lg:flex absolute top-1/2 -right-5 w-5 -translate-y-1/2 items-center justify-center
                      text-beige-dark z-10"
                    aria-hidden="true"
                  >
                    <ChevronRight size={20} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </AnimatedSection>

      </div>

      {/* Programele paralele ies din containerul obisnuit de 1200px. Altfel cele 4 carduri
          ar fi cu ~94px mai inguste decat cele 3 trepte de sus; la 1575px ies egale. */}
      <div className="max-w-[1575px] mx-auto px-6 lg:px-12 mt-14">
        <AnimatedSection delay={0.1}>
          <GroupHeader label={p.specializedLabel} note={p.specializedNote} />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {special.map((prog, i) => (
              <ProgramCard key={prog.id} prog={prog} lang={lang} cta={p.cta} index={i} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function GroupHeader({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6 pb-3 border-b border-beige-dark">
      <h3 className="font-display text-[clamp(24px,2.6vw,32px)] font-medium text-green-dark leading-tight">{label}</h3>
      <span className="text-body text-text-muted">{note}</span>
    </div>
  )
}

function ProgramCard({
  prog,
  lang,
  cta,
  index,
}: {
  prog: Program
  lang: Lang
  cta: string
  index: number
}) {
  const a = accents[prog.badgeVariant]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/programe/${prog.slug}`}
        className={`group relative block overflow-hidden rounded-xl aspect-[4/3] cursor-pointer
          transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(24,56,49,0.22)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2
          ${prog.featured ? 'ring-[1.5px] ring-teal' : ''}`}
      >
        <Image
          src={prog.image}
          alt=""
          fill
          // Peste 1280 grila e xl:grid-cols-4 intr-un container de 1575px, deci
          // celula reala e ~23vw, nu 33vw, si se plafoneaza la 355px.
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1575px) 23vw, 355px"
          quality={65}
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
        />
        {/* Lizibilitate: intunecare pe jumatatea de jos, unde stau titlul si descrierea */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/72 to-transparent"
          aria-hidden="true"
        />
        {/* Tenta de brand, doar la hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${a.tint}`}
          aria-hidden="true"
        />

        {/* Treapta, doar pe parcurs */}
        {prog.level && (
          <span
            className="absolute top-4 left-4 z-10 min-w-9 h-9 px-2 rounded-full bg-fog/95 text-green-dark
              flex items-center justify-center text-label font-bold tracking-wide"
            aria-hidden="true"
          >
            {prog.level}
          </span>
        )}

        {/* Continut: sta jos, unde gradientul e cel mai inchis; urca odata cu bara la hover */}
        <div className="relative h-full p-5 flex flex-col justify-end
          transition-transform duration-300 ease-out group-hover:-translate-y-12
          motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <span className={`self-start text-tag font-semibold tracking-[0.08em] uppercase
            px-3 py-1.5 rounded-full mb-3 ${a.badge}`}>
            {prog.badges[lang]}
          </span>
          <h3 className="font-display text-title font-medium text-fog
            [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            {prog.names[lang]}
          </h3>
          <p className="text-copy text-fog/80 mt-2 line-clamp-2">
            {prog.descs[lang]}
          </p>
        </div>

        {/* Bara de brand: urca din marginea de jos la hover */}
        <div
          className={`absolute inset-x-0 bottom-0 h-12 px-5 flex items-center gap-2
            translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out
            motion-reduce:transition-none ${a.bar}`}
        >
          <span className="text-label font-semibold tracking-[0.07em] uppercase">{cta}</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </Link>
    </motion.div>
  )
}
