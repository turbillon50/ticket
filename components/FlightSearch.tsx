'use client'

import { useState } from 'react'

export default function FlightSearch() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Flight search:', formData)
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light mb-12">Book Your Flights</h2>

        <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">From</label>
              <input
                type="text"
                placeholder="Departure City"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light placeholder-gray-600 focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">To</label>
              <input
                type="text"
                placeholder="Destination City"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light placeholder-gray-600 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Depart</label>
              <input
                type="date"
                value={formData.departDate}
                onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Return</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Passengers</label>
              <select
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 text-black py-4 font-light hover:bg-amber-500 transition text-lg"
          >
            Search Flights
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
          <p className="text-gray-400 font-light">
            💡 Book flights with your URMAH event package and get exclusive airport transfers, lounge access, and priority check-in.
          </p>
        </div>
      </div>
    </div>
  )
}
