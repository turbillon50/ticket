'use client'

import { useState } from 'react'

const FEATURED_EVENTS = [
  {
    id: 1,
    name: 'Tomorrowland 2026',
    location: 'Boom, Belgium',
    date: 'Jul 18-20, 2026',
    image: 'bg-gradient-to-br from-purple-600 to-purple-900',
    category: 'Music Festival',
    price: 1500,
    tickets: 500,
  },
  {
    id: 2,
    name: 'Ultra Miami 2026',
    location: 'Miami Beach, USA',
    date: 'Mar 20-22, 2026',
    image: 'bg-gradient-to-br from-blue-600 to-blue-900',
    category: 'Electronic Music',
    price: 1200,
    tickets: 400,
  },
  {
    id: 3,
    name: 'Sonar Barcelona 2026',
    location: 'Barcelona, Spain',
    date: 'Jun 11-13, 2026',
    image: 'bg-gradient-to-br from-pink-600 to-pink-900',
    category: 'Festival',
    price: 1100,
    tickets: 300,
  },
  {
    id: 4,
    name: 'The Weeknd World Tour',
    location: 'Estadio Azteca, Mexico',
    date: 'May 15, 2026',
    image: 'bg-gradient-to-br from-red-600 to-red-900',
    category: 'Concert',
    price: 2000,
    tickets: 200,
  },
]

export default function EventsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Music Festival', 'Electronic Music', 'Festival', 'Concert']

  return (
    <div className="py-12">
      {/* Category Filter */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 font-light text-sm whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-400 text-black'
                : 'border border-zinc-700 text-gray-300 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_EVENTS.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            {/* Event Card */}
            <div className={`${event.image} rounded-lg h-64 mb-4 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-4">
                <div>
                  <p className="text-amber-400 text-xs font-light mb-2">{event.category}</p>
                  <h3 className="text-white font-light text-lg mb-1">{event.name}</h3>
                  <p className="text-gray-300 text-sm font-light">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="space-y-2">
              <p className="text-gray-400 text-sm font-light">{event.date}</p>
              <div className="flex justify-between items-center">
                <span className="text-white font-light">From ${event.price}</span>
                <button className="px-4 py-2 bg-amber-400 text-black text-sm font-light hover:bg-amber-500 transition">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
