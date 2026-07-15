'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { useLanguage } from '@/lib/i18n/context'
import SweepButton from '@/components/ui/SweepButton'

const SHOP_URL = 'https://shop.eurasiaprecept.org/ro/'

const products = [
  {
    id: 1,
    names: { ro: 'Învățătură peste Învățătură', en: 'Precept Upon Precept', ru: 'Устав за уставом' },
    descs: {
      ro: 'Studiu biblic inductiv aprofundat, metoda Precept Upon Precept.',
      en: 'In-depth inductive Bible study, the Precept Upon Precept method.',
      ru: 'Углублённое индуктивное изучение Библии, метод Precept Upon Precept.',
    },
    badge: { ro: 'Seria', en: 'Series', ru: 'Серия' },
    badgeGold: false,
    imgBg: '#183831',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/invatsstura-romana.jpeg',
  },
  {
    id: 2,
    names: { ro: 'Seria „Doamne"', en: '"Lord" Series', ru: 'Серия «Господи»' },
    descs: {
      ro: 'Studii profunde despre caracterul și atributele lui Dumnezeu.',
      en: 'In-depth studies on the character and attributes of God.',
      ru: 'Глубокие исследования характера и атрибутов Бога.',
    },
    badge: { ro: 'Seria', en: 'Series', ru: 'Серия' },
    badgeGold: false,
    imgBg: '#d99778',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/seria-doamne-romana.jpeg',
  },
  {
    id: 3,
    names: { ro: 'Descoperă Tu Însuți', en: 'Discover for Yourself', ru: 'Открой сам' },
    descs: {
      ro: 'Studii accesibile pentru cei care încep studiul biblic inductiv.',
      en: 'Accessible studies for those beginning inductive Bible study.',
      ru: 'Доступные исследования для начинающих индуктивное изучение Библии.',
    },
    badge: { ro: 'Seria', en: 'Series', ru: 'Серия' },
    badgeGold: false,
    imgBg: '#729999',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/descopera-tu-romana.jpeg',
  },
  {
    id: 4,
    names: { ro: 'Cursuri de 40 de Minute', en: '40-Minute Bible Studies', ru: '40-минутные исследования' },
    descs: {
      ro: 'Studii scurte, ideale pentru grupuri mici sau studiu rapid.',
      en: 'Short studies, ideal for small groups or quick study.',
      ru: 'Краткие исследования, идеальные для малых групп или быстрого изучения.',
    },
    badge: { ro: 'Cursuri', en: 'Studies', ru: 'Курсы' },
    badgeGold: true,
    imgBg: '#deddd7',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/40_min_logo_english-1.jpg',
  },
]

export default function Shop() {
  const { lang, t } = useLanguage()

  return (
    <section className="bg-beige-light py-24" aria-labelledby="shop-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <AnimatedSection direction="left">
            <SectionEyebrow>{t.shop.eyebrow}</SectionEyebrow>
            <h2
              id="shop-heading"
              className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-2
                text-[clamp(28px,3.5vw,42px)]"
            >
              {t.shop.heading} <em className="italic text-teal">{t.shop.headingEm}</em>
            </h2>
            <p className="text-[16.5px] text-text-muted max-w-[400px] leading-[1.7]">
              {t.shop.subtext}
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <SweepButton
              href={SHOP_URL}
              external
              variant="outline-dark"
              icon={<ExternalLink size={14} aria-hidden="true" />}
              className="flex-shrink-0 !px-6 !py-3 !text-[13px] tracking-[0.06em] uppercase whitespace-nowrap"
            >
              {t.shop.viewAll}
            </SweepButton>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.a
              key={p.id}
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-250
                cursor-pointer bg-cream
                ${p.badgeGold
                  ? 'border-gold/70 border-[1.5px] shadow-[0_2px_12px_rgba(201,168,76,0.12)]'
                  : 'border-beige-dark'
                }
                hover:shadow-[0_12px_32px_rgba(26,58,42,0.11)] hover:-translate-y-[3px]`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
              aria-label={`${p.names[lang]}: ${t.shop.buy}`}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ backgroundColor: p.imgBg, aspectRatio: '1 / 1' }}
              >
                <Image
                  src={p.img}
                  alt={p.names[lang]}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 22vw"
                  className="object-contain p-6 transition-transform duration-350 group-hover:scale-[1.06]"
                />
                <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-[0.12em] uppercase
                  px-2.5 py-1 rounded-[5px] backdrop-blur-sm
                  ${p.badgeGold ? 'bg-gold text-green-dark' : 'bg-black/20 text-white'}`}>
                  {p.badge[lang]}
                </span>
              </div>

              <div className="flex flex-col flex-1 px-5 py-4 gap-1.5">
                <h3 className="font-['var(--font-display)'] text-[17px] font-medium text-green-dark leading-[1.3]">
                  {p.names[lang]}
                </h3>
                <p className="text-[14.5px] text-text-muted leading-[1.65] flex-1">{p.descs[lang]}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold
                  tracking-[0.08em] uppercase text-teal group-hover:text-green-dark transition-colors duration-200">
                  {t.shop.buy}
                  <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
