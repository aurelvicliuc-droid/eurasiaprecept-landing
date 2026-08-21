'use client'
import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Tine focusul intr-un dialog cat timp e deschis si il pune inapoi pe elementul
 * care l-a deschis la inchidere.
 *
 * Toate cele patru suprapuneri ale site-ului (Despre noi, cele doua lightbox-uri
 * si meniul mobil) declarau aria-modal dar nu faceau nimic din astea: cu Tab
 * ieseai in pagina de sub fundal, unde nu se vede nimic.
 *
 * onClose sta intr-un ref, nu in lista de dependente. Altfel o functie scrisa
 * inline in parinte, cum e onClose={() => setOpen(false)}, ar reface efectul la
 * fiecare randare si ar muta focusul inapoi la inceput de fiecare data.
 */
export function useFocusTrap(open: boolean, onClose?: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  // Actualizat intr-un efect, nu in randare: React 19 interzice scrisul in ref
  // in timpul randarii. Handler-ul de tastatura oricum citeste mai tarziu.
  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const node = ref.current
    if (!node) return

    const previous = document.activeElement as HTMLElement | null
    const first = node.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeRef.current?.()
        return
      }
      if (e.key !== 'Tab') return
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter((el) => el.offsetParent !== null || el === document.activeElement)
      if (items.length === 0) return
      const edge = e.shiftKey ? items[0] : items[items.length - 1]
      if (document.activeElement === edge || !node.contains(document.activeElement)) {
        e.preventDefault()
        ;(e.shiftKey ? items[items.length - 1] : items[0]).focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous?.focus?.()
    }
  }, [open])

  return ref
}
