'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, ShoppingBag } from 'lucide-react'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import AnimatedSection from '@/components/ui/AnimatedSection'

const contactInfo = [
  {
    icon: <Mail size={16} strokeWidth={2} className="text-teal" aria-hidden="true" />,
    label: 'Email',
    value: 'contact@eurasiaprecept.org',
    href: 'mailto:contact@eurasiaprecept.org',
  },
  {
    icon: <Globe size={16} strokeWidth={2} className="text-teal" aria-hidden="true" />,
    label: 'Site',
    value: 'eurasiaprecept.org',
    href: 'https://eurasiaprecept.org',
  },
  {
    icon: <ShoppingBag size={16} strokeWidth={2} className="text-teal" aria-hidden="true" />,
    label: 'Magazin',
    value: 'shop.eurasiaprecept.org',
    href: 'https://shop.eurasiaprecept.org',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    ;(e.target as HTMLFormElement).reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section className="bg-beige py-24" id="contact" aria-labelledby="contact-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-20 items-start">

          {/* Left */}
          <AnimatedSection direction="left">
            <SectionEyebrow>Contact</SectionEyebrow>
            <h2
              id="contact-heading"
              className="font-['var(--font-display)'] text-green-dark font-normal leading-tight mb-4
                text-[clamp(28px,3.5vw,42px)]"
            >
              <em className="italic text-teal">Scrie-ne</em> oricând
            </h2>
            <p className="text-[14px] text-teal leading-[1.7] mb-8">
              Ai întrebări despre programe sau vrei să te înscrii? Suntem bucuroși să te ajutăm.
            </p>

            <ul className="flex flex-col gap-4 mb-8" role="list">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-beige-light border border-beige-dark rounded-[8px] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-text-muted mb-0.5">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] text-text-dark hover:text-teal transition-colors duration-200"
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="flex gap-2.5" role="list" aria-label="Rețele sociale">
              <a
                href="https://facebook.com/eurasiaprecept"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-beige-light border border-beige-dark rounded-[8px] flex items-center justify-center
                  text-text-mid hover:bg-green-dark hover:text-white hover:border-green-dark transition-all duration-200"
                aria-label="Facebook Precept Eurasia"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/channel/UCgYeq0USm2CI7_2WVwm51Jw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-beige-light border border-beige-dark rounded-[8px] flex items-center justify-center
                  text-text-mid hover:bg-green-dark hover:text-white hover:border-green-dark transition-all duration-200"
                aria-label="YouTube Precept Eurasia"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                </svg>
              </a>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection direction="right" delay={0.15}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-[10px] font-semibold tracking-[0.12em] uppercase text-text-mid">
                    Nume
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Numele tău"
                    required
                    className="bg-cream border border-beige-dark rounded-[6px] px-3.5 py-[11px] text-[13.5px]
                      text-text-dark font-light placeholder:text-text-muted outline-none
                      focus:border-teal transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-[10px] font-semibold tracking-[0.12em] uppercase text-text-mid">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="email@exemplu.com"
                    required
                    className="bg-cream border border-beige-dark rounded-[6px] px-3.5 py-[11px] text-[13.5px]
                      text-text-dark font-light placeholder:text-text-muted outline-none
                      focus:border-teal transition-colors duration-200"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="text-[10px] font-semibold tracking-[0.12em] uppercase text-text-mid">
                  Subiect
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Despre ce dorești să ne scrii?"
                  className="bg-cream border border-beige-dark rounded-[6px] px-3.5 py-[11px] text-[13.5px]
                    text-text-dark font-light placeholder:text-text-muted outline-none
                    focus:border-teal transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-[10px] font-semibold tracking-[0.12em] uppercase text-text-mid">
                  Mesaj
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Scrie mesajul tău aici..."
                  required
                  rows={5}
                  className="bg-cream border border-beige-dark rounded-[6px] px-3.5 py-[11px] text-[13.5px]
                    text-text-dark font-light placeholder:text-text-muted outline-none resize-y min-h-[110px]
                    focus:border-teal transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                <button
                  type="submit"
                  className="bg-green-dark text-white border-none px-7 py-3.5 rounded-[6px] text-[13px]
                    font-semibold tracking-[0.08em] uppercase cursor-pointer
                    hover:bg-green-mid transition-colors duration-200"
                >
                  Trimite mesajul →
                </button>

                {sent && (
                  <motion.p
                    className="text-[13px] text-teal"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                  >
                    ✓ Mulțumim! Vei primi răspunsul nostru pe email.
                  </motion.p>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
