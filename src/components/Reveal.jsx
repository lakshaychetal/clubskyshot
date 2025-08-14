import React, { useEffect, useRef, useState } from 'react'

export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  stagger = false,
  staggerStep = 60,
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
  distance = 24,
  blur = 2,
  scale = 1,
}) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Respect reduced motion
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setShow(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          obs.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Compute initial transform based on direction
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y'
  const sign = direction === 'left' || direction === 'up' ? 1 : -1
  const initialTranslate = sign * distance
  const hiddenClass = `opacity-0 translate-${axis.toLowerCase()}-[${initialTranslate}px] blur-[${blur}px] ${scale !== 1 ? `scale-[${scale}]` : ''}`
  const shownClass = 'opacity-100 translate-x-0 translate-y-0 blur-0 scale-100'

  const containerClass = stagger ? `${className}` : `${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${show ? shownClass : hiddenClass}`
  const childHidden = `transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${hiddenClass}`
  const childShown = `transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${shownClass}`

  return (
    <Tag ref={ref} className={containerClass} style={{ transitionDelay: `${delay}ms` }}>
      {stagger && Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${delay + i * staggerStep}ms` }}
              className={show ? childShown : childHidden}
            >
              {child}
            </div>
          ))
        : children}
    </Tag>
  )
}
