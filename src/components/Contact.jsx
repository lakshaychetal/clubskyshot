import React from 'react'
import site from '../config/site'

export default function Contact() {
  return (
  <section id="contact" className="container-gutter max-w-7xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="card p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title">We’d love to host you</h2>
            <p className="mt-4 text-cream-300/85">Have a question or want to book a session? Reach out and we’ll help you get set up.</p>
            <div className="mt-6 space-y-3 text-cream-300/90">
              <div><span className="font-medium text-cream-100">Phone:</span> <a className="hover:text-white" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></div>
              <div><span className="font-medium text-cream-100">Email:</span> <a className="hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></div>
              <div><span className="font-medium text-cream-100">Instagram:</span> <a className="hover:text-white" href={site.instagram} target="_blank" rel="noreferrer">@club.skyshot</a></div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-cream-300/85">Name</label>
                <input required className="w-full rounded-xl border border-white/10 bg-white/5 text-cream-100 placeholder:text-cream-400/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-cream-300/85">Email</label>
                <input required type="email" className="w-full rounded-xl border border-white/10 bg-white/5 text-cream-100 placeholder:text-cream-400/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-cream-300/85">Message</label>
              <textarea rows="4" className="w-full rounded-xl border border-white/10 bg-white/5 text-cream-100 placeholder:text-cream-400/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500" placeholder="Tell us what you’re looking for"></textarea>
            </div>
            <button className="btn-primary" type="submit">Send inquiry</button>
            <p className="text-xs text-cream-400/70">This demo form doesn’t send yet. Hook it up to your favorite form service or an API.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
