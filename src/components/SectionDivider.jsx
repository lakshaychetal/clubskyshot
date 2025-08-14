import React from 'react'

// Clean, solid arc under the hero to seamlessly merge into the dotted background
export default function SectionDivider() {
  return (
    <div aria-hidden className="relative h-20 sm:h-28 -mt-10 sm:-mt-12 mb-0 pointer-events-none select-none">
      {/* Solid arc fill matches page background to avoid dot bleed-through */}
      <div className="absolute inset-x-0 -top-10 sm:-top-12 text-brand-900">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,96 C360,140 1080,140 1440,96 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  )
}
