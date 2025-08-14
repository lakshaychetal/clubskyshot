import Re            import React from 'react'
import site from '../config/site'

export default function Contact() {
  return (
  <section id="contact" className="container-gutter max-w-7xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="card p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="section-eyebrow text-gold-600">Contact</p>
            <h2 className="section-title bg-golden-gradient bg-clip-text text-transparent">We'd love to host you</h2>
            <p className="mt-4 text-teal-700">Have a question or want to book a session? Reach out and we'll help you get set up.</p>
            <div className="mt-6 space-y-3 text-teal-700">
              <div><span className="font-bold text-teal-800">Phone:</span> <a className="hover:text-gold-600 transition-colors" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></div>
              <div><span className="font-bold text-teal-800">Email:</span> <a className="hover:text-gold-600 transition-colors" href={`mailto:${site.email}`}>{site.email}</a></div>
              <div><span className="font-bold text-teal-800">Instagram:</span> <a className="hover:text-gold-600 transition-colors" href={site.instagram} target="_blank" rel="noreferrer">@yourclub</a></div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-teal-700 font-semibold">Name</label>
                <input required className="w-full rounded-xl border border-teal-700/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-cream-50" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-teal-700 font-semibold">Email</label>
                <input required type="email" className="w-full rounded-xl border border-teal-700/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-cream-50" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-teal-700 font-semibold">Message</label>
              <textarea rows="4" className="w-full rounded-xl border border-teal-700/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-cream-50" placeholder="Tell us what you're looking for"></textarea>
            </div>
            <button className="btn-primary" type="submit">Send inquiry</button>
            <p className="text-xs text-teal-600">This demo form doesn't send yet. Hook it up to your favorite form service or an API.</p>
          </form>
        </div>
      </div>
    </section>
  )
}t from 'react'
import site from '../config/site'

export default function Contact() {
  return (
  <section id="contact" className="container-gutter max-w-7xl mx-auto py-16 sm:py-24 animate-fade-up">
      <div className="card p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title">We’d love to host you</h2>
            <p className="mt-4 text-slate-600">Have a question or want to book a session? Reach out and we’ll help you get set up.</p>
            <div className="mt-6 space-y-3 text-slate-700">
              <div><span className="font-medium text-leaf-900">Phone:</span> <a className="hover:text-leaf-700" href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></div>
              <div><span className="font-medium text-leaf-900">Email:</span> <a className="hover:text-leaf-700" href={`mailto:${site.email}`}>{site.email}</a></div>
              <div><span className="font-medium text-leaf-900">Instagram:</span> <a className="hover:text-leaf-700" href={site.instagram} target="_blank" rel="noreferrer">@yourclub</a></div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-slate-600">Name</label>
                <input required className="w-full rounded-xl border border-leaf-800/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-leaf-500" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-slate-600">Email</label>
                <input required type="email" className="w-full rounded-xl border border-leaf-800/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-leaf-500" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Message</label>
              <textarea rows="4" className="w-full rounded-xl border border-leaf-800/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-leaf-500" placeholder="Tell us what you’re looking for"></textarea>
            </div>
            <button className="btn-primary" type="submit">Send inquiry</button>
            <p className="text-xs text-slate-500">This demo form doesn’t send yet. Hook it up to your favorite form service or an API.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
