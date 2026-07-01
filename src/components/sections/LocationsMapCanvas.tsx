'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { locations } from '@/lib/locations'

// Pin mare când e depărtat, mic când e apropiat (zoom).
function radiusForZoom(zoom: number) {
  return Math.max(4, Math.round(14 - zoom))
}

function FitToLocations() {
  const map = useMap()
  useEffect(() => {
    const bounds = new LatLngBounds(locations.map((l) => [l.lat, l.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [36, 36] })
  }, [map])
  return null
}

function Markers() {
  const map = useMap()
  const [radius, setRadius] = useState(() => radiusForZoom(map.getZoom()))
  useMapEvents({ zoomend: () => setRadius(radiusForZoom(map.getZoom())) })

  return (
    <>
      {locations.map((l) => (
        <CircleMarker
          key={`${l.country}-${l.city}`}
          center={[l.lat, l.lng]}
          radius={radius}
          pathOptions={{ color: '#ffffff', weight: 1.5, fillColor: '#2e7d32', fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -radius]}>
            {l.city}, {l.country}
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  )
}

export default function LocationsMapCanvas() {
  return (
    <MapContainer
      center={[35, 40]}
      zoom={2}
      minZoom={2}
      scrollWheelZoom={false}
      worldCopyJump
      className="w-full h-[460px] sm:h-[560px] rounded-2xl overflow-hidden relative z-0 isolate border border-beige-dark"
    >
      {/* Bază curată, fără etichete de orașe (evită numele în limba locală) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        subdomains="abcd"
      />
      <FitToLocations />
      <Markers />
    </MapContainer>
  )
}
