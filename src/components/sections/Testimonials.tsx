'use client'
import { motion } from 'framer-motion'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'

const testimonials = [
  {
    id: 1,
    text: 'Programul de bază mi-a schimbat complet modul în care citesc Biblia. Nu mai citesc pasiv — acum intru în dialog cu textul și îl înțeleg cu adevărat.',
    name: 'Maria A.',
    role: 'Absolventă Nivel de Bază, Chișinău',
    initials: 'MA',
  },
  {
    id: 2,
    text: 'Școala Timotei m-a ajutat să înțeleg că a fi creștin nu înseamnă să urmezi reguli, ci să ai o relație vie cu Dumnezeu. Le recomand tuturor tinerilor.',
    name: 'Daniel P.',
    role: 'Absolvent Timotei, 17 ani',
    initials: 'DP',
  },
  {
    id: 3,
    text: 'Ca pastor, credeam că știu Biblia bine. Precept m-a arătat că există niveluri profunde pe care nu le explorasem. Acum predic altfel, mai ancorat în text.',
    name: 'Ion C.',
    role: 'Pastor, absolvent Nivel 2',
    initials: 'IC',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-beige py-24" aria-labelledby="testimonials-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-12">
          <SectionEyebrow>Mărturii</SectionEyebrow>
          <h2
            id="testimonials-heading"
            className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-3
              text-[clamp(28px,3.5vw,42px)]"
          >
            Ce spun{' '}
            <em className="italic text-teal">studenții și absolvenții noștri</em>
          </h2>
          <p className="text-[15px] text-text-muted max-w-[480px]">
            Povești reale de transformare din comunitatea Precept Eurasia.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              className="bg-cream border border-beige-dark rounded-xl p-8 flex flex-col"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <span
                className="font-['var(--font-display)'] text-[48px] text-beige-dark leading-none mb-2 font-semibold block select-none"
                aria-hidden="true"
              >
                "
              </span>
              <blockquote>
                <p className="font-['var(--font-display)'] text-[16px] italic text-text-dark leading-[1.7] mb-6 flex-1">
                  {t.text}
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full bg-teal/15 flex items-center justify-center flex-shrink-0
                      font-['var(--font-display)'] italic text-[14px] text-teal font-medium"
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-text-dark leading-none mb-1">{t.name}</p>
                    <p className="text-[12px] text-text-muted">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
