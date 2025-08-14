import React from 'react'
// Navbar removed per request
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <>
      <main className="bg-white text-gray-900 min-h-screen">
        <div className="container-gutter max-w-3xl mx-auto py-16 sm:py-24">
          <h1 className="section-title text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-gray-700">This is a sample policy. Replace with your actual privacy practices.</p>
          <div className="mt-6 space-y-4 text-gray-800">
            <p>We collect minimal information to respond to your inquiries (name, email, message).</p>
            <p>We do not sell your data. Analytics may be used to improve the site experience.</p>
            <p>Contact us to request data deletion or updates.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
