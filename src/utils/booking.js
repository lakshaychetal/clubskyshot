// Booking utilities: courts, slots, and pricing helpers

export const COURTS = [
  { id: 'court-1', name: 'Court 1' },
  { id: 'court-2', name: 'Court 2' },
  { id: 'court-3', name: 'Court 3' },
]

// Club hours: 6:00 AM – 1:00 AM next day
export const OPEN_HOUR = 6 // 06:00
export const CLOSE_HOUR = 25 // 01:00 next day (24 + 1)

export const SLOT_MINUTES = 60
export const PRICE_PER_SLOT = 2000 // INR per hour, adjust as needed

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function toDateInputValue(date = new Date()) {
  const d = new Date(date)
  const tzOffset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - tzOffset * 60000)
  return local.toISOString().slice(0, 10)
}

export function generateSlotsForDate(dateStr) {
  // Returns array of slot strings like '06:00', '07:00', ... '24:00', '01:00'
  const slots = []
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    const hh = h % 24
    const label = `${String(hh).padStart(2, '0')}:00`
    slots.push(label)
  }
  return slots
}

// Example: replace with real availability API later
export function getAvailability(dateStr, courtId) {
  // For now, all slots available except a few demo blocks
  const all = new Set(generateSlotsForDate(dateStr))
  const booked = new Set()
  // Make 08:00 and 19:00 booked on Court 1 as an example
  if (courtId === 'court-1') {
    booked.add('08:00'); booked.add('19:00')
  }
  // Morning slot booked on Court 2
  if (courtId === 'court-2') {
    booked.add('10:00')
  }
  return { all, booked }
}

export function computeTotal(selectedSlots) {
  return selectedSlots.size * PRICE_PER_SLOT
}
