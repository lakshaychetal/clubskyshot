import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import site from '../config/site'
import { asset } from '../utils/asset'

export default function Navbar() {
  const [logoOk, setLogoOk] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
  <header className={`sticky top-0 z-50 backdrop-blur border-b ${scrolled ? 'bg-brand-900/80 border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-brand-900/60 border-white/10'}`}>
      <div className="container-gutter max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            {logoOk ? (
              <img
                src={asset('/Screenshot 2025-08-13 at 7.23.04 PM.png')}
                alt="Club Skyshot logo"
                className="h-9 w-9 rounded-full bg-leaf-900/10 object-contain"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-semibold">CS</div>
            )}
            <div className="text-cream-100 font-semibold">{site.brandName}</div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-cream-300">
            <a href="#features" className="hover:text-white">Facilities</a>
            <a href="#gallery" className="hover:text-white">Gallery</a>
            <a href="#hours" className="hover:text-white">Timings</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn-ghost hidden sm:inline-flex">Call</a>
            <a href={site.bookingUrl} className="btn-primary">Book Slot</a>
          </div>
        </div>
      </div>
    </header>
  )
}
