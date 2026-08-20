'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { useLanguage } from '@/lib/i18n/context'

export default function Testimonials() {
  const { t } = useLanguage()
  const items = t.testimonials.items

  return (
    <section className="bg-beige py-24" aria-labelledby="testimonials-heading">
      <div className="px-6 lg:px-12">
        <AnimatedSection className="mb-12">
          <SectionEyebrow>{t.testimonials.eyebrow}</SectionEyebrow>
          <h2
            id="testimonials-heading"
            className="font-display text-green-dark font-medium leading-tight mb-3
              text-[clamp(32px,4.2vw,50px)]"
          >
            {t.testimonials.heading}{' '}
            <em className="not-italic text-teal">{t.testimonials.headingEm}</em>
          </h2>
          <p className="text-lead text-text-muted max-w-[580px]">
            {t.testimonials.subtext}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-cream border border-beige-dark rounded-xl p-8 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <span
                className="font-display text-[56px] text-beige-dark leading-none mb-1 font-semibold block select-none"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="flex flex-col flex-1">
                <p className="font-display text-lead text-text-dark mb-7">
                  {item.text}
                </p>
                <footer className="flex items-center gap-3 mt-auto pt-2">
                  <span className="relative w-13 h-13 rounded-full overflow-hidden flex-shrink-0 bg-teal/15 ring-1 ring-beige-dark">
                    <Image src={item.photo} alt={item.name} fill sizes="52px" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-body font-semibold text-text-dark leading-[1.3] mb-0.5">{item.name}</p>
                    <p className="text-meta text-text-muted">{item.role}</p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
