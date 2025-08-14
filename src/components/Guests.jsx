import React from 'react'
import Reveal from './Reveal'
import { asset } from '../utils/asset'

const CELEB = {
  name: 'Abhishek Sharma',
  title: 'Indian International Cricketer',
  // Place this image under assets2/ with the same name for best results.
  img: '/Screenshot 2025-08-14 at 5.00.26\u202fPM.png',
  quote:
    '“Honored to drop by Club Skyshot — quality courts, professional ambience, and a great sporting vibe.”',
}

export default function Guests() {
  return (
    <section id="guests" className="container-gutter max-w-6xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Guests</p>
        <h2 className="section-title font-display">Celebrity visit</h2>
        <p className="mt-4 text-cream-300/90">A proud moment for the club.</p>
      </div>

      <Reveal className="mt-10">
  <article className="grid md:grid-cols-2 gap-6 items-stretch rounded-2xl sm:rounded-3xl ring-1 ring-white/10 bg-brand-900/50 overflow-hidden shadow-soft">
          {/* Photo */}
      <div className="relative min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem]">
            <img
              src={asset(CELEB.img)}
              alt={CELEB.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-brand-900/20 to-transparent" />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-full bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30 px-3 py-1 text-xs font-medium">Guest</span>
              <span className="inline-block rounded-full bg-white/10 text-cream-200 ring-1 ring-white/15 px-3 py-1 text-xs font-medium">Visited Club Skyshot</span>
            </div>
            <h3 className="mt-4 text-2xl sm:text-3xl font-display font-semibold text-cream-50">{CELEB.name}</h3>
            <p className="text-cream-300/85">{CELEB.title}</p>
            <blockquote className="mt-4 text-lg text-cream-200/90 leading-relaxed">
              {CELEB.quote}
            </blockquote>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
