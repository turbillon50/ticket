'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const ACCOMMODATIONS = [
  {
    id: 1,
    name: 'The Grand Brussels',
    location: 'Brussels Center',
    lat: 50.8503,
    lng: 4.3517,
    price: 350,
    rating: 4.8,
    image: '🏨',
    beds: 2,
    wifi: true,
    parking: true,
  },
  {
    id: 2,
    name: 'Urban Lofts',
    location: 'Sablon District',
    lat: 50.8389,
    lng: 4.3595,
    price: 280,
    rating: 4.6,
    image: '🏢',
    beds: 1,
    wifi: true,
    parking: false,
  },
  {
    id: 3,
    name: 'Luxury Penthouse',
    location: 'European Quarter',
    lat: 50.8467,
    lng: 4.3783,
    price: 520,
    rating: 4.9,
    image: '🌟',
    beds: 3,
    wifi: true,
    parking: true,
  },
]

export default function AccommodationsWithMap() {
  const [selectedHotel, setSelectedHotel] = useState(ACCOMMODATIONS[0])

  return (
    <div className="py-20">
      <h2 className="text-4xl font-bold font-playfair mb-12 text-white">
        Premium Accommodations in Brussels
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <div
            className="w-full h-96 rounded-2xl overflow-hidden border-2 border-neon-cyan/30"
            style={{
              boxShadow: '0 0 40px rgba(0, 245, 210, 0.3)',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.3317849355266!2d${selectedHotel.lng}!3d${selectedHotel.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2s!5e0!3m2!1sen!2sbe!4v1234567890`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Hotel Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-dark-surface/50 backdrop-blur-md rounded-xl border border-neon-cyan/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {selectedHotel.image} {selectedHotel.name}
                </h3>
                <p className="text-neon-cyan text-lg">{selectedHotel.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-neon-cyan">
                  ${selectedHotel.price}
                </p>
                <p className="text-sm text-dark-text-secondary">/night</p>
              </div>
            </div>

            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="text-white font-semibold">{selectedHotel.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🛏️</span>
                <span className="text-white">{selectedHotel.beds} beds</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedHotel.wifi ? '📡' : '✗'}</span>
                <span className="text-white">Free WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedHotel.parking ? '🅿️' : '✗'}</span>
                <span className="text-white">Parking</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 210, 0.5)' }}
              className="w-full px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg"
            >
              Book Now
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hotels List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <h3 className="text-2xl font-bold font-playfair mb-6 text-white">
            Other Options
          </h3>
          <div className="space-y-4">
            {ACCOMMODATIONS.map((hotel) => (
              <motion.button
                key={hotel.id}
                onClick={() => setSelectedHotel(hotel)}
                whileHover={{ scale: 1.02 }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedHotel.id === hotel.id
                    ? 'border-neon-cyan bg-neon-cyan/10'
                    : 'border-dark-border hover:border-neon-cyan/50'
                }`}
                style={{
                  boxShadow: selectedHotel.id === hotel.id
                    ? '0 0 30px rgba(0, 245, 210, 0.3)'
                    : 'none'
                }}
              >
                <p className="font-semibold text-white mb-1">
                  {hotel.image} {hotel.name}
                </p>
                <p className="text-sm text-neon-cyan mb-2">{hotel.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-dark-text-secondary text-sm">
                    ⭐ {hotel.rating}
                  </span>
                  <span className="text-neon-cyan font-bold">
                    ${hotel.price}/night
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
