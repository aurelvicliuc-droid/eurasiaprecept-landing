'use client'
import dynamic from 'next/dynamic'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { useLanguage } from '@/lib/i18n/context'

const MapCanvas = dynamic(() => import('./LocationsMapCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-[460px] sm:h-[560px] rounded-2xl bg-beige-dark/30 animate-pulse" />,
})

export default function LocationsMap() {
  const { t } = useLanguage()
  const m = t.map

  return (
    <section id="harta" className="bg-beige-light py-24 scroll-mt-20" aria-labelledby="map-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-8 text-center">
          <SectionEyebrow>{m.eyebrow}</SectionEyebrow>
          <h2
            id="map-heading"
            className="font-display text-green-dark font-medium leading-tight mb-3
              text-[clamp(32px,4.2vw,50px)]"
          >
            {m.heading} <em className="not-italic text-teal">{m.headingEm}</em>
          </h2>
          <p className="text-[19px] text-text-muted max-w-[520px] mx-auto leading-[1.7]">
            {m.subtext}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <MapCanvas />
        </AnimatedSection>
      </div>
    </section>
  )
}
