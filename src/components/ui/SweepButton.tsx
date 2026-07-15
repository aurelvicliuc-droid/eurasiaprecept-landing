'use client'
import { ArrowRight } from 'lucide-react'

type Variant =
  | 'outline-dark'    // fundal deschis, contur închis
  | 'outline-light'   // fundal închis, contur deschis
  | 'outline-muted'   // fundal deschis, contur discret (acțiune terțiară)
  | 'solid-primary'   // fundal deschis, acțiunea principală (teal)
  | 'solid-spruce'    // fundal deschis, accent puternic
  | 'solid-ocean'     // fundal închis, acțiunea principală (Ocean, ca accentul din titlu)
  | 'solid-gold'      // fundal închis, accent

interface Props {
  children: React.ReactNode
  href?: string
  variant?: Variant
  arrow?: boolean
  external?: boolean
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  /** Iconiță înaintea textului (ex. Download). */
  icon?: React.ReactNode
  /** Forțează descărcarea fișierului în loc să-l deschidă. */
  download?: boolean
}

/**
 * Buton cu umplere animată la hover: fondul intră dintr-o margine în cealaltă
 * (scale-x pe origin-left), iar textul își schimbă culoarea peste el.
 * Se animă transform + color, nu width, ca să ruleze pe compositor.
 * Contrastele au fost verificate pentru fiecare variantă (text >= 4.5:1).
 */
const VARIANTS: Record<Variant, { shell: string; fill: string; label: string }> = {
  'outline-dark': {
    shell: 'border-green-dark/40 text-green-dark hover:border-green-dark',
    fill: 'bg-green-dark',
    label: 'group-hover:text-cream',
  },
  'outline-light': {
    shell: 'border-fog/50 text-fog hover:border-fog',
    fill: 'bg-fog',
    label: 'group-hover:text-green-dark',
  },
  'outline-muted': {
    shell: 'border-beige-dark text-text-muted hover:border-teal',
    fill: 'bg-teal',
    label: 'group-hover:text-white',
  },
  'solid-primary': {
    shell: 'border-teal bg-teal text-white hover:border-green-dark',
    fill: 'bg-green-dark',
    label: 'group-hover:text-white',
  },
  'solid-spruce': {
    shell: 'border-green-dark bg-green-dark text-white hover:border-teal',
    fill: 'bg-teal',
    label: 'group-hover:text-white',
  },
  // Ocean, aceeași culoare cu accentul din titlu. Text negru, nu alb: pe Ocean albul
  // dă doar 3.13:1, negrul dă 6.72:1.
  'solid-ocean': {
    shell: 'border-ocean bg-ocean text-flat-black hover:border-fog',
    fill: 'bg-fog',
    label: 'group-hover:text-green-dark',
  },
  'solid-gold': {
    shell: 'border-golden bg-golden text-green-dark hover:border-fog',
    fill: 'bg-fog',
    label: 'group-hover:text-green-dark',
  },
}

export default function SweepButton({
  children,
  href,
  variant = 'outline-dark',
  arrow = false,
  external = false,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  icon,
  download = false,
}: Props) {
  const v = VARIANTS[variant]

  const shell = `group relative isolate overflow-hidden inline-flex items-center justify-center gap-2
    border rounded-[6px] px-7 py-3.5 text-[14px] font-medium cursor-pointer
    transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed
    ${v.shell} ${className}`

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-left scale-x-0 group-hover:scale-x-100
          group-disabled:scale-x-0 transition-transform duration-[400ms] ease-out
          motion-reduce:transition-none ${v.fill}`}
      />
      {icon && <span className={`relative transition-colors duration-300 ${v.label}`}>{icon}</span>}
      <span className={`relative transition-colors duration-300 ${v.label}`}>{children}</span>
      {arrow && (
        <ArrowRight
          size={15}
          aria-hidden
          className={`relative transition-all duration-300 group-hover:translate-x-1 ${v.label}`}
        />
      )}
    </>
  )

  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    const dl = download ? { download: true } : {}
    return (
      <a href={href} {...ext} {...dl} className={shell}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={shell}>
      {inner}
    </button>
  )
}
