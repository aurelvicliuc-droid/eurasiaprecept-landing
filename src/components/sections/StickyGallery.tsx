'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'

const C = '/carousel'

// Poze păstrate / featured
const FOUNDERS = `${C}/precept-founders.jpg`                                     // grup istoric Precept Ministries (Jack & Kay Arthur)
const KAY = `${C}/kayarthur.jpg`                                                 // Kay Arthur
const FESTIVAL = `${C}/584449220_1659615898632792_2399585120794362465_n.jpg`     // Festivalul Precept Moldova 2025
const VASILE = `${C}/vasilefilat.jpg`                                            // Vasile Filat
const CLASA = `${C}/491839674_1473685407225843_2576459391495508359_n.jpg`        // sală de studiu, tineri
const AMVON = `${C}/492032397_1473761967218187_161237512797718303_n.jpg`         // predicator la amvon

// Poze noi
const N = [
  'g-graduation.jpg',    // 0 — graduație cu steaguri
  'g-grup-pakistan.jpg', // 1 — grup mare Pakistan
  'g-copii.jpg',         // 2 — copii cu cărți
  'g-clasa-adulti.jpg',  // 3 — clasă adulți
  'g-masa-rotunda.jpg',  // 4 — masă rotundă
  'g-clasa-ucraina.jpg', // 5 — clasă Ucraina
  'g-tineri.jpg',        // 6 — tineri
  'g-citire-barbat.jpg', // 7 — bărbat citind (portret)
  'g-citire-femeie.jpg', // 8 — femeie citind (portret)
].map((f) => `${C}/${f}`)

type Img = { src: string; pos?: string }

// 5 frames × 3 images — pos overrides object-top per image if needed
const FRAMES: Img[][] = [
  [{ src: FOUNDERS, pos: 'object-center' }, { src: KAY, pos: 'object-center' }, { src: FESTIVAL, pos: 'object-center' }],
  [{ src: VASILE, pos: 'object-center' }, { src: N[0], pos: 'object-center' }, { src: N[1], pos: 'object-center' }],
  [{ src: CLASA, pos: 'object-center' }, { src: AMVON, pos: 'object-center' }, { src: N[2], pos: 'object-center' }],
  [{ src: N[3], pos: 'object-center' }, { src: N[4], pos: 'object-center' }, { src: N[5], pos: 'object-center' }],
  [{ src: N[6], pos: 'object-center' }, { src: N[7] }, { src: N[8] }],
]

const FLAT: Img[] = FRAMES.flat()

function Frame({
  srcs,
  i,
  progress,
  range,
  targetScale,
}: {
  srcs: Img[]
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    // Each frame is 70vh tall, sticky at 15vh from viewport top → centered in view
    <div className="sticky top-[15vh] h-[70vh] w-full flex items-center">
      <motion.div
        style={{ scale, transformOrigin: 'top center' }}
        className="w-full px-8 grid grid-cols-3 gap-6"
      >
        {srcs.map((img, j) => (
          <div
            key={j}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={img.src}
              alt=""
              fill
              quality={65}
              sizes="33vw"
              className={`object-cover ${img.pos ?? 'object-top'}`}
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function StickyGallery() {
  const container = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="relative bg-beige-light" aria-label="Photo gallery">
      {/* Mobile: galerie compactă, o poză pe rând, scroll normal */}
      <div className="md:hidden px-4 py-10 flex flex-col gap-3">
        {FLAT.map((img, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={img.src}
              alt=""
              fill
              quality={65}
              sizes="100vw"
              className={`object-cover ${img.pos ?? 'object-top'}`}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Desktop: efect sticky (5 frame-uri × 70vh) */}
      <div ref={container} className="hidden md:block pt-[15vh] pb-[25vh]">
        {FRAMES.map((srcs, i) => {
          const n = FRAMES.length
          const targetScale = 1 - (n - i - 1) * 0.06
          return (
            <Frame
              key={i}
              i={i}
              srcs={srcs}
              progress={scrollYProgress}
              range={[i / n, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
