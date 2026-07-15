'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Lenis from 'lenis'

const C = '/carousel'

// 20 images, 5 per column — sorted alphabetically
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
  '612344014_1702760957651619_7003369236896174919_n.jpg',
  '613528992_1703109514283430_5914454420380100403_n.jpg',
  '619967878_1716424482951933_6586524880751662244_n.jpg',
  '681427564_1797164938211220_8001753608821104095_n.jpg',
  '716483179_1834463507814696_3851515672094198277_n.jpg',
].map((f) => `${C}/${f}`)

// Interleave images across 4 columns: 0,4,8,12,16 / 1,5,9,13,17 / etc.
const COLS = [0, 1, 2, 3].map((col) =>
  [0, 1, 2, 3, 4].map((row) => ALL[col + row * 4])
)

function Column({ srcs, y }: { srcs: string[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-3 will-change-transform">
      {srcs.map((src, i) => (
        <div key={i} className="relative w-full aspect-[4/3] overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={src}
            alt=""
            fill
            quality={65}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top"
            draggable={false}
          />
        </div>
      ))}
    </motion.div>
  )
}

export default function ParallaxGallery() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis()
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%',  '-50%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const y4 = useTransform(scrollYProgress, [0, 1], ['5%',  '-45%'])

  return (
    <section
      ref={container}
      className="bg-[#0f241f] overflow-hidden"
      aria-label="Photo gallery"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 py-3">
        <Column srcs={COLS[0]} y={y1} />
        <Column srcs={COLS[1]} y={y2} />
        <Column srcs={COLS[2]} y={y3} />
        <Column srcs={COLS[3]} y={y4} />
      </div>
    </section>
  )
}
