'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/lib/store'
import EventCard from './booking/EventCard'
import FlightCard from './booking/FlightCard'
import AccommodationCard from './booking/AccommodationCard'

const FEATURED_EVENTS = [
  {
    id: 'evt_1',
    name: 'Tomorrowland 2026',
    location: 'Boom, Belgium',
    date: 'Jul 18-20, 2026',
    price: 1500,
    image: '🎪',
  },
  {
    id: 'evt_2',
    name: 'Ultra Miami 2026',
    location: 'Miami Beach, USA',
    date: 'Mar 20-22, 2026',
    price: 1200,
    image: '🎵',
  },
]

const FEATURED_FLIGHTS = [
  {
    id: 'flt_1',
    airline: 'Air Europa',
    from: 'MAD',
    to: 'BRU',
    departure: '08:30',
    arrival: '16:45',
    price: 450,
  },
  {
    id: 'flt_2',
    airline: 'Lufthansa',
    from: 'MAD',
    to: 'BRU',
    departure: '10:00',
    arrival: '14:20',
    price: 380,
  },
]

const FEATURED_ACCOMMODATIONS = [
  {
    id: 'acc_1',
    name: 'The Grand Brussels',
    location: 'Brussels Center',
    price: 350,
    rating: 4.8,
  },
  {
    id: 'acc_2',
    name: 'Urban Lofts',
    location: 'Sablon District',
    price: 280,
    rating: 4.6,
  },
]

export default function AllInclusiveSearch() {
  const [activeCategory, setActiveCategory] = useState<'events' | 'flights' | 'accommodations'>('events')
  const { addItem, items } = useCart()

  const categories = [
    { id: 'events', label: '🎪 Events', count: FEATURED_EVENTS.length },
    { id: 'flights', label: '✈️ Flights', count: FEATURED_FLIGHTS.length },
    { id: 'accommodations', label: '🏨 Accommodations', count: FEATURED_ACCOMMODATIONS.length },
  ]

  return (
    <div className="py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <h2 className="text-5xl font-bold font-playfair text-white mb-4">
          Plan Your All-Inclusive Trip
        </h2>
        <p className="text-2xl text-dark-text-secondary mb-8">
          Bundle events, flights & accommodations for unforgettable experiences
        </p>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-12 overflow-x-auto">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              whileHover={{ scale: 1.05 }}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-neon-green text-dark-bg shadow-glow'
                  : 'border-2 border-neon-green/30 text-neon-green hover:border-neon-green/60'
              }`}
            >
              {cat.label}
              <span className="ml-2 text-sm opacity-70">({cat.count})</span>
            </motion.button>
          ))}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neon-green/10 border border-neon-green/30 rounded-lg p-4 mb-8"
          >
            <p className="text-neon-green font-bold">
              {items.length} item(s) in your bundle · Total: ${items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeCategory === 'events' &&
            FEATURED_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onAdd={() =>
                  addItem({
                    id: event.id,
                    type: 'event',
                    title: event.name,
                    price: event.price,
                    quantity: 1,
                    details: event,
                  })
                }
              />
            ))}

          {activeCategory === 'flights' &&
            FEATURED_FLIGHTS.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onAdd={() =>
                  addItem({
                    id: flight.id,
                    type: 'flight',
                    title: `${flight.airline} (${flight.from} → ${flight.to})`,
                    price: flight.price,
                    quantity: 1,
                    details: flight,
                  })
                }
              />
            ))}

          {activeCategory === 'accommodations' &&
            FEATURED_ACCOMMODATIONS.map((acc) => (
              <AccommodationCard
                key={acc.id}
                accommodation={acc}
                onAdd={() =>
                  addItem({
                    id: acc.id,
                    type: 'accommodation',
                    title: acc.name,
                    price: acc.price,
                    quantity: 1,
                    details: acc,
                  })
                }
              />
            ))}
        </motion.div>
      </div>
    </div>
  )
}
