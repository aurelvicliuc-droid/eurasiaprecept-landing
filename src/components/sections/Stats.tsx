'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/context'

const statValues = [
  { value: 195, suffix: '' },
  { value: 111, suffix: '' },
  { value: 9,   suffix: '' },
  { value: 40,  suffix: '+' },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1800
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])

  return (
    <span>
      {count}
      {suffix && (
        <sup className="text-[0.45em] align-super font-bold text-teal" aria-hidden="true">{suffix}</sup>
      )}
    </span>
  )
}

export default function Stats() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section ref={ref} className="bg-beige-light border-t border-beige-dark border-b" aria-labelledby="stats-heading">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center pt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p id="stats-heading" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted">
            {t.stats.label}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 border-t border-beige-dark">
          {statValues.map((stat, i) => (
            <motion.div
              key={i}
              className={`flex flex-col items-center gap-3.5 py-12 px-8
                ${i < statValues.length - 1 ? 'border-r border-beige-dark' : ''}
                ${i === 1 ? 'border-r-0 lg:border-r border-beige-dark' : ''}
                ${i === 0 ? 'border-b lg:border-b-0 border-beige-dark' : ''}
                ${i === 1 ? 'border-b lg:border-b-0 border-beige-dark' : ''}
              `}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <span
                className="font-display font-bold text-green-dark leading-none tracking-[-0.01em]
                  text-[clamp(42px,4.5vw,64px)]"
                aria-label={`${stat.value}${stat.suffix} ${t.stats.items[i].label}`}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </span>
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-text-muted text-center">
                {t.stats.items[i].label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
