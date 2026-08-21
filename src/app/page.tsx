'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Programs from '@/components/sections/Programs'
import VisionBanner from '@/components/sections/VisionBanner'
import Testimonials from '@/components/sections/Testimonials'
import LocationsMap from '@/components/sections/LocationsMap'
import Shop from '@/components/sections/Shop'
import Contact from '@/components/sections/Contact'
import StickyGallery from '@/components/sections/StickyGallery'
import SkipLink from '@/components/ui/SkipLink'

// Modalul Despre noi aduce cu el locations.ts si countries.ts, dar se deschide
// doar la click. Il montam la prima deschidere si il lasam montat dupa aceea:
// AnimatePresence traieste inauntru, deci daca l-am demonta la inchidere s-ar
// pierde animatia de iesire.
const AboutModal = dynamic(() => import('@/components/modals/AboutModal'))

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [aboutMounted, setAboutMounted] = useState(false)

  const openAbout = () => {
    setAboutMounted(true)
    setAboutOpen(true)
  }

  return (
    <>
      <SkipLink />
      <Nav onAboutOpen={openAbout} overlay />

      <main id="continut">
        <Hero />
        <Stats />
        <Programs />
        <StickyGallery />

        <VisionBanner />

        <Testimonials />
        <LocationsMap />
        <Shop />
        <Contact />
      </main>

      <Footer onAboutOpen={openAbout} />

      {aboutMounted && <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />}
    </>
  )
}
