'use client'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SkipLink from '@/components/ui/SkipLink'
import SweepButton from '@/components/ui/SweepButton'
import { useLanguage } from '@/lib/i18n/context'

/**
 * Fara fisierul asta, orice adresa gresita cadea pe 404-ul implicit al Next:
 * text englezesc, fara bara de navigare, fara footer, sub <html lang="ro">.
 * Nav nu primeste onAboutOpen aici, deci nu randeaza intrarea Despre noi;
 * modalul nu exista pe pagina asta.
 */
export default function NotFound() {
  const { t } = useLanguage()
  const n = t.notFound

  return (
    <>
      <SkipLink />
      <Nav onAboutOpen={() => {}} />

      <main
        id="continut"
        className="flex-1 flex items-center justify-center px-6 pt-[140px] pb-24 bg-beige-light"
      >
        <div className="max-w-[560px] text-center">
          <p className="text-label font-semibold tracking-[0.12em] uppercase text-teal mb-4">404</p>
          <h1 className="font-display text-green-dark font-medium leading-tight mb-4
            text-[clamp(32px,4.6vw,56px)]">
            {n.title}
          </h1>
          <p className="text-lead text-text-mid mb-9">{n.desc}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <SweepButton href="/" variant="solid-spruce" arrow>
              {n.cta}
            </SweepButton>
            <SweepButton href="/#programe" variant="outline-dark">
              {n.programs}
            </SweepButton>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
