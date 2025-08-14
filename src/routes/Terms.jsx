import React from 'react'
// Navbar removed per request
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <>
      <main className="bg-white text-gray-900 min-h-screen">
        <div className="container-gutter max-w-3xl mx-auto py-16 sm:py-24">
          <h1 className="section-title text-gray-900">Terms & Conditions</h1>
          <p className="mt-4 text-gray-700">These sample terms are placeholders. Replace with your legal copy.</p>
          <ol className="mt-6 space-y-4 list-decimal list-inside text-gray-800">
            <li>Bookings: Sessions must be booked in advance. Please arrive 10 minutes early.</li>
            <li>Safety: Proper footwear is required on court. Follow staff guidance at all times.</li>
            <li>Refunds: See our refund policy for cancellations and rescheduling.</li>
            <li>Conduct: Be respectful of other members and maintain cleanliness.</li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  )
}
