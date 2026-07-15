import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { Libre_Baskerville } from 'next/font/google'
import Providers from './Providers'
import './globals.css'

// Fontul de brand — Founders Grotesk, găzduit local.
// Fișierele .woff2 au fost completate cu glifele ț/Ț (lipseau din familia originală).
const foundersGrotesk = localFont({
  src: [
    { path: './fonts/FoundersGrotesk-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/FoundersGrotesk-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/FoundersGrotesk-RegularItalic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/FoundersGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/FoundersGrotesk-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/FoundersGrotesk-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-founders',
  display: 'swap',
  // Founders Grotesk nu conține chirilice — textul rusesc cade pe fontul de sistem.
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
})

// Serif pentru titluri — se potrivește cu wordmark-ul serif din logo.
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-baskerville',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const BASE_URL = 'https://eurasiaprecept.org'
const TITLE = 'Precept Eurasia — Institut de Studiu Biblic'
const DESCRIPTION =
  'Atragem oameni într-o relație cu Dumnezeu prin cunoașterea profundă a Cuvântului Său. Programe biblice pentru toate vârstele — în 195 de țări, 111 limbi, 40+ ani de activitate.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s — Precept Eurasia',
  },
  description: DESCRIPTION,
  keywords: [
    'Precept Eurasia',
    'studiu biblic',
    'institut biblic',
    'formare spirituală',
    'ucenicie',
    'studiu biblic inductiv',
    'Precept Upon Precept',
    'cursuri biblice Moldova',
    'English for a New Life',
    'misiune prin sport',
    'Școala Timotei',
    'tineri creștini',
    'leadership creștin',
    'precept.org',
  ],
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
    languages: { ro: BASE_URL },
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
        alt: 'Precept Eurasia — Institut de Studiu Biblic',
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
    itemListElement: [
      { '@type': 'Course', name: 'Institutul Biblic Precept', url: `${BASE_URL}/programe/institutul-biblic` },
      { '@type': 'Course', name: 'Școala TIMOTEI', url: `${BASE_URL}/programe/scoala-timotei` },
      { '@type': 'Course', name: 'English for a New Life', url: `${BASE_URL}/programe/efnl` },
      { '@type': 'Course', name: 'Misiune prin Sport', url: `${BASE_URL}/programe/misiune-sport` },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`h-full ${foundersGrotesk.variable} ${libreBaskerville.variable}`}>
      <head>
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
          <Providers>{children}</Providers>
        </body>
    </html>
  )
}
