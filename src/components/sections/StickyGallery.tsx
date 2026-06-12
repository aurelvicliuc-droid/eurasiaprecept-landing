'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import ReactLenis from 'lenis/react'

const C = '/carousel'
const ALL = [
  '489114146_1457118022215915_2888482248647560853_n.jpg',
  '490807858_1466338161293901_1959630751560638820_n.jpg',
  '491714033_1473748913886159_5515412886118993350_n.jpg',
  '491839674_1473685407225843_2576459391495508359_n.jpg',
  '492032397_1473761967218187_161237512797718303_n.jpg',
  '493981149_1476424373618613_3307745394851809147_n.jpg',
  '494171405_1480638549863862_5462489402041087813_n.jpg',
  '494268125_1481448343116216_2381626411841703366_n.jpg',
  '514282940_1550182159576167_1673999915183179243_n.jpg',
  '515068658_1549295166331533_8873942781353550651_n.jpg',
  '521351848_1553622505898799_8295139459140997601_n.jpg',
  '557459801_1611306076797108_8909020549474646805_n.jpg',
  '584449220_1659615898632792_2399585120794362465_n.jpg',
  '611136814_1700361247891590_3210011831627886562_n.jpg',
  '611201911_1700360654558316_5841111323271327889_n.jpg',
].map((f) => `${C}/${f}`)

// 5 frames × 3 images
const FRAMES = [
  [ALL[0],  ALL[1],  ALL[2]],
  [ALL[3],  ALL[4],  ALL[5]],
  [ALL[6],  ALL[7],  ALL[8]],
  [ALL[9],  ALL[10], ALL[11]],
  [ALL[12], ALL[13], ALL[14]],
]

function Frame({
  srcs,
  i,
  progress,
  range,
  targetScale,
}: {
  srcs: string[]
  i: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) {
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="sticky top-0 h-screen flex items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 15}px)` }}
        className="relative w-full max-w-[1100px] px-4 grid grid-cols-3 gap-3 origin-top"
      >
        {srcs.map((src, j) => (
          <div
            key={j}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
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
    <ReactLenis root>
      <section
        ref={container}
        className="relative bg-[#0e1f17] pb-[100vh] pt-[15vh]"
        aria-label="Photo gallery"
      >
        {FRAMES.map((srcs, i) => {
          const targetScale = Math.max(0.75, 1 - (FRAMES.length - i - 1) * 0.05)
          return (
            <Frame
              key={i}
              i={i}
              srcs={srcs}
              progress={scrollYProgress}
              range={[i * (1 / FRAMES.length), 1]}
              targetScale={targetScale}
            />
          )
        })}
      </section>
    </ReactLenis>
  )
}
