'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Globe, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/context'

const programLinks = [
  { slug: 'institutul-biblic', names: { ro: 'Institutul Biblic Precept', en: 'Precept Bible Institute', ru: 'Библейский институт' } },
  { slug: 'scoala-timotei', names: { ro: 'Școala TIMOTEI', en: 'TIMOTHY School', ru: 'Школа ТИМОФЕЙ' } },
  { slug: 'nivelul-2', names: { ro: 'Nivelul II', en: 'Level II', ru: 'Уровень II' } },
  { slug: 'nivelul-3-4', names: { ro: 'Nivelurile III–IV', en: 'Levels III–IV', ru: 'Уровни III–IV' } },
  { slug: 'efnl-a1', names: { ro: 'English for a New Life', en: 'English for a New Life', ru: 'Английский для новой жизни' } },
  { slug: 'misiune-sport', names: { ro: 'Misiune prin Sport', en: 'Mission through Sport', ru: 'Миссия через спорт' } },
  { slug: 'lucrare-copii', names: { ro: 'Lucrare cu Copii', en: 'Ministry with Children', ru: 'Служение детям' } },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/EurasiaPrecept',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@EurasiaPrecept',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const { lang, t } = useLanguage()
  const f = t.footer

  const navLinks = [
    { label: t.nav.programs, href: '/#programe' },
    { label: t.nav.about, href: '/#' },
    { label: t.nav.shop, href: 'https://shop.eurasiaprecept.org', external: true },
    { label: t.nav.contact, href: '/#contact' },
  ]

  return (
    <footer className="bg-green-dark text-white" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Precept Eurasia">
              <Image
                src="/Precept_LogomarkSmal.png"
                alt="Precept Eurasia"
                width={160}
                height={40}
                className="h-[28px] w-auto object-contain brightness-0 invert opacity-90 mb-5"
              />
            </Link>
            <p className="text-[13.5px] text-white/55 leading-[1.7] mb-6 max-w-[260px]">
              {f.desc}
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-gold/20 hover:text-gold
                    flex items-center justify-center text-white/50 transition-all duration-200"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/35 mb-5">
              {f.colNav}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[13.5px] text-white/55 hover:text-gold transition-colors duration-200
                      inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    {link.external && (
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/35 mb-5">
              {f.colPrograms}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {programLinks.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programe/${p.slug}`}
                    className="text-[13px] text-white/55 hover:text-gold transition-colors duration-200"
                  >
                    {p.names[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/35 mb-5">
              {f.colContact}
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              <li>
                <a href="mailto:contact@eurasiaprecept.org"
                  className="flex items-start gap-2.5 text-white/55 hover:text-gold transition-colors duration-200 group">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-teal-light group-hover:text-gold transition-colors" aria-hidden />
                  <span className="text-[13px] leading-[1.5]">contact@eurasiaprecept.org</span>
                </a>
              </li>
              <li>
                <a href="https://shop.eurasiaprecept.org" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-white/55 hover:text-gold transition-colors duration-200 group">
                  <ShoppingBag size={14} className="mt-0.5 flex-shrink-0 text-teal-light group-hover:text-gold transition-colors" aria-hidden />
                  <span className="text-[13px] leading-[1.5]">shop.eurasiaprecept.org</span>
                </a>
              </li>
              <li>
                <a href="https://eurasiaprecept.org" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-white/55 hover:text-gold transition-colors duration-200 group">
                  <Globe size={14} className="mt-0.5 flex-shrink-0 text-teal-light group-hover:text-gold transition-colors" aria-hidden />
                  <span className="text-[13px] leading-[1.5]">eurasiaprecept.org</span>
                </a>
              </li>
            </ul>
            <a
              href="/#contact"
              className="inline-block mt-6 bg-gold/15 hover:bg-gold text-gold hover:text-green-dark
                border border-gold/30 hover:border-gold px-5 py-2.5 rounded-lg text-[12.5px] font-semibold
                transition-all duration-200"
            >
              {f.sendMessage}
            </a>
          </div>

        </div>
      </div>

      <div className="border-t border-white/8" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row
        items-center justify-between gap-3">
        <p className="text-[11.5px] text-white/30 text-center sm:text-left">
          © {new Date().getFullYear()} Precept Eurasia. {f.copyright}
        </p>
        <div className="flex items-center gap-5">
          <a href="https://precept.org" target="_blank" rel="noopener noreferrer"
            className="text-[11.5px] text-white/30 hover:text-white/60 transition-colors duration-200">
            Precept International
          </a>
          <span className="text-white/15">·</span>
          <a href="https://web.eurasiaprecept.org/public/sign-in"
            className="text-[11.5px] text-white/30 hover:text-white/60 transition-colors duration-200">
            {f.platform}
          </a>
        </div>
      </div>
    </footer>
  )
}
