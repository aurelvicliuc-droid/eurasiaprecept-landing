'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

type Tab = 'viziunea' | 'echipa' | 'filiale'

const tabs: { id: Tab; label: string }[] = [
  { id: 'viziunea', label: 'Viziunea' },
  { id: 'echipa', label: 'Echipa' },
  { id: 'filiale', label: 'Filiale' },
]

const teamMembers = [
  { initials: 'DA', name: 'David Arthur', role: 'Președinte Precept International' },
  { initials: 'KA', name: 'Kay Arthur', role: 'Fondator Precept Ministries International' },
  { initials: 'MO', name: 'Mia și Costel Oglice', role: 'Vicepreședinți Precept Global' },
  { initials: 'VF', name: 'Vasile Filat', role: 'Director Precept Eurasia' },
]

const branches = [
  { code: 'MD', name: 'Moldova — Chișinău', desc: 'Sediul central Precept Eurasia. Programe online și prezențiale pentru toată Eurasia.' },
  { code: 'UA', name: 'Ucraina', desc: 'Programe active, inclusiv pregătire pentru lucrul cu refugiații și comunități locale.' },
  { code: 'RO', name: 'România', desc: 'Parteneriat activ cu biserici și organizații pentru studiu biblic inductiv.' },
  { code: 'RU', name: 'Rusia', desc: 'Comunități de studiu biblic cu materiale în limba rusă.' },
  { code: '+32', name: '+32 alte țări', desc: 'Studenți și lideri formați în întreaga Eurasie și diaspora.' },
]

const visionBlocks = [
  { label: 'Misiunea', text: 'Să atragem oameni într-o relație cu Dumnezeu prin cunoașterea Cuvântului Său, folosind metoda inductivă de studiu biblic.' },
  { label: 'Metoda', text: 'Studiul inductiv al Bibliei — observă, interpretează, aplică. Fiecare student înțelege textul biblic în contextul său original.' },
  { label: 'Impactul', text: 'Peste 6.640 studenți în 36 de țări, cu materiale traduse în 195 de limbi, formând lideri care transmit mai departe.' },
  { label: 'Valorile', text: 'Fidelitate față de text, ucenicie practică, implicare în comunitate și formare de generații care să cunoască Cuvântul lui Dumnezeu.' },
]

export default function AboutModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('viziunea')

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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-green-dark/55 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal box */}
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
              <span
                id="about-modal-title"
                className="text-[13px] font-semibold tracking-[0.12em] uppercase text-text-muted"
              >
                Despre noi
              </span>
              <button
                onClick={onClose}
                className="w-[34px] h-[34px] rounded-full border border-beige-dark flex items-center justify-center
                  text-text-mid hover:bg-beige-dark hover:text-text-dark transition-all duration-200 cursor-pointer"
                aria-label="Închide"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Tabs */}
            <div
              className="flex px-7 pt-4 pb-0 border-b border-beige-dark flex-shrink-0 gap-0"
              role="tablist"
              aria-label="Secțiuni despre noi"
            >
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
                  aria-labelledby={`tab-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {activeTab === 'viziunea' && (
                    <div>
                      <p className="font-['var(--font-display)'] text-[22px] italic text-green-dark leading-[1.6]
                        border-l-[3px] border-teal pl-5 mb-6">
                        „A pregăti lideri care au o relație personală transformatoare cu Dumnezeu
                        prin studiul Cuvântului și sunt capabili să influențeze pe alții."
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {visionBlocks.map((b) => (
                          <div key={b.label} className="bg-beige-light rounded-[10px] p-5">
                            <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-teal mb-1.5 block">
                              {b.label}
                            </span>
                            <p className="text-[14px] text-text-dark leading-[1.65]">{b.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'echipa' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {teamMembers.map((m) => (
                        <div key={m.initials} className="bg-beige-light rounded-[10px] p-5 flex gap-3 items-start">
                          <div className="w-[46px] h-[46px] rounded-full bg-teal/15 flex items-center justify-center
                            font-['var(--font-display)'] italic text-[16px] text-teal font-medium flex-shrink-0"
                            aria-hidden="true">
                            {m.initials}
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-text-dark mb-0.5">{m.name}</p>
                            <p className="text-[12px] text-text-muted leading-[1.4]">{m.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'filiale' && (
                    <div className="flex flex-col gap-2.5">
                      {branches.map((b) => (
                        <div key={b.code} className="bg-beige-light rounded-[10px] p-4 flex items-center gap-4">
                          <div className="w-9 h-9 rounded-[4px] bg-teal/12 flex items-center justify-center
                            text-[11px] font-bold tracking-[0.08em] text-teal flex-shrink-0">
                            {b.code}
                          </div>
                          <div>
                            <p className="text-[15px] font-medium text-text-dark leading-none mb-1">{b.name}</p>
                            <p className="text-[13px] text-text-muted">{b.desc}</p>
                          </div>
                        </div>
                      ))}
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
