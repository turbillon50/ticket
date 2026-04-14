'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const SAMPLE_FLIGHTS = [
  {
    id: 1,
    airline: '✈️ Air Europa',
    departure: '08:30',
    arrival: '16:45',
    duration: '8h 15m',
    stops: 0,
    price: 450,
    from: 'MAD',
    to: 'BRU',
  },
  {
    id: 2,
    airline: '✈️ Lufthansa',
    departure: '10:00',
    arrival: '14:20',
    duration: '4h 20m',
    stops: 1,
    price: 380,
    from: 'MAD',
    to: 'BRU',
  },
  {
    id: 3,
    airline: '✈️ Brussels Airlines',
    departure: '14:15',
    arrival: '22:30',
    duration: '8h 15m',
    stops: 0,
    price: 520,
    from: 'MAD',
    to: 'BRU',
  },
]

export default function FlightsWithSkyscanner() {
  const [selectedFlight, setSelectedFlight] = useState(null)

  return (
    <div className="py-20">
      <h2 className="text-4xl font-bold font-playfair mb-12 text-white">
        Find Flights to Your Event
      </h2>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12 p-6 bg-dark-surface/50 backdrop-blur-md rounded-2xl border border-neon-cyan/20"
        style={{
          boxShadow: '0 0 20px rgba(0, 245, 210, 0.1)',
        }}
      >
        <input
          type="text"
          placeholder="From"
          defaultValue="MAD"
          className="px-4 py-3 bg-dark-bg border border-neon-cyan/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-cyan focus:outline-none transition-all"
        />
        <input
          type="text"
          placeholder="To"
          defaultValue="BRU"
          className="px-4 py-3 bg-dark-bg border border-neon-cyan/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-cyan focus:outline-none transition-all"
        />
        <input
          type="date"
          className="px-4 py-3 bg-dark-bg border border-neon-cyan/20 rounded-lg text-white focus:border-neon-cyan focus:outline-none transition-all"
        />
        <input
          type="number"
          placeholder="Passengers"
          defaultValue="1"
          className="px-4 py-3 bg-dark-bg border border-neon-cyan/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-cyan focus:outline-none transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg"
        >
          Search
        </motion.button>
      </motion.div>

      {/* Flights List */}
      <div className="space-y-4">
        {SAMPLE_FLIGHTS.map((flight, idx) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedFlight(flight.id)}
            className="p-6 bg-dark-surface/50 backdrop-blur-md border-2 border-neon-cyan/20 rounded-xl hover:border-neon-cyan/50 cursor-pointer transition-all group"
            style={{
              boxShadow: selectedFlight === flight.id
                ? '0 0 30px rgba(0, 245, 210, 0.3)'
                : 'none'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div>
                <p className="font-semibold text-neon-cyan">{flight.airline}</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-white">{flight.departure}</p>
                <p className="text-sm text-dark-text-secondary">{flight.from}</p>
              </div>

              <div className="text-center hidden md:block">
                <p className="text-sm text-dark-text-secondary mb-2">
                  {flight.duration}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-0.5 bg-neon-cyan"></div>
                  {flight.stops > 0 && (
                    <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                  )}
                  <div className="w-8 h-0.5 bg-neon-cyan"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-white">{flight.arrival}</p>
                <p className="text-sm text-dark-text-secondary">{flight.to}</p>
              </div>

              <div className="text-center">
                {flight.stops === 0 ? (
                  <span className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan rounded-full text-sm font-semibold border border-neon-cyan/50">
                    Direct
                  </span>
                ) : (
                  <span className="text-dark-text-secondary">{flight.stops} stop</span>
                )}
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-neon-cyan mb-2">
                  ${flight.price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 245, 210, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-neon-cyan text-dark-bg font-bold rounded-lg text-sm group-hover:shadow-lg transition-all"
                >
                  Select
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
