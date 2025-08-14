import React, { useEffect, useMemo, useState } from 'react'
import site from '../config/site'
import { galleryImages } from '../utils/images'
import Carousel from '../components/Carousel'
import { COURTS, toDateInputValue, generateSlotsForDate, getAvailability, computeTotal, formatCurrency, PRICE_PER_SLOT } from '../utils/booking'
import Footer from '../components/Footer'
import BookingMobile from '../components/BookingMobile'

export default function Booking() {
  // On booking route, switch body to light background and prevent horizontal overflow
  useEffect(() => {
    document?.body?.classList?.add('booking-bg', 'overflow-x-hidden')
    return () => document?.body?.classList?.remove('booking-bg', 'overflow-x-hidden')
  }, [])

  const [date, setDate] = useState(toDateInputValue())
  const [courtId, setCourtId] = useState(COURTS[0].id)
  const [selected, setSelected] = useState(() => new Set())
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState('book')
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false)

  const slots = useMemo(() => generateSlotsForDate(date), [date])
  const { booked } = useMemo(() => getAvailability(date, courtId), [date, courtId])
  const total = useMemo(() => computeTotal(selected), [selected])

  const toggleSlot = (s) => {
    if (booked.has(s)) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }

  const changeDateBy = (deltaDays) => {
    const d = new Date(date)
    d.setDate(d.getDate() + deltaDays)
    setSelected(new Set())
    setDate(toDateInputValue(d))
  }

  // Build a 4-day quick selector (selected date + next 3 days)
  const dayList = useMemo(() => {
    const base = new Date(date)
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      return d
    })
  }, [date])

  // --- Mobile-only sub-views -------------------------------------------------
  const MobileStepRail = ({ active }) => (
    <div className="absolute left-0 top-0 bottom-20 w-14 hidden sm:hidden xs:block md:hidden" />
  )

  const StepPill = ({ label, active }) => (
    <div
      className={`flex items-center justify-center w-14 select-none ${active ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}
      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
    >
      {label}
    </div>
  )

  const MobileBottomTabs = ({ active, onTab }) => (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-teal-600 text-white grid grid-cols-2">
      <button onClick={() => onTab('book')} className={`py-4 text-center font-semibold ${active==='book'?'bg-teal-700':''}`}>BOOK A SLOT</button>
      <button onClick={() => onTab('details')} className={`py-4 text-center font-semibold ${active==='details'?'bg-teal-700':''}`}>DETAILS</button>
    </div>
  )

  const MobileBooking = () => {
    const [view, setView] = useState('landing') // landing | book | details | summary

    // Helpers for day navigation
    const shiftDay = (delta) => {
      const d = new Date(date)
      d.setDate(d.getDate() + delta)
      setSelected(new Set())
      setDate(toDateInputValue(d))
    }

    return (
      <div className="md:hidden relative min-h-screen pb-16">
        {/* Left step rail */}
        <div className="absolute left-0 top-0 bottom-16 w-14 bg-slate-50 border-r border-slate-200 hidden xs:block" aria-hidden>
          <div className="h-full flex flex-col items-center justify-between py-6">
            <StepPill label="SPORT" active={view==='landing' || view==='details'} />
            <StepPill label="FACILITY" active={view==='details'} />
            <StepPill label="SLOTS" active={view==='book'} />
            <StepPill label="SUMMARY" active={view==='summary'} />
          </div>
        </div>

        {/* Content */}
        <div className="pl-0 xs:pl-16">
          {/* Top app bar */}
          <div className="sticky top-0 z-30 bg-navy-900/95 backdrop-blur text-white px-4 py-3 flex items-center gap-3 shadow-sm">
            <a href="/" aria-label="Back" className="text-white/80">←</a>
            <div className="text-xl font-semibold">Book a Slot</div>
          </div>

          {/* Landing/details view */}
          {(view==='landing' || view==='details') && (
            <div className="p-4 space-y-4">
              <div className="bg-white rounded-2xl border border-black/5 shadow overflow-hidden">
                <Carousel images={[...galleryImages, ...galleryImages].slice(0, 6)} interval={5000} />
              </div>
              <div className="bg-white rounded-2xl border border-black/5 shadow p-4">
          {/* Mobile: landing + slots (single day) */}
          <div className="md:hidden space-y-4">
            {/* Mobile header bar */}
            <div className="sticky top-0 z-20 -mx-4 px-4 py-3 bg-cream-50/95 backdrop-blur border-b border-black/5">
              <div className="flex items-center gap-3">
                <button aria-label="Back" className="text-brand-900/80" onClick={() => history.length > 1 ? window.history.back() : (window.location.href = '/')}>←</button>
                <h1 className="text-lg font-display font-semibold">Book a Slot</h1>
              </div>
            </div>

            {/* Mobile header/landing card - with court first */}
            <div className="rounded-2xl border border-black/5 bg-white shadow p-4">
              <div>
                <div className="text-sm font-semibold text-slate-700">Choose Court</div>
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {COURTS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setSelected(new Set()); setCourtId(c.id) }}
                      className={`px-3 py-2 rounded-xl border whitespace-nowrap ${courtId===c.id ? 'bg-brand-900 text-cream-100 border-brand-900' : 'bg-white text-slate-700 border-slate-200'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => { setSelected(new Set()); setDate(e.target.value) }}
                  className="flex-1 rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-700"
                />
                <button aria-label="Previous day" className="rounded-xl border border-slate-300 px-3 py-2" onClick={() => changeDateBy(-1)}>◀</button>
                <button aria-label="Next day" className="rounded-xl border border-slate-300 px-3 py-2" onClick={() => changeDateBy(1)}>▶</button>
              </div>
            </div>

            {/* Mobile slots grid (single day) */}
            <div className="rounded-2xl border border-black/5 bg-white shadow p-4">
              <div className="grid grid-cols-2 gap-3">
                {slots.map((s) => {
                  const isBooked = booked.has(s)
                  const isSel = selected.has(s)
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSlot(s)}
                      disabled={isBooked}
                      className={[
                        'px-3 py-3 rounded-xl text-left border transition',
                        isBooked ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-500' : isSel ? 'bg-gold-500 text-brand-900 border-gold-400' : 'bg-white hover:bg-cream-50 border-slate-200 text-slate-800',
                      ].join(' ')}
                    >
                      <div className="font-semibold">{s}</div>
                      {!isSel && !isBooked && <div className="text-[12px] opacity-70">{formatCurrency(PRICE_PER_SLOT)} · 1 left</div>}
                      {isSel && <div className="text-[12px] opacity-80">Selected</div>}
                      {isBooked && <div className="text-[12px]">Booked</div>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Mobile details tab content */}
            {activeTab === 'details' && (
              <div className="rounded-2xl border border-black/5 bg-white shadow p-4">
                <h2 className="font-semibold text-slate-800">Details</h2>
                <ul className="mt-2 text-slate-700 list-disc pl-5 space-y-1">
                  <li>3 tournament-spec courts</li>
                  <li>Coaching & social play</li>
                  <li>AC lounge and Cafe</li>
                </ul>
              </div>
            )}

            {/* Sticky selection ribbon */}
            <div className="fixed left-0 right-0 bottom-16 z-40 md:hidden px-4">
              <div className="mx-auto max-w-6xl rounded-2xl bg-teal-700 text-white shadow-lg flex items-center justify-between px-4 py-3">
                <div className="font-semibold">{selected.size} {selected.size === 1 ? 'slot' : 'slots'} selected</div>
                <button
                  className="rounded-xl bg-white/95 text-teal-900 font-semibold px-4 py-2"
                  onClick={() => setMobileSummaryOpen(true)}
                  disabled={selected.size === 0}
                >
                  SUMMARY
                </button>
              </div>
            </div>

            {/* Bottom nav tabs */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden grid grid-cols-2">
              <button onClick={() => setActiveTab('book')} className={`py-4 font-semibold ${activeTab==='book' ? 'bg-teal-800 text-white' : 'bg-teal-700/90 text-white/90'}`}>BOOK A SLOT</button>
              <button onClick={() => setActiveTab('details')} className={`py-4 font-semibold ${activeTab==='details' ? 'bg-teal-800 text-white' : 'bg-teal-700/90 text-white/90'}`}>DETAILS</button>
            </nav>
          </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Exclusive</span>
                </div>
                <h1 className="mt-2 text-2xl font-display font-semibold">{site.brandName}</h1>
                <p className="mt-1 text-slate-600 text-sm">{site.addressLine}</p>
                <div className="mt-4 border border-teal-300/70 rounded-xl p-4 text-teal-700 bg-teal-50/50 flex items-center justify-between">
                  <div className="font-semibold">20% OFF</div>
                  <button className="text-teal-700/80 font-medium">View</button>
                </div>
              </div>
            </div>
          )}

          {/* Book slots view (single day grid, like desktop) */}
          {view==='book' && (
            <div className="p-4 space-y-4">
              <div className="bg-white rounded-2xl border border-black/5 shadow p-4">
                <h2 className="text-xl font-semibold">Select Slots</h2>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => { setSelected(new Set()); setDate(e.target.value) }}
                    className="rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-700"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => shiftDay(-1)} className="rounded-xl border border-slate-300 px-3 py-2">◀</button>
                    <button onClick={() => shiftDay(1)} className="rounded-xl border border-slate-300 px-3 py-2">▶</button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {slots.map((s) => {
                    const isBooked = booked.has(s)
                    const isSel = selected.has(s)
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSlot(s)}
                        disabled={isBooked}
                        className={[
                          'px-3 py-2 rounded-lg text-sm border transition text-left',
                          isBooked ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-500' : isSel ? 'bg-gold-500 text-brand-900 border-gold-400' : 'bg-white hover:bg-cream-50 border-slate-200 text-slate-800',
                        ].join(' ')}
                      >
                        <div className="font-medium">{s}</div>
                        {!isSel && !isBooked && <div className="text-[11px] opacity-70">{formatCurrency(PRICE_PER_SLOT)} · 1 left</div>}
                        {isSel && <div className="text-[11px] opacity-80">Selected</div>}
                        {isBooked && <div className="text-[11px]">Booked</div>}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Summary view */}
          {view==='summary' && (
            <div className="p-4 space-y-4">
              <div className="bg-white rounded-2xl border border-black/5 shadow p-4">
                <h2 className="text-xl font-semibold">Summary</h2>
                <p className="mt-1 text-slate-600">{new Date(date).toDateString()}</p>
                <p className="mt-1 text-slate-600">Court: {COURTS.find(c => c.id === courtId)?.name}</p>
                <div className="mt-3 text-sm">
                  <div className="font-medium text-slate-700">Selected slots</div>
                  {selected.size === 0 ? (
                    <p className="text-slate-500">None selected</p>
                  ) : (
                    <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-700">
                      {[...selected].sort().map(s => <li key={s}>{s} ({formatCurrency(PRICE_PER_SLOT)})</li>)}
                    </ul>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
                <button className="mt-4 w-full btn-primary" onClick={() => alert('Login/Payment coming soon')}>Login / Continue</button>
              </div>
            </div>
          )}

          {/* Bottom sticky summary/actions */}
          <div className="fixed bottom-16 inset-x-0 z-40 px-4">
            <div className="bg-teal-600 text-white rounded-xl shadow-md px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">{selected.size} slots selected</div>
              <div className="flex items-center gap-2">
                <div className="font-semibold hidden xs:block">{formatCurrency(total)}</div>
                <button className="bg-white text-teal-700 rounded-lg px-3 py-2 font-semibold" onClick={() => setView('summary')}>SUMMARY</button>
              </div>
            </div>
          </div>

          {/* Bottom tab bar */}
          <MobileBottomTabs active={view==='book' ? 'book' : 'details'} onTab={(tab)=> setView(tab)} />
        </div>
      </div>
    )
  }

  // --- Desktop layout (existing) -------------------------------------------
  return (
    <>
      {/* Mobile-only experience */}
      <div className="md:hidden">
        <MobileBooking />
      </div>

      {/* Desktop experience */}
      <div className="hidden md:block bg-cream-50 text-brand-900 min-h-screen w-full overflow-x-hidden">
        <div className="container-gutter max-w-6xl mx-auto py-8">
          {/* Mobile-first matrix layout */}
          <BookingMobile
            date={date}
            setDate={setDate}
            courtId={courtId}
            setCourtId={setCourtId}
            selected={selected}
            setSelected={setSelected}
          />

          {/* Desktop/tablet content below is hidden on mobile via md breakpoint */}
          <div className="hidden md:block">
          {/* Venue header */}
          <div className="grid gap-6 md:grid-cols-[1.8fr_1fr]">
            <div className="bg-white rounded-2xl border border-black/5 shadow overflow-hidden">
              <Carousel images={[...galleryImages, ...galleryImages].slice(0, 6)} interval={5000} />
            </div>
            <div className="bg-white rounded-2xl border border-black/5 shadow p-5">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Exclusive</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-display font-semibold">{site.brandName}</h1>
              <p className="mt-1 text-slate-600">{site.addressLine}</p>
              <div className="mt-4 flex gap-2 text-sm">
                <button className={`px-3 py-2 rounded-xl border ${activeTab==='book'?'bg-brand-900 text-cream-100 border-brand-900':'bg-white text-slate-700 border-slate-200'}`} onClick={()=>setActiveTab('book')}>Book a Slot</button>
                <button className={`px-3 py-2 rounded-xl border ${activeTab==='details'?'bg-brand-900 text-cream-100 border-brand-900':'bg-white text-slate-700 border-slate-200'}`} onClick={()=>setActiveTab('details')}>Details</button>
              </div>
              {activeTab==='details' && (
                <ul className="mt-4 text-slate-700 list-disc pl-5 space-y-1">
                  <li>3 tournament-spec courts</li>
                  <li>Coaching & social play</li>
                  <li>AC lounge and Cafe</li>
                </ul>
              )}
            </div>
          </div>

          {/* Stepper */}
          {/* Desktop/tablet steppers (hidden on mobile) */}
          <div className="mt-6 gap-6 md:grid md:grid-cols-[2fr_1fr] hidden md:grid">
            <div>
              {/* Step 1: Activity/Court */}
              <section className="bg-white rounded-2xl border border-black/5 shadow p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-700">1. Choose an Activity</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="rounded-xl border border-slate-200 px-4 py-3">
                        <div className="text-sm font-medium">Pickleball (Court Booking)</div>
                        <div className="text-xs text-slate-500">3 Facilities Available</div>
                      </div>
                      <button className="btn-primary">Book · {formatCurrency(PRICE_PER_SLOT)}</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => { setSelected(new Set()); setDate(e.target.value) }}
                      className="rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-700"
                    />
                    <select
                      value={courtId}
                      onChange={(e) => { setSelected(new Set()); setCourtId(e.target.value) }}
                      className="rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-700"
                    >
                      {COURTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Quick day selector */}
                <div className="mt-4 flex gap-2 overflow-x-auto">
                  {dayList.map((d, i) => {
                    const isActive = toDateInputValue(d) === date
                    return (
                      <button key={i} onClick={() => { setSelected(new Set()); setDate(toDateInputValue(d)) }} className={`px-3 py-2 rounded-xl border ${isActive ? 'bg-brand-900 text-cream-100 border-brand-900' : 'bg-white text-slate-700 border-slate-200'}`}>
                        <div className="text-sm font-semibold">{d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}</div>
                        <div className="text-xs opacity-80 text-left">{d.toLocaleDateString(undefined, { weekday: 'short' })}</div>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Step 2: Slots */}
              <section className="mt-6 bg-white rounded-2xl border border-black/5 shadow p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800">2. Select Slots</h2>
                  <div className="text-xs text-slate-500">Booked · greyed | Available · selectable</div>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {slots.map((s) => {
                    const isBooked = booked.has(s)
                    const isSel = selected.has(s)
                    return (
                      <button
                        key={s}
                        onClick={() => toggleSlot(s)}
                        disabled={isBooked}
                        className={[
                          'px-3 py-2 rounded-lg text-sm border transition text-left',
                          isBooked ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-500' : isSel ? 'bg-gold-500 text-brand-900 border-gold-400' : 'bg-white hover:bg-cream-50 border-slate-200 text-slate-800',
                        ].join(' ')}
                      >
                        <div className="font-medium">{s}</div>
                        {!isSel && !isBooked && <div className="text-[11px] opacity-70">{formatCurrency(PRICE_PER_SLOT)} · 1 left</div>}
                        {isSel && <div className="text-[11px] opacity-80">Selected</div>}
                        {isBooked && <div className="text-[11px]">Booked</div>}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Step 3: Payment */}
              <section className="mt-6 bg-white rounded-2xl border border-black/5 shadow p-5">
                <h2 className="font-semibold text-slate-800">3. Payment</h2>
                <p className="mt-2 text-slate-600">Continue to secure checkout. No login required for this demo.</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="text-lg font-semibold">Total: {formatCurrency(total)}</div>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    disabled={selected.size === 0}
                  >
                    Continue to Payment
                  </button>
                </div>
                {step === 2 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <input className="rounded-xl bg-white border border-slate-300 px-3 py-2" placeholder="Full name" />
                    <input className="rounded-xl bg-white border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
                    <input className="rounded-xl bg-white border border-slate-300 px-3 py-2" placeholder="Phone" />
                    <select className="rounded-xl bg-white border border-slate-300 px-3 py-2">
                      <option>UPI</option>
                      <option>Credit/Debit Card</option>
                    </select>
                    <button className="btn-primary sm:col-span-2" onClick={() => alert('Payment gateway integration pending. This is a demo flow without login.')}>Pay {formatCurrency(total)}</button>
                  </div>
                )}
              </section>
            </div>

            {/* Summary */}
            <aside className="bg-white rounded-2xl border border-black/5 shadow p-5 h-max sticky top-6">
              <h3 className="font-semibold text-slate-800">Summary</h3>
              <p className="mt-1 text-slate-600">{new Date(date).toDateString()}</p>
              <p className="mt-1 text-slate-600">Court: {COURTS.find(c => c.id === courtId)?.name}</p>
              <div className="mt-3 text-sm">
                <div className="font-medium text-slate-700">Selected slots</div>
                {selected.size === 0 ? (
                  <p className="text-slate-500">None selected</p>
                ) : (
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-slate-700">
                    {[...selected].sort().map(s => <li key={s}>{s} ({formatCurrency(PRICE_PER_SLOT)})</li>)}
                  </ul>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatCurrency(total)}</span>
              </div>
              <button className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 hover:bg-cream-50">Login / Signup</button>
            </aside>
          </div>
          </div>
        </div>

      {/* Mobile summary/payment bottom sheet */}
      {mobileSummaryOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSummaryOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Summary & Payment</h3>
              <button className="text-slate-500" onClick={() => setMobileSummaryOpen(false)}>✕</button>
            </div>
            <div className="mt-3 text-sm">
              <div className="text-slate-600">{new Date(date).toDateString()} · {COURTS.find(c => c.id === courtId)?.name}</div>
              {selected.size === 0 ? (
                <p className="mt-2 text-slate-600">No slots selected</p>
              ) : (
                <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-800">
                  {[...selected].sort().map(s => <li key={s}>{s} ({formatCurrency(PRICE_PER_SLOT)})</li>)}
                </ul>
              )}
              <div className="mt-3 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input className="rounded-xl bg-white border border-slate-300 px-3 py-2" placeholder="Full name" />
              <input className="rounded-xl bg-white border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
              <input className="rounded-xl bg-white border border-slate-300 px-3 py-2" placeholder="Phone" />
              <select className="rounded-xl bg-white border border-slate-300 px-3 py-2">
                <option>UPI</option>
                <option>Credit/Debit Card</option>
              </select>
              <button className="btn-primary sm:col-span-2" onClick={() => alert('Payment gateway integration pending. This is a demo flow without login.')}>Pay {formatCurrency(total)}</button>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </>
  )
}
