'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Lenis from 'lenis'

const IMAGES = {
  col1: [
    { src: '/images/lummi/img15.png', alt: '' },
    { src: '/images/lummi/img21.png', alt: '' },
    { src: '/images/lummi/img3.png',  alt: '' },
  ],
  col2: [
    { src: '/images/lummi/img4.png',  alt: '' },
    { src: '/images/lummi/img5.png',  alt: '' },
    { src: '/images/lummi/img6.png',  alt: '' },
  ],
  col3: [
    { src: '/images/lummi/img7.png',  alt: '' },
    { src: '/images/lummi/img8.png',  alt: '' },
    { src: '/images/lummi/img9.png',  alt: '' },
  ],
  col4: [
    { src: '/images/lummi/img10.png', alt: '' },
    { src: '/images/lummi/img11.png', alt: '' },
    { src: '/images/lummi/img12.png', alt: '' },
  ],
}

function Column({ images, y }: { images: { src: string; alt: string }[]; y: MotionValue<string> }) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-4 will-change-transform">
      {images.map(({ src, alt }, i) => (
        <div key={i} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={src}
            alt={alt}
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

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-55%'])

  return (
    <section
      ref={container}
      className="bg-[#0e1f17] py-24 overflow-hidden"
      aria-label="Photo gallery"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Column images={IMAGES.col1} y={y1} />
          <Column images={IMAGES.col2} y={y2} />
          <Column images={IMAGES.col3} y={y3} />
          <Column images={IMAGES.col4} y={y4} />
        </div>
      </div>
    </section>
  )
}
