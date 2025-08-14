import React from 'react'
import Reveal from './Reveal'
import { asset } from '../utils/asset'

// Replace placeholders with real guest images in /assets2 and their quotes.
const GUESTS = [
  {
  name: 'Alex Rivera',
  role: 'Actor',
  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
  quote: 'Loved the vibe at Club Skyshot. Great courts and great energy!',
  },
  {
  name: 'Priya Mehta',
  role: 'Athlete',
  img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
  quote: 'Top-notch facility. The staff made booking and play super easy.',
  },
  {
  name: 'Jordan Lee',
  role: 'Creator',
  img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop',
  quote: 'A premium pickleball experience — can’t wait to return!',
  },
]

export default function Guests() {
  return (
  <section id="guests" className="container-gutter max-w-6xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Guests & Reviews</p>
        <h2 className="section-title font-display">Celebrities who visited</h2>
        <p className="mt-4 text-cream-300/90">A few highlights from friends of the club. Add your real guest photos and quotes here.</p>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {GUESTS.map((g, i) => (
          <Reveal key={g.name} direction={i % 2 === 0 ? 'left' : 'right'} distance={28} className="card overflow-hidden transition-transform hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
            <img src={asset(g.img)} alt={g.name} className="h-72 w-full object-cover" />
            <figcaption className="p-6">
              <div className="font-semibold text-cream-100">{g.name}</div>
              <div className="text-sm text-cream-300/80">{g.role}</div>
              <blockquote className="mt-3 text-cream-300/90">“{g.quote}”</blockquote>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
