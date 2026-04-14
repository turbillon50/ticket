'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const EVENTS_WITH_VIDEOS = [
  {
    id: 1,
    name: 'Tomorrowland 2026',
    location: 'Boom, Belgium',
    date: 'Jul 18-20, 2026',
    price: 1500,
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Music Festival',
    artists: ['David Guetta', 'Calvin Harris', 'Armin van Buuren'],
  },
  {
    id: 2,
    name: 'Ultra Miami 2026',
    location: 'Miami Beach, USA',
    date: 'Mar 20-22, 2026',
    price: 1200,
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Electronic Music',
    artists: ['Deadmau5', 'Tiësto', 'Eric Prydz'],
  },
  {
    id: 3,
    name: 'Sonar Barcelona 2026',
    location: 'Barcelona, Spain',
    date: 'Jun 11-13, 2026',
    price: 1100,
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Festival',
    artists: ['Richie Hawtin', 'Nina Kraviz', 'Pan-Pot'],
  },
]

export default function EventsWithYouTube() {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS_WITH_VIDEOS[0])

  return (
    <div className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player - Main */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-neon-cyan/30 shadow-lg"
            style={{
              boxShadow: '0 0 40px rgba(0, 245, 210, 0.3), inset 0 0 40px rgba(0, 245, 210, 0.1)',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedEvent.youtubeId}?autoplay=0&controls=1`}
              title={selectedEvent.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-dark-surface/50 backdrop-blur-md rounded-xl border border-neon-cyan/20"
          >
            <h2 className="text-3xl font-bold font-playfair text-white mb-2">
              {selectedEvent.name}
            </h2>
            <p className="text-neon-cyan text-lg font-semibold mb-4">
              {selectedEvent.location} • {selectedEvent.date}
            </p>
            <p className="text-dark-text-secondary mb-6">
              Featuring {selectedEvent.artists.join(', ')}
            </p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 210, 0.5)' }}
                className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-bold rounded-lg"
              >
                Book Now - ${selectedEvent.price}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 border-2 border-neon-cyan text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan/10 transition-all"
              >
                Details
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Events List - Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <h3 className="text-2xl font-bold font-playfair mb-6 text-white">
            Trending Events
          </h3>
          <div className="space-y-4">
            {EVENTS_WITH_VIDEOS.map((event, idx) => (
              <motion.button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedEvent.id === event.id
                    ? 'border-neon-cyan bg-neon-cyan/10 shadow-lg'
                    : 'border-dark-border hover:border-neon-cyan/50'
                }`}
                style={{
                  boxShadow: selectedEvent.id === event.id
                    ? '0 0 30px rgba(0, 245, 210, 0.3)'
                    : 'none'
                }}
              >
                <p className="font-semibold text-white mb-1">{event.name}</p>
                <p className="text-sm text-neon-cyan">{event.category}</p>
                <p className="text-sm text-dark-text-secondary">${event.price}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
