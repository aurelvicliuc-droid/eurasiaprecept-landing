'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Lenis from 'lenis'

const C = '/carousel'

const COLS: { src: string }[][] = [
  [
    { src: `${C}/494171405_1480638549863862_5462489402041087813_n.jpg` },
    { src: `${C}/521351848_1553622505898799_8295139459140997601_n.jpg` },
    { src: `${C}/611201911_1700360654558316_5841111323271327889_n.jpg` },
    { src: `${C}/681427564_1797164938211220_8001753608821104095_n.jpg` },
  ],
  [
    { src: `${C}/494268125_1481448343116216_2381626411841703366_n.jpg` },
    { src: `${C}/557459801_1611306076797108_8909020549474646805_n.jpg` },
    { src: `${C}/612344014_1702760957651619_7003369236896174919_n.jpg` },
    { src: `${C}/716483179_1834463507814696_3851515672094198277_n.jpg` },
  ],
  [
    { src: `${C}/514282940_1550182159576167_1673999915183179243_n.jpg` },
    { src: `${C}/584449220_1659615898632792_2399585120794362465_n.jpg` },
    { src: `${C}/613528992_1703109514283430_5914454420380100403_n.jpg` },
  ],
  [
    { src: `${C}/515068658_1549295166331533_8873942781353550651_n.jpg` },
    { src: `${C}/611136814_1700361247891590_3210011831627886562_n.jpg` },
    { src: `${C}/619967878_1716424482951933_6586524880751662244_n.jpg` },
  ],
]

function Column({ images, y }: { images: { src: string }[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-3 will-change-transform">
      {images.map(({ src }, i) => (
        <div key={i} className="relative w-full aspect-[4/3] overflow-hidden rounded-lg flex-shrink-0">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
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

  // Columns start below viewport center and scroll up at different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], ['15%', '-30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%',  '-55%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['25%', '-20%'])
  const y4 = useTransform(scrollYProgress, [0, 1], ['5%',  '-45%'])

  return (
    <section
      ref={container}
      className="bg-[#0e1f17] overflow-hidden"
      aria-label="Photo gallery"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 py-3">
        <Column images={COLS[0]} y={y1} />
        <Column images={COLS[1]} y={y2} />
        <Column images={COLS[2]} y={y3} />
        <Column images={COLS[3]} y={y4} />
      </div>
    </section>
  )
}
