import React from 'react'
import site from '../config/site'

export default function Location() {
  return (
  <section className="container-gutter max-w-7xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <p className="section-eyebrow">Location</p>
          <h2 className="section-title font-display">Find us</h2>
          <p className="mt-4 text-cream-300/85">We’re easy to reach — minutes from key city hubs.</p>
          <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-cream-200">📍</div>
              <div>
                <div className="font-medium text-cream-100">Address</div>
                <div className="text-cream-300/90">{site.addressLine}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn-ghost">Call</a>
              <a href={`mailto:${site.email}`} className="btn-primary">Email</a>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="btn-ghost">Instagram</a>
            </div>
          </div>
        </div>
        <div className="card overflow-hidden">
          <iframe title="map" src={site.mapEmbed} className="w-full h-96 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  )
}
