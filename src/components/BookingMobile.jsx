import React, { useMemo, useState } from 'react'
import { COURTS, toDateInputValue, generateSlotsForDate, getAvailability, PRICE_PER_SLOT, formatCurrency } from '../utils/booking'

// Mobile-first booking UI:
// - Left vertical rail with steps (Sport, Facility, Slots, Summary)
// - Slot matrix with time rows and 4 day columns
// - Selecting a cell switches to that day and toggles the slot
export default function BookingMobile({ date, setDate, courtId, setCourtId, selected, setSelected }) {
  const [baseDate, setBaseDate] = useState(() => new Date(date))

  // Build 4 visible days starting from baseDate
  const dayList = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => {
      const d = new Date(baseDate)
      d.setDate(baseDate.getDate() + i)
      return d
    })
  }, [baseDate])

  const slots = useMemo(() => generateSlotsForDate(date), [date])

  const shiftBase = (delta) => {
    const next = new Date(baseDate)
    next.setDate(baseDate.getDate() + delta)
    setBaseDate(next)
  }

  const onCellClick = (dayDate, slot) => {
    const dStr = toDateInputValue(dayDate)
    // Move context to that day first
    if (dStr !== date) {
      setDate(dStr)
      // New day: start a fresh selection with this slot
      const next = new Set([slot])
      setSelected(next)
      return
    }
    // Same day: toggle the slot
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(slot)) next.delete(slot)
      else next.add(slot)
      return next
    })
  }

  const DayHeader = ({ d }) => (
    <div className="px-2 py-3 text-center">
      <div className="text-xl font-semibold text-slate-900">{d.getDate()}</div>
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{d.toLocaleDateString(undefined, { weekday: 'short' })}</div>
    </div>
  )

  const gridTemplate = {
    gridTemplateColumns: '72px repeat(4, minmax(72px, 1fr))',
  }

  return (
    <div className="md:hidden relative">
      {/* Left step rail */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-center pt-16">
        <div className="sticky top-24 space-y-8 text-[11px] font-semibold tracking-widest text-slate-500">
          <div className="rotate-[-90deg]">SPORT</div>
          <div className="rotate-[-90deg]">FACILITY</div>
          <div className="rotate-[-90deg] text-emerald-600">SLOTS</div>
          <div className="rotate-[-90deg]">SUMMARY</div>
        </div>
      </div>

      {/* Content card */}
      <div className="pl-10">
        <div className="bg-white rounded-2xl border border-black/5 shadow overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="text-xl font-display font-semibold">Select Slots</div>
            <div className="flex items-center gap-2">
              <button aria-label="Previous day" onClick={() => shiftBase(-1)} className="rounded-xl border border-slate-200 px-2 py-2 active:scale-[.98]">◀</button>
              <button aria-label="Next day" onClick={() => shiftBase(1)} className="rounded-xl border border-slate-200 px-2 py-2 active:scale-[.98]">▶</button>
            </div>
          </div>

          {/* Filters row */}
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => { setSelected(new Set()); setDate(e.target.value); setBaseDate(new Date(e.target.value)) }}
              className="rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-700 flex-1"
            />
            <select
              value={courtId}
              onChange={(e) => { setSelected(new Set()); setCourtId(e.target.value) }}
              className="rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-700"
            >
              {COURTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Matrix header */}
          <div className="px-2 pb-2 overflow-x-auto">
            <div className="grid" style={gridTemplate}>
              <div></div>
              {dayList.map((d, i) => (
                <div key={i} className={`${toDateInputValue(d) === date ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'} border rounded-xl mx-1`}>
                  <DayHeader d={d} />
                </div>
              ))}
            </div>
          </div>

          {/* Matrix body */}
          <div className="px-2 pb-4 overflow-x-auto">
            <div className="grid gap-y-2" style={gridTemplate}>
              {slots.map((s) => (
                <React.Fragment key={s}>
                  {/* Time label */}
                  <div className="h-16 flex items-center justify-center text-[12px] font-semibold text-slate-600">
                    {s}
                  </div>
                  {dayList.map((d, idx) => {
                    const dStr = toDateInputValue(d)
                    const { booked } = getAvailability(dStr, courtId)
                    const isBooked = booked.has(s)
                    const isActiveDay = dStr === date
                    const isSelected = isActiveDay && selected.has(s)
                    const baseCls = 'h-16 mx-1 rounded-xl border text-center flex flex-col items-center justify-center text-[12px]'

                    if (isBooked) {
                      return (
                        <div key={idx} className={`${baseCls} bg-slate-100 border-slate-200 text-slate-500`}>
                          Booked
                        </div>
                      )
                    }

                    if (!isActiveDay) {
                      return (
                        <button
                          key={idx}
                          className={`${baseCls} bg-white hover:bg-cream-50 border-slate-200 text-slate-900`}
                          onClick={() => onCellClick(d, s)}
                        >
                          <div className="font-semibold">{formatCurrency(PRICE_PER_SLOT)}</div>
                          <div className="text-[11px] opacity-70">1 left</div>
                        </button>
                      )
                    }

                    return (
                      <button
                        key={idx}
                        className={`${baseCls} ${isSelected ? 'bg-gold-500 text-brand-900 border-gold-400' : 'bg-white hover:bg-cream-50 border-slate-200 text-slate-900'}`}
                        onClick={() => onCellClick(d, s)}
                      >
                        {isSelected ? (
                          <>
                            <div className="font-semibold">Selected</div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold">{formatCurrency(PRICE_PER_SLOT)}</div>
                            <div className="text-[11px] opacity-70">1 left</div>
                          </>
                        )}
                      </button>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Summary card */}
        <div className="mt-4 bg-white rounded-2xl border border-black/5 shadow p-4">
          <div className="font-semibold text-slate-800 mb-2">Summary</div>
          <div className="text-sm text-slate-700">{new Date(date).toDateString()}</div>
          <div className="text-sm text-slate-700">Court: {COURTS.find(c => c.id === courtId)?.name}</div>
          <div className="mt-2 text-sm text-slate-700">Selected: {selected.size} slot(s)</div>
          <div className="mt-3 flex gap-2">
            <a href="#" className="btn-primary flex-1 text-center">Continue</a>
          </div>
        </div>
      </div>
    </div>
  )
}
