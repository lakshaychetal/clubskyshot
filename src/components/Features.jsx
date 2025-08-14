import React from 'react'
import Reveal from './Reveal'

const items = [
  {
    title: 'Pro pickleball courts',
    desc: 'Tournament-spec surfacing and lighting for crisp, fast rallies day or night.',
    icon: (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" className="text-cream-200"><path strokeWidth="1.5" d="M3 8h18M3 16h18M8 3v18M16 3v18"/></svg>
    )
  },
  {
    title: 'Player amenities',
    desc: 'Chilled water, shaded seating, and tidy lockers for a premium club feel.',
    icon: (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" className="text-cream-200"><path strokeWidth="1.5" d="M12 3v18M3 12h18"/></svg>
    )
  },
  {
    title: 'Coaching & leagues',
    desc: 'Beginner clinics, private coaching, and league nights to level up your game.',
    icon: (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" className="text-cream-200"><path strokeWidth="1.5" d="M12 2c4 4 4 8 0 12-4-4-4-8 0-12Zm0 9v11"/></svg>
    )
  },
  {
    title: 'Effortless booking',
    desc: 'Reserve singles or doubles in seconds via email or phone — we’ll confirm fast.',
    icon: (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" className="text-cream-200"><path strokeWidth="1.5" d="M3 5h18v14H3z M7 3v4M17 3v4"/></svg>
    )
  }
]

export default function Features() {
  return (
    <section id="features" className="container-gutter max-w-7xl mx-auto py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Facilities</p>
  <h2 className="section-title">Built for speed, control, and comfort</h2>
  <p className="mt-4 text-cream-300/80">Everything you need to play better and enjoy more — from surface to service.</p>
      </div>
      <Reveal as="div" stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={it.title} direction={i % 2 === 0 ? 'left' : 'right'} distance={28} className="card p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
            <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-cream-200">
              {it.icon}
            </div>
            <h3 className="mt-4 font-semibold text-lg text-cream-100">{it.title}</h3>
            <p className="mt-2 text-cream-300/80">{it.desc}</p>
          </Reveal>
        ))}
      </Reveal>
    </section>
  )
}
