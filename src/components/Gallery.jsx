import React, { useEffect, useRef } from 'react'
import { asset } from '../utils/asset'
import Carousel from './Carousel'
import Reveal from './Reveal'
import { galleryImages as images } from '../utils/images'

export default function Gallery() {
  const titleRef = useRef(null)
  // Build a stripe of 8 items so 4 images fill 100vw; 16 total in track for seamless loop
  const stripe = [...images, ...images].slice(0, 8)
  
  useEffect(() => {
    const onScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
        const scale = 1 + progress * 0.08
        titleRef.current.style.transform = `scale(${scale})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="gallery" className="container-gutter max-w-7xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Gallery</p>
          <h2 ref={titleRef} className="section-title transition-transform duration-300 will-change-transform">A glimpse into the vibe</h2>
          <p className="mt-4 text-cream-300/80">Bright courts, calm studio, and a community that loves to move.</p>
        </div>
      </div>
      {/* Mobile: single large full-width auto-swiping image */}
      <div className="mt-10 sm:hidden -mx-4">
        <Carousel images={images} interval={4000} />
      </div>
      {/* Desktop: 4 images visible, same size, continuous slow leftward motion, full-bleed */}
      <div className="mt-10 hidden sm:block relative overflow-hidden [margin-inline:calc(50%-50vw)] w-screen">
        <div className="flex gap-0 gallery-track">
          {[...stripe, ...stripe].map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={asset(src)}
              alt="Club Skyshot photo"
              className="w-[25vw] max-w-none flex-none h-[28rem] lg:h-[32rem] object-cover select-none border-x border-white/10 first:border-l-0 last:border-r-0"
              loading={i < 4 ? 'eager' : 'lazy'}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
