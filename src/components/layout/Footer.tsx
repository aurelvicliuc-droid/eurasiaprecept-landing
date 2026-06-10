import AnimatedSection from '@/components/ui/AnimatedSection'

const footerLinks = ['Programe', 'Despre noi', 'Magazin', 'Contact']

export default function Footer() {
  return (
    <footer className="bg-green-dark" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <AnimatedSection direction="left">
          <p className="text-[12px] text-white/40">
            © 2024 Precept Eurasia. Toate drepturile rezervate.
          </p>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <nav aria-label="Footer navigation">
            <ul className="flex gap-6" role="list">
              {footerLinks.map((link) => (
                <li key={link}>
                  <a
                    href={link === 'Contact' ? '#contact' : link === 'Programe' ? '#programe' : '#'}
                    className="text-[12px] text-white/40 hover:text-gold transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </AnimatedSection>
      </div>
    </footer>
  )
}
