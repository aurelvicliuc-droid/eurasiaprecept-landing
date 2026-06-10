import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Precept Eurasia — Institut de Studiu Biblic',
  description:
    'Misiunea noastră este să atragem oameni într-o relație cu Dumnezeu prin cunoașterea Cuvântului Său. Programe biblice în 195 de țări, 111 limbi, 40+ ani de activitate.',
  openGraph: {
    title: 'Precept Eurasia — Institut de Studiu Biblic',
    description: 'Programe biblice pentru toate vârstele — de la adolescenți până la misionari.',
    locale: 'ro_MD',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
