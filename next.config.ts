import type { NextConfig } from 'next'

// O saptamana pentru fotografii, o zi pentru documente. Fisierele din public/ nu
// au hash in nume, deci daca cineva inlocuieste o poza pastrandu-i numele,
// atat dureaza pana se vede. stale-while-revalidate face ca reimprospatarea
// sa se intample in fundal, nu in fata vizitatorului.
const WEEK = 60 * 60 * 24 * 7
const DAY = 60 * 60 * 24

const IMAGE_DIRS = ['programs', 'carousel', 'team', 'testimonials']

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75],
    // Sursele din public/ au cel mult 2560px latime, iar optimizatorul nu
    // mareste imaginile. Treapta implicita de 3840 producea o a doua
    // transformare facturabila pentru acelasi rezultat.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Implicit sunt 4 ore, deci acelasi fisier se re-transforma de 42 de ori pe
    // saptamana pe un site unde pozele se schimba de cateva ori pe an.
    minimumCacheTTL: WEEK,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.shop.eurasiaprecept.org',
        pathname: '/wp-content/uploads/**',
      },
      // Pozele echipei din modalul Despre noi.
      {
        protocol: 'https',
        hostname: 'static.tildacdn.com',
      },
      // images.unsplash.com a fost scos: nu era folosit nicaieri, dar orice
      // adresa Unsplash putea fi trecuta prin optimizatorul acestui proiect,
      // pe cota lui. Un proxy de imagini deschis, fara sa aduca nimic.
    ],
  },

  async headers() {
    return [
      {
        // Implicit, Vercel serveste public/ cu max-age=0, must-revalidate, deci
        // fiecare vizita repeta ~31 de cereri conditionale pentru poze care nu
        // s-au schimbat.
        source: `/:dir(${IMAGE_DIRS.join('|')})/:path*`,
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${WEEK}, stale-while-revalidate=${DAY}` },
        ],
      },
      {
        source: '/forms/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${DAY}, stale-while-revalidate=${WEEK}` },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ]
  },
}

export default nextConfig
