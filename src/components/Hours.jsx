import React from 'react'
import Reveal from './Reveal'
import site from '../config/site'

export default function Hours() {
  return (
  <section id="hours" className="container-gutter max-w-7xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="card p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="section-eyebrow">Timings</p>
            <h2 className="section-title">Open daily</h2>
            <p className="mt-2 text-cream-300/80">Drop in any day — mornings to late evenings.</p>
          </div>
          <div className="text-sm text-cream-400/80">
            Time zone: local
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {site.hours.map((h, i) => (
            <Reveal key={h.day} direction="up" distance={22} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 ring-1 ring-white/10">
              <div className="font-medium text-cream-100">{h.day}</div>
              <div className="text-cream-300/90">{h.time}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
