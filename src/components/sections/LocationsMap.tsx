'use client'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { useLanguage } from '@/lib/i18n/context'
import { locations } from '@/lib/locations'
import { countryName } from '@/lib/countries'

function MapSkeleton() {
  return <div className="w-full h-[460px] sm:h-[560px] rounded-2xl bg-beige-dark/30 animate-pulse" />
}

const MapCanvas = dynamic(() => import('./LocationsMapCanvas'), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

/**
 * Harta aduce leaflet + react-leaflet, adica ~150 KB de JavaScript, si sta jos
 * de tot in pagina. Importul dinamic singur nu ajuta: componenta se monta la
 * randarea paginii, deci chunk-ul pleca la descarcare oricum, imediat.
 * Il montam abia cand sectiunea se apropie de ecran, cu 400px inainte, ca harta
 * sa fie deja gata cand ajunge vizitatorul la ea.
 */
function LazyMap() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible(true)
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return <div ref={ref}>{visible ? <MapCanvas /> : <MapSkeleton />}</div>
}

export default function LocationsMap() {
  const { lang, t } = useLanguage()
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
          <p className="text-lead text-text-muted max-w-[600px] mx-auto">
            {m.subtext}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <LazyMap />
        </AnimatedSection>

        {/* Panza hartii nu spune nimic unui cititor de ecran, iar datele exista
            oricum in locations.ts. Aceeasi informatie, in text. */}
        <ul className="sr-only">
          {locations.map((l) => (
            <li key={`${l.country}-${l.city}`}>
              {countryName(l.country, lang)}, {l.city}
              {l.coordinator ? `, ${l.coordinator}` : ''}
              {l.email ? `, ${l.email}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
