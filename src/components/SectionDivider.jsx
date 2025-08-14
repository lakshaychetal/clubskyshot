import React from 'react'

// A subtle animated wave + sheen that visually merges the Hero into the dotted background
export default function SectionDivider() {
  return (
    <div aria-hidden className="relative h-16 sm:h-24 -mt-6 sm:-mt-8 mb-6 sm:mb-8 pointer-events-none select-none">
      {/* Wave shape that sits under the hero's rounded bottom to create a clean merge */}
      <div className="absolute inset-x-0 -top-6 sm:-top-8 text-brand-900/90">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          {/* Fill matches the page background (brand-900/90 via currentColor) */}
          <path fill="currentColor" d="M0,80 C180,120 420,0 720,40 C1020,80 1260,20 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      {/* Soft moving sheen that sweeps across for a refined animated touch */}
      <div
        className="absolute inset-y-0 left-[-30%] w-[60%] opacity-40 sm:opacity-30 blur-md will-change-transform animate-sweep-x"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
    </div>
  )
}
