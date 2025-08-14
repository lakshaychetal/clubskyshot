import React, { useEffect, useRef } from 'react'
import Reveal from './Reveal'

const AMENITIES = [
  { label: 'CCTV', icon: '🎥' },
  { label: 'First Aid', icon: '⛑️' },
  { label: 'Benches & Seating', icon: '🪑' },
  { label: 'Restrooms', icon: '🚻' },
  { label: 'Equipment', icon: '🥒' },
  { label: 'Parking', icon: '🅿️' },
  { label: 'Wifi', icon: '📶' },
  { label: 'Drinking Water', icon: '🚰' },
  { label: 'AC Lounge', icon: '❄️' },
  { label: 'Cafe', icon: '☕️' },
]

export default function Amenities() {
  const titleRef = useRef(null)
  
  useEffect(() => {
    const onScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
        const scale = 1 + progress * 0.06
        titleRef.current.style.transform = `scale(${scale})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="amenities" className="bg-brand-900/40 border-y border-white/5 animate-fade-up">
      <div className="container-gutter max-w-6xl mx-auto py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Amenities</p>
          <h2 ref={titleRef} className="section-title font-display transition-transform duration-300 will-change-transform">Everything you need, on site</h2>
          <p className="mt-4 text-cream-300/90">From safety to comfort, we've got your game covered.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.label} direction={i % 2 === 0 ? 'up' : 'up'} distance={24} className="p-4 sm:p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left transition-transform duration-300 hover:-translate-y-1">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center text-cream-200 text-sm sm:text-lg">{a.icon}</div>
              <div className="font-medium text-cream-100 text-sm sm:text-base">{a.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}