'use client'

import { useState } from 'react'

export default function StaysSearch() {
  const [formData, setFormData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Stays search:', formData)
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light mb-12">Book Your Stay</h2>

        <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Location</label>
              <input
                type="text"
                placeholder="City or Hotel Name"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light placeholder-gray-600 focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Check-In</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Check-Out</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Guests</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-light text-gray-400 mb-2">Rooms</label>
              <select
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-white font-light focus:border-amber-400 focus:outline-none"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Room' : 'Rooms'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 text-black py-4 font-light hover:bg-amber-500 transition text-lg"
          >
            Search Accommodations
          </button>
        </form>
      </div>
    </div>
  )
}
