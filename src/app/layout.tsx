import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Providers from './Providers'
import { BASE_URL } from '@/lib/site'
import { programs } from '@/lib/programs-data'
import './globals.css'

// Fontul de brand - Founders Grotesk, găzduit local.
// Fișierele .woff2 au fost completate cu glifele ț/Ț (lipseau din familia originală).
const foundersGrotesk = localFont({
  src: [
    { path: './fonts/FoundersGrotesk-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/FoundersGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/FoundersGrotesk-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/FoundersGrotesk-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-founders',
  display: 'swap',
  // Founders Grotesk nu conține chirilice; textul rusesc cade pe fontul de sistem.
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  declarations: [
    // x-height-ul e 43.7% din em (față de ~48.6% la fontul folosit anterior), deci la
    // aceeași mărime în px textul apărea vizibil mai mic. Îl scalăm ca să se potrivească.
    { prop: 'size-adjust', value: '111%' },
    // Metricile originale (ascent 63% / descent 37%) sunt asimetrice: centrul cutiei de
    // text cade mult sub centrul optic al literelor, iar textul urcă în butoane.
    { prop: 'ascent-override', value: '78%' },
    { prop: 'descent-override', value: '22%' },
    { prop: 'line-gap-override', value: '0%' },
  ],
})

const TITLE = 'Precept Eurasia | Institut de Studiu Biblic'
const DESCRIPTION =
  'Atragem oameni într-o relație cu Dumnezeu prin cunoașterea profundă a Cuvântului Său. Programe biblice pentru toate vârstele, în 195 de țări, 111 limbi, 40+ ani de activitate.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s | Precept Eurasia',
  },
  description: DESCRIPTION,
  authors: [{ name: 'Precept Eurasia', url: BASE_URL }],
  creator: 'Precept Eurasia',
  publisher: 'Precept Eurasia',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_MD',
    url: BASE_URL,
    siteName: 'Precept Eurasia',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Precept Eurasia, Institut de Studiu Biblic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BASE_URL}/og-image.png`],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#183831',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Precept Eurasia',
  description: DESCRIPTION,
  url: BASE_URL,
  logo: `${BASE_URL}/precept-logomark.png`,
  email: 'contact@eurasiaprecept.org',
  sameAs: [
    'https://www.facebook.com/EurasiaPrecept',
    'https://www.youtube.com/@EurasiaPrecept',
    'https://precept.org',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Europa de Est și Eurasia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Programe de formare biblică',
    // Toate programele, luate din sursa unica de adevar. Inainte erau patru,
    // scrise de mana, din sapte.
    itemListElement: programs.map((program) => ({
      '@type': 'Course',
      name: program.name,
      url: `${BASE_URL}/programe/${program.slug}`,
    })),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`h-full ${foundersGrotesk.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        {/* Script simplu, nu next/script: acela e o componenta de client si isi
            injecteaza tagul dupa hidratare, deci schema nu ajungea niciodata in
            HTML-ul servit. Escaparea lui '<' e ceruta de documentatia Next. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
