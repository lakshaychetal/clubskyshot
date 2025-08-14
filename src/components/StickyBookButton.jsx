import React, { useEffect, useMemo, useState } from 'react'
import site from '../config/site'

// Bottom sticky rectangular CTA that stays hidden on the hero section of home,
// and shows once you scroll past it. On all other routes it is shown.
export default function StickyBookButton() {
  const [visible, setVisible] = useState(false)

  const isHome = typeof window !== 'undefined' && window.location?.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setVisible(true)
      return
    }

    const hero = document.getElementById('hero')
    if (!hero) {
      // Fallback: reveal after scrolling roughly half a viewport height
      const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        // Show when <= 50% of the hero is visible (i.e., user scrolled past half of hero)
        setVisible(e.intersectionRatio <= 0.5)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.5, 1],
      }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome])

  // Wrapper (position + transition)
  const wrapperCls = useMemo(
    () =>
      [
        'fixed z-50 left-0 right-0',
        'bottom-0',
        'w-full',
        'transition-all duration-300 ease-out will-change-transform',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none',
      ].join(' '),
    [visible]
  )

  // Chosen palette: deep brand green bar with cream text — cohesive and high contrast.
  // Also supports iOS safe areas via padding on the container.
  return (
    <div
      className={wrapperCls}
      aria-hidden={!visible}
    >
      <a
        href={site.bookingUrl}
        className="block w-full flex items-center justify-center text-center font-bold tracking-tight text-lg sm:text-xl
                   rounded-none px-6 sm:px-8 py-4 sm:py-5 shadow-soft ring-1 ring-black/5
                   bg-gold-500 text-brand-900 hover:bg-gold-400 active:bg-gold-500/95
                   transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300/60"
      >
        Book Slot
      </a>
    </div>
  )
}
