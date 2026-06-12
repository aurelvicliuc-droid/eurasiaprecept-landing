'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/translations'

const langs: Lang[] = ['ro', 'en', 'ru']

interface NavProps {
  onAboutOpen: () => void
}

export default function Nav({ onAboutOpen }: NavProps) {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: t.nav.programs, href: '/#programe' },
    { label: t.nav.about, href: '#', isAbout: true },
    { label: t.nav.contact, href: '/#contact' },
    { label: t.nav.shop, href: 'https://shop.eurasiaprecept.org', external: true },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-beige-dark/60'
            : 'bg-white border-b border-beige-dark'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Precept Eurasia — Acasă">
            <Image
              src="/Precept_LogomarkSmal.png"
              alt="Precept Eurasia"
              width={160}
              height={40}
              className="h-[32px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={link.isAbout ? (e) => { e.preventDefault(); onAboutOpen() } : undefined}
                  className="text-[14px] font-normal text-[#333] hover:text-teal transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2" role="group" aria-label="Select language">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-[13px] transition-colors duration-200 cursor-pointer uppercase
                    ${lang === l ? 'text-[#111] font-medium' : 'text-[#888] hover:text-[#333]'}`}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="https://web.eurasiaprecept.org/public/sign-in"
              className="bg-teal text-white px-[22px] py-[9px] rounded-[6px] text-[14px] font-medium
                hover:bg-green-dark transition-colors duration-200"
            >
              {t.nav.signIn}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-beige transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} className="text-text-dark" /> : <Menu size={22} className="text-text-dark" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-[68px]"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  onClick={link.isAbout ? (e) => { e.preventDefault(); onAboutOpen(); setMobileOpen(false) } : () => setMobileOpen(false)}
                  className="text-[22px] font-normal text-text-dark hover:text-teal transition-colors cursor-pointer border-b border-beige-dark pb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://web.eurasiaprecept.org/public/sign-in"
                className="mt-4 bg-teal text-white text-center py-4 rounded-lg text-[16px] font-medium"
              >
                {t.nav.signIn}
              </a>
              <div className="flex gap-4 mt-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[14px] cursor-pointer uppercase ${lang === l ? 'text-[#111] font-medium' : 'text-[#888]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
