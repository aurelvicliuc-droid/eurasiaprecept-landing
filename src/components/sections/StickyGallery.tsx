'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Lenis from 'lenis'

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

type Img = { src: string; pos?: string }

// 5 frames × 3 images — pos overrides object-top per image if needed
const FRAMES: Img[][] = [
  [{ src: ALL[0] }, { src: ALL[1], pos: 'object-center' }, { src: ALL[2] }],
  [{ src: ALL[3] }, { src: ALL[4] },  { src: ALL[5] }],
  [{ src: ALL[6] }, { src: ALL[7] },  { src: ALL[8] }],
  [{ src: ALL[9] }, { src: ALL[10] }, { src: ALL[11] }],
  [{ src: ALL[12] },{ src: ALL[13], pos: 'object-center' }, { src: ALL[14], pos: 'object-center' }],
]

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
        className="w-full px-4 md:px-8 grid grid-cols-3 gap-4 md:gap-6"
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
              sizes="(max-width: 768px) 34vw, 33vw"
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

  useEffect(() => {
    const lenis = new Lenis()
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    // 5 frames × 70vh + 15vh top + 25vh bottom ≈ 390vh — manageable scroll
    <section
      ref={container}
      className="relative bg-beige-light pt-[15vh] pb-[25vh]"
      aria-label="Photo gallery"
    >
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
    </section>
  )
}
