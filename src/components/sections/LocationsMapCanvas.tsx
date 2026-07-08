'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { LatLngBounds, divIcon } from 'leaflet'
import { locations } from '@/lib/locations'
import { useLanguage } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/translations'
import { countryName } from '@/lib/countries'

// Iconiță de pin verde (SVG) — mare când e depărtat, mică când e apropiat (zoom).
function pinIcon(zoom: number) {
  const w = Math.round(Math.max(18, 40 - zoom * 2.2))
  const h = Math.round(w * 1.32)
  const html = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 24 32" style="display:block;filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))">
    <path d="M12 0C5.9 0 1 4.9 1 11c0 7.7 9.4 19.4 10.2 20.4a1 1 0 0 0 1.6 0C13.6 30.4 23 18.7 23 11 23 4.9 18.1 0 12 0z" fill="#3d7a72" stroke="#ffffff" stroke-width="1.4"/>
    <circle cx="12" cy="11" r="4" fill="#ffffff"/>
  </svg>`
  return divIcon({
    html,
    className: 'precept-pin',
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
    tooltipAnchor: [0, -h + 4],
  })
}

function FitToLocations() {
  const map = useMap()
  useEffect(() => {
    const bounds = new LatLngBounds(locations.map((l) => [l.lat, l.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [36, 36] })
  }, [map])
  return null
}

function Markers({ lang }: { lang: Lang }) {
  const map = useMap()
  const [icon, setIcon] = useState(() => pinIcon(map.getZoom()))
  useMapEvents({ zoomend: () => setIcon(pinIcon(map.getZoom())) })

  return (
    <>
      {locations.map((l) => (
        <Marker key={`${l.country}-${l.city}`} position={[l.lat, l.lng]} icon={icon}>
          <Tooltip direction="top" opacity={1} className="precept-tip">
            <span className="block font-semibold text-[12.5px] text-green-dark leading-tight">{countryName(l.country, lang)} — {l.city}</span>
            <span className="block text-[12px] text-text-dark mt-[3px]">{l.coordinator}</span>
            {l.email ? <span className="block text-[11px] text-teal mt-[1px]">{l.email}</span> : null}
          </Tooltip>
        </Marker>
      ))}
    </>
  )
}

export default function LocationsMapCanvas() {
  const { lang } = useLanguage()
  return (
    <MapContainer
      center={[35, 40]}
      zoom={2}
      minZoom={2}
      scrollWheelZoom={false}
      worldCopyJump
      className="w-full h-[460px] sm:h-[560px] rounded-2xl overflow-hidden relative z-0 isolate border border-beige-dark"
    >
      {/* Bază cu etichete (nume de orașe/țări vizibile) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        subdomains="abcd"
      />
      <FitToLocations />
      <Markers lang={lang} />
    </MapContainer>
  )
}
