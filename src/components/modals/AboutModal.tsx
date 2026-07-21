'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/context'
import { locations } from '@/lib/locations'
import { countryName } from '@/lib/countries'

interface Props {
  open: boolean
  onClose: () => void
}

type Tab = 'viziunea' | 'echipa' | 'filiale'

const VISION_CARD_STYLES = [
  { bg: 'bg-[#183831]',   label: 'text-[#9dbdbd]',  text: 'text-white/90' },
  { bg: 'bg-[#2e5a52]',   label: 'text-white/60',   text: 'text-white/90' },
  { bg: 'bg-[#e5d350]',   label: 'text-[#183831]',  text: 'text-[#183831]' },
  { bg: 'bg-[#f1f1ee] border border-[#cccbc2]', label: 'text-[#2e5a52]', text: 'text-[#183831]' },
]

const VISION_CARD_SYMBOLS = [
  /* Cross - Misiunea */
  <svg key="cross" viewBox="0 0 80 80" width={72} height={72} fill="currentColor" className="text-white">
    <rect x="36" y="8" width="8" height="64" rx="2"/>
    <rect x="12" y="28" width="56" height="8" rx="2"/>
  </svg>,
  /* Open book - Metoda */
  <svg key="book" viewBox="0 0 80 80" width={72} height={72} fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
    <path d="M40 18 C30 14 14 14 8 18 L8 62 C14 58 30 58 40 62 C50 58 66 58 72 62 L72 18 C66 14 50 14 40 18Z"/>
    <line x1="40" y1="18" x2="40" y2="62"/>
    <line x1="16" y1="28" x2="36" y2="28"/>
    <line x1="16" y1="36" x2="36" y2="36"/>
    <line x1="16" y1="44" x2="36" y2="44"/>
    <line x1="44" y1="28" x2="64" y2="28"/>
    <line x1="44" y1="36" x2="64" y2="36"/>
    <line x1="44" y1="44" x2="64" y2="44"/>
  </svg>,
  /* Globe - Impactul */
  <svg key="globe" viewBox="0 0 80 80" width={72} height={72} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#183831]">
    <circle cx="40" cy="40" r="28"/>
    <ellipse cx="40" cy="40" rx="12" ry="28"/>
    <line x1="12" y1="40" x2="68" y2="40"/>
    <path d="M15 26 Q40 32 65 26"/>
    <path d="M15 54 Q40 48 65 54"/>
  </svg>,
  /* Community circles - Valorile */
  <svg key="community" viewBox="0 0 80 80" width={72} height={72} fill="currentColor" className="text-[#2e5a52]">
    <circle cx="24" cy="32" r="13"/>
    <circle cx="56" cy="32" r="13"/>
    <circle cx="40" cy="54" r="13"/>
  </svg>,
]

export default function AboutModal({ open, onClose }: Props) {
  const { t, lang } = useLanguage()
  const a = t.about
  const [activeTab, setActiveTab] = useState<Tab>('viziunea')

  const branchesByCountry = useMemo(() => {
    const m = new Map<string, typeof locations>()
    for (const l of locations) {
      const arr = m.get(l.country) ?? []
      arr.push(l)
      m.set(l.country, arr)
    }
    return [...m.entries()].sort((x, y) => countryName(x[0], lang).localeCompare(countryName(y[0], lang)))
  }, [lang])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const tabs: { id: Tab; label: string }[] = [
    { id: 'viziunea', label: a.tabs.viziunea },
    { id: 'echipa', label: a.tabs.echipa },
    { id: 'filiale', label: a.tabs.filiale },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-green-dark/55 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="relative bg-cream rounded-2xl w-full max-w-[820px] max-h-[85vh] flex flex-col
              shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 0.68, 0, 1.2] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-5 pb-0 flex-shrink-0">
              <span id="about-modal-title" className="text-[13px] font-semibold tracking-[0.12em] uppercase text-text-muted">
                {t.nav.about}
              </span>
              <button
                onClick={onClose}
                className="w-[34px] h-[34px] rounded-full border border-beige-dark flex items-center justify-center
                  text-text-mid hover:bg-beige-dark hover:text-text-dark transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex px-7 pt-4 pb-0 border-b border-beige-dark flex-shrink-0 gap-0" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-[14px] border-b-[2.5px] -mb-px transition-all duration-200 cursor-pointer
                    ${activeTab === tab.id
                      ? 'text-teal border-teal font-medium'
                      : 'text-text-muted border-transparent hover:text-text-dark'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-7 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id={`panel-${activeTab}`}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {activeTab === 'viziunea' && (
                    <div>
                      <p className="font-display text-[20px] text-green-dark leading-[1.6]
                        border-l-[3px] border-teal pl-5 mb-5">
                        {t.vision.quote}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {a.vision.blocks.map((b, i) => (
                          <div
                            key={b.label}
                            className={`relative overflow-hidden rounded-[14px] p-5 ${
                              i === 0 || i === 3 ? 'col-span-2' : 'col-span-2 sm:col-span-1'
                            } ${VISION_CARD_STYLES[i].bg}`}
                          >
                            {/* Symbolic SVG decoration */}
                            <div className="absolute bottom-2 right-3 opacity-[0.13] pointer-events-none" aria-hidden>
                              {VISION_CARD_SYMBOLS[i]}
                            </div>
                            <span className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block relative z-10 ${VISION_CARD_STYLES[i].label}`}>
                              {b.label}
                            </span>
                            <p className={`leading-[1.65] relative z-10 ${VISION_CARD_STYLES[i].text} ${i === 0 || i === 3 ? 'text-[15.5px]' : 'text-[13px]'}`}>
                              {b.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'echipa' && (
                    <div>
                      <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-text-muted mb-4">
                        {a.team.heading}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {a.team.members.map((m) => (
                          <div key={m.initials} className="bg-beige-light rounded-[10px] p-5 flex gap-3 items-start">
                            <div className="w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 bg-teal/15">
                              <Image
                                src={m.photo}
                                alt={m.name}
                                width={46}
                                height={46}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <p className="text-[14px] font-medium text-text-dark mb-0.5">{m.name}</p>
                              <p className="text-[12px] text-text-muted leading-[1.4]">{m.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'filiale' && (
                    <div>
                      <div className="flex items-center justify-between mb-4 gap-3">
                        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-text-muted">
                          {a.branches.heading}
                        </p>
                        <button
                          onClick={() => {
                            onClose()
                            setTimeout(() => {
                              const el = document.getElementById('harta')
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                              else window.location.href = '/#harta'
                            }, 160)
                          }}
                          className="text-[13px] font-medium text-teal hover:text-green-dark transition-colors whitespace-nowrap cursor-pointer"
                        >
                          {a.branches.viewMap} →
                        </button>
                      </div>
                      <div className="flex flex-col gap-3">
                        {branchesByCountry.map(([country, items]) => (
                          <div key={country} className="bg-beige-light rounded-[10px] p-4">
                            <p className="text-[14px] font-semibold text-green-dark mb-2">
                              {countryName(country, lang)}
                              <span className="text-text-muted font-normal"> · {items.length}</span>
                            </p>
                            <div className="flex flex-col gap-1.5">
                              {items.map((l) => (
                                <div key={l.city} className="text-[13px] leading-snug">
                                  <span className="font-medium text-text-dark">{l.city}</span>
                                  {l.coordinator && <span className="text-text-muted">, {l.coordinator}</span>}
                                  {l.email && (
                                    <>
                                      {' · '}
                                      <a href={`mailto:${l.email}`} className="text-teal hover:underline break-all">
                                        {l.email}
                                      </a>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
