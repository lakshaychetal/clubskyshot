import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calc = () => {
      const h = document.documentElement
      const scrollTop = h.scrollTop || document.body.scrollTop
      const scrollHeight = h.scrollHeight - h.clientHeight
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
      setProgress(Math.max(0, Math.min(100, pct)))
    }
    calc()
    window.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('scroll', calc)
      window.removeEventListener('resize', calc)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      <div className="h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_12px_rgba(202,160,34,0.6)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
