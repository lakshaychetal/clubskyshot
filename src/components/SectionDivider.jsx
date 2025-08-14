import React from 'react'

// Minimal linear gradient fade to blend the hero into the page background (no waves)
export default function SectionDivider() {
  return (
    <div aria-hidden className="relative h-12 sm:h-16 -mt-8 sm:-mt-10 mb-0 pointer-events-none select-none">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-brand-900/85 to-brand-900" />
      </div>
    </div>
  )
}
