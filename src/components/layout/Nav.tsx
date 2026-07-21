'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'
import type { Lang } from '@/lib/i18n/translations'
import SweepButton from '@/components/ui/SweepButton'

const langs: Lang[] = ['ro', 'en', 'ru']

interface NavProps {
  onAboutOpen: () => void
  /** Bara stă peste un hero închis (doar pe home): transparentă sus, albă la scroll. */
  overlay?: boolean
}

export default function Nav({ onAboutOpen, overlay = false }: NavProps) {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Peste hero-ul închis, până la scroll, bara e transparentă cu text deschis.
  const onDark = overlay && !scrolled

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
            : overlay
              ? 'bg-transparent border-b border-fog/15'
              : 'bg-white border-b border-beige-dark'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Precept Eurasia, Acasă">
            <Image
              src="/precept-logomark.png"
              alt="Precept Eurasia"
              width={160}
              height={40}
              className={`h-[32px] w-auto object-contain transition-[filter] duration-300
                ${onDark ? 'brightness-0 invert' : ''}`}
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
                  className={`text-[14px] font-normal transition-colors duration-200 cursor-pointer
                    ${onDark ? 'text-fog/85 hover:text-fog' : 'text-text-dark hover:text-teal'}`}
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
                    ${lang === l
                      ? (onDark ? 'text-fog font-medium' : 'text-green-dark font-medium')
                      : (onDark ? 'text-fog/55 hover:text-fog' : 'text-text-muted hover:text-text-dark')}`}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>
            <SweepButton
              href="https://web.eurasiaprecept.org/public/sign-in"
              variant={onDark ? 'outline-light' : 'solid-primary'}
              className="!px-[22px] !py-[9px]"
            >
              {t.nav.signIn}
            </SweepButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer
              ${onDark ? 'hover:bg-fog/15' : 'hover:bg-beige'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen
              ? <X size={22} className={onDark ? 'text-fog' : 'text-text-dark'} />
              : <Menu size={22} className={onDark ? 'text-fog' : 'text-text-dark'} />}
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
              <SweepButton
                href="https://web.eurasiaprecept.org/public/sign-in"
                variant="solid-primary"
                className="mt-4 w-full !py-4 !rounded-lg !text-[18px]"
              >
                {t.nav.signIn}
              </SweepButton>
              <div className="flex gap-4 mt-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[14px] cursor-pointer uppercase ${lang === l ? 'text-green-dark font-medium' : 'text-text-muted'}`}
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
