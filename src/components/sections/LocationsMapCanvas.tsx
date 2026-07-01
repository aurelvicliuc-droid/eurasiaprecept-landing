'use client'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { locations } from '@/lib/locations'

function FitToLocations() {
  const map = useMap()
  useEffect(() => {
    const bounds = new LatLngBounds(locations.map((l) => [l.lat, l.lng] as [number, number]))
    map.fitBounds(bounds, { padding: [36, 36] })
  }, [map])
  return null
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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToLocations />
      {locations.map((l) => (
        <CircleMarker
          key={`${l.country}-${l.city}`}
          center={[l.lat, l.lng]}
          radius={6}
          pathOptions={{ color: '#ffffff', weight: 1.5, fillColor: '#2e7d32', fillOpacity: 1 }}
        >
          <Tooltip direction="top" offset={[0, -4]}>
            {l.city}, {l.country}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
