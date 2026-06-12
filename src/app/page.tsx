'use client'
import { useState } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import Programs from '@/components/sections/Programs'
import VisionBanner from '@/components/sections/VisionBanner'
import Testimonials from '@/components/sections/Testimonials'
import Shop from '@/components/sections/Shop'
import Contact from '@/components/sections/Contact'
import AboutModal from '@/components/modals/AboutModal'

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <Nav onAboutOpen={() => setAboutOpen(true)} />

      <main>
        <Hero />
        <Stats />
        <Programs />

        <VisionBanner />

        <Testimonials />
        <Shop />
        <Contact />
      </main>

      <Footer />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
