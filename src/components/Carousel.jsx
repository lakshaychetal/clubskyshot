import React, { useEffect, useRef, useState } from 'react'
import { asset } from '../utils/asset'

// Mobile-first auto-swiping carousel for the Gallery
export default function Carousel({ images = [], interval = 4000 }) {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % images.length), interval)
    return () => clearInterval(timer.current)
  }, [images.length, interval])

  if (!images.length) return null

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-96 sm:h-80">
        {images.map((src, i) => (
          <img
            key={i}
            src={asset(src)}
            alt={`Slide ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
      className={`rounded-full transition-all ring-1 ring-white/30 ${i === index ? 'h-3 w-8 bg-cream-500' : 'h-3 w-3 bg-brand-200/60'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />)
        )}
      </div>
    </div>
  )
}
