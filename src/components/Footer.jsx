import React from 'react'
import { Link } from 'react-router-dom'
import site from '../config/site'
import { asset } from '../utils/asset'

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-900/60 backdrop-blur">
      <div className="container-gutter max-w-7xl mx-auto py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img
                src={asset('/Screenshot 2025-08-13 at 7.23.04\u202fPM.png')}
                alt={site.brandName}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-contain bg-brand-800/40 ring-1 ring-white/10"
              />
              <div className="text-cream-100 font-semibold">{site.brandName}</div>
            </div>
            <p className="mt-3 text-cream-300/80 max-w-xs">Premium pickleball experiences with pro courts and a club-class vibe.</p>
          </div>
          <div>
            <div className="font-semibold text-cream-100 mb-2">Contact</div>
            <ul className="space-y-1 text-cream-300/90 text-sm">
              <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-cream-100 mb-2">Address</div>
            <div className="text-cream-300/90 text-sm">{site.addressLine}</div>
          </div>
          <div>
            <div className="font-semibold text-cream-100 mb-2">Legal</div>
            <ul className="space-y-1 text-cream-300/90 text-sm">
              <li><Link to={site.policies.terms}>Terms & Conditions</Link></li>
              <li><Link to={site.policies.privacy}>Privacy Policy</Link></li>
              <li><Link to={site.policies.refund}>Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs text-cream-400/70">© {new Date().getFullYear()} {site.brandName}. All rights reserved.</div>
      </div>
    </footer>
  )
}
