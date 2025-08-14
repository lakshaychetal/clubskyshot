import React from 'react'
// Navbar removed per request
import Footer from '../components/Footer'

export default function Refund() {
  return (
    <>
      <main className="bg-white text-gray-900 min-h-screen">
        <div className="container-gutter max-w-3xl mx-auto py-16 sm:py-24">
          <h1 className="section-title text-gray-900">Refund Policy</h1>
          <p className="mt-4 text-gray-700">This is a sample refund policy. Adapt it to your operations.</p>
          <ul className="mt-6 space-y-3 list-disc list-inside text-gray-800">
            <li>Full refund for cancellations 24+ hours before the session.</li>
            <li>50% credit for cancellations within 12–24 hours.</li>
            <li>No-shows are not refundable.</li>
            <li>Contact our team for exceptional circumstances.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
