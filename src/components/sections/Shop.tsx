'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'

const SHOP_URL = 'https://shop.eurasiaprecept.org/ro/'

const products = [
  {
    id: 1,
    name: 'Învățătură peste Învățătură',
    desc: 'Studiu biblic inductiv aprofundat — metoda Precept Upon Precept.',
    badge: 'Seria',
    badgeGold: false,
    featured: false,
    imgBg: '#1e3a6e',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/invatsstura-romana.jpeg',
  },
  {
    id: 2,
    name: 'Seria „Doamne"',
    desc: 'Studii profunde despre caracterul și atributele lui Dumnezeu.',
    badge: 'Seria',
    badgeGold: false,
    featured: false,
    imgBg: '#c9a8c8',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/seria-doamne-romana.jpeg',
  },
  {
    id: 3,
    name: 'Descoperă Tu Însuți',
    desc: 'Studii accesibile pentru cei care încep studiul biblic inductiv.',
    badge: 'Seria',
    badgeGold: false,
    featured: false,
    imgBg: '#a8b8d8',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/descopera-tu-romana.jpeg',
  },
  {
    id: 4,
    name: 'Cursuri de 40 de Minute',
    desc: 'Studii scurte, ideale pentru grupuri mici sau studiu rapid.',
    badge: 'Cursuri',
    badgeGold: true,
    featured: true,
    imgBg: '#dce8f0',
    img: 'https://admin.shop.eurasiaprecept.org/wp-content/uploads/2023/06/40_min_logo_english-1.jpg',
  },
]

export default function Shop() {
  return (
    <section className="bg-beige-light py-24" aria-labelledby="shop-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <AnimatedSection direction="left">
            <SectionEyebrow>Materiale de studiu</SectionEyebrow>
            <h2
              id="shop-heading"
              className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-2
                text-[clamp(28px,3.5vw,42px)]"
            >
              Resurse <em className="italic text-teal">biblice</em>
            </h2>
            <p className="text-[15px] text-text-muted max-w-[400px]">
              Materiale bazate direct pe textul Bibliei — pentru studiu individual, grup sau tabere.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 flex-shrink-0 border-[1.5px] border-text-dark text-text-dark
                px-6 py-3 rounded-[6px] text-[13px] font-medium tracking-[0.06em] uppercase
                hover:bg-text-dark hover:text-cream transition-all duration-200 whitespace-nowrap"
            >
              Vezi tot magazinul
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </AnimatedSection>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.a
              key={p.id}
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-250
                cursor-pointer bg-cream
                ${p.featured
                  ? 'border-gold/70 border-[1.5px] shadow-[0_2px_12px_rgba(201,168,76,0.12)]'
                  : 'border-beige-dark'
                }
                hover:shadow-[0_12px_32px_rgba(26,58,42,0.11)] hover:-translate-y-[3px]`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
              aria-label={`${p.name} — deschide magazinul`}
            >
              {/* Image area — colored bg matches cover, image centered */}
              <div
                className="relative w-full overflow-hidden"
                style={{ backgroundColor: p.imgBg, aspectRatio: '1 / 1' }}
              >
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 22vw"
                  className="object-contain p-6 transition-transform duration-350 group-hover:scale-[1.06]"
                />
                {/* Badge — top-left overlay */}
                <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-[0.12em] uppercase
                  px-2.5 py-1 rounded-[5px] backdrop-blur-sm
                  ${p.badgeGold
                    ? 'bg-gold text-green-dark'
                    : 'bg-black/20 text-white'
                  }`}>
                  {p.badge}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 px-5 py-4 gap-1.5">
                <h3 className="font-['var(--font-display)'] text-[17px] font-medium text-green-dark leading-[1.3]">
                  {p.name}
                </h3>
                <p className="text-[13px] text-text-muted leading-[1.55] flex-1">{p.desc}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold
                  tracking-[0.08em] uppercase text-teal group-hover:text-green-dark transition-colors duration-200">
                  Cumpără
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
