'use client'
import dynamic from 'next/dynamic'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { useLanguage } from '@/lib/i18n/context'
import { locations, locationsCountryCount } from '@/lib/locations'

const MapCanvas = dynamic(() => import('./LocationsMapCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-[460px] sm:h-[560px] rounded-2xl bg-beige-dark/30 animate-pulse" />,
})

export default function LocationsMap() {
  const { t } = useLanguage()
  const m = t.map

  return (
    <section className="bg-beige-light py-24" aria-labelledby="map-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-8 text-center">
          <SectionEyebrow>{m.eyebrow}</SectionEyebrow>
          <h2
            id="map-heading"
            className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-3
              text-[clamp(28px,3.5vw,42px)]"
          >
            {m.heading} <em className="italic text-teal">{m.headingEm}</em>
          </h2>
          <p className="text-[16.5px] text-text-muted max-w-[520px] mx-auto leading-[1.7]">
            {m.subtext}
          </p>
          <p className="mt-4 text-[14px] font-semibold tracking-[0.05em] uppercase text-teal">
            {locations.length} {m.cities} · {locationsCountryCount} {m.countries}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <MapCanvas />
        </AnimatedSection>
      </div>
    </section>
  )
}
