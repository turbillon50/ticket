'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'

interface ItineraryItem {
  id: string
  type: 'event' | 'flight' | 'accommodation' | 'activity' | 'note'
  title: string
  date: string
  time?: string
  location?: string
  description?: string
  icon: string
  color: string
}

interface Itinerary {
  id: string
  name: string
  destination: string
  startDate: string
  endDate: string
  emoji: string
  items: ItineraryItem[]
  shared: boolean
  sharedWith: Array<{ id: string; name: string; avatar: string }>
  budget?: number
  spent?: number
}

export default function MyItinerariesPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: 'itin_1',
      name: 'Electric Summer Festival 2026',
      destination: 'Miami Beach, Florida',
      startDate: 'Jun 15, 2026',
      endDate: 'Jun 18, 2026',
      emoji: '🎵',
      items: [
        {
          id: 'item_1',
          type: 'flight',
          title: 'Flight to Miami',
          date: 'Jun 15',
          time: '10:00 AM',
          location: 'JFK → MIA',
          icon: '✈️',
          color: 'text-blue-400',
        },
        {
          id: 'item_2',
          type: 'accommodation',
          title: 'Check-in at Ocean View Resort',
          date: 'Jun 15',
          time: '3:00 PM',
          location: 'Miami Beach',
          icon: '🏨',
          color: 'text-purple-400',
        },
        {
          id: 'item_3',
          type: 'event',
          title: 'Festival Day 1 - Opening Ceremony',
          date: 'Jun 15',
          time: '6:00 PM',
          location: 'Festival Grounds',
          icon: '🎪',
          color: 'text-neon-green',
        },
        {
          id: 'item_4',
          type: 'activity',
          title: 'Beach Sunset Experience',
          date: 'Jun 16',
          time: '5:00 PM',
          location: 'Miami Beach',
          description: 'Relax and enjoy the sunset before evening performances',
          icon: '🌅',
          color: 'text-orange-400',
        },
        {
          id: 'item_5',
          type: 'note',
          title: 'Remember to get sunscreen!',
          date: 'Jun 16',
          icon: '📝',
          color: 'text-yellow-400',
        },
      ],
      shared: false,
      sharedWith: [],
      budget: 2450,
      spent: 2450,
    },
    {
      id: 'itin_2',
      name: 'Mountain Music Retreat',
      destination: 'Aspen, Colorado',
      startDate: 'Apr 10, 2026',
      endDate: 'Apr 12, 2026',
      emoji: '🏔️',
      items: [
        {
          id: 'item_6',
          type: 'flight',
          title: 'Flight to Denver',
          date: 'Apr 10',
          time: '8:00 AM',
          location: 'JFK → DEN',
          icon: '✈️',
          color: 'text-blue-400',
        },
        {
          id: 'item_7',
          type: 'accommodation',
          title: 'Mountain Lodge Check-in',
          date: 'Apr 10',
          time: '2:00 PM',
          location: 'Aspen',
          icon: '🏨',
          color: 'text-purple-400',
        },
      ],
      shared: true,
      sharedWith: [
        { id: 'user_1', name: 'Sarah Chen', avatar: '👩' },
        { id: 'user_2', name: 'Marcus Johnson', avatar: '👨' },
      ],
      budget: 1850,
      spent: 1200,
    },
  ])

  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null)
  const [showForm, setShowForm] = useState(false)

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Plan Your Adventures</h1>
          <p className="text-dark-text-secondary mb-8">
            Sign in to create and manage your trip itineraries
          </p>
          <button
            onClick={() => router.push('/sign-in')}
            className="px-8 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-start"
        >
          <div>
            <h1 className="text-5xl font-bold font-playfair text-white mb-4">My Trip Itineraries</h1>
            <p className="text-dark-text-secondary text-lg">Plan and organize your all-inclusive experiences</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
          >
            ✨ Create Itinerary
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
            <p className="text-dark-text-secondary text-sm mb-2">Total Itineraries</p>
            <p className="text-3xl font-bold text-white">{itineraries.length}</p>
          </div>
          <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
            <p className="text-dark-text-secondary text-sm mb-2">Total Budget</p>
            <p className="text-3xl font-bold text-neon-green">
              ${itineraries.reduce((sum, i) => sum + (i.budget || 0), 0)}
            </p>
          </div>
          <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
            <p className="text-dark-text-secondary text-sm mb-2">Shared With</p>
            <p className="text-3xl font-bold text-white">
              {itineraries.flatMap((i) => i.sharedWith).length}
            </p>
          </div>
        </motion.div>

        {/* Itineraries Grid */}
        {!selectedItinerary ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {itineraries.map((itinerary) => (
              <motion.div
                key={itinerary.id}
                variants={itemVariants}
                onClick={() => setSelectedItinerary(itinerary)}
                className="bg-dark-card border border-neon-green/20 rounded-2xl p-6 hover:border-neon-green/50 transition-all cursor-pointer"
                style={{
                  boxShadow: '0 0 40px rgba(0, 255, 136, 0.03)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{itinerary.emoji}</span>
                  {itinerary.shared && <span className="text-neon-green text-xs font-bold">🔗 SHARED</span>}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{itinerary.name}</h3>
                <p className="text-dark-text-secondary mb-4">📍 {itinerary.destination}</p>

                <div className="space-y-3 mb-6 pb-6 border-b border-neon-green/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text-secondary">Duration:</span>
                    <span className="text-white font-semibold">{itinerary.startDate} - {itinerary.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text-secondary">Items:</span>
                    <span className="text-white font-semibold">{itinerary.items.length}</span>
                  </div>
                  {itinerary.budget && (
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-text-secondary">Budget:</span>
                      <span className="text-neon-green font-semibold">
                        ${itinerary.spent} / ${itinerary.budget}
                      </span>
                    </div>
                  )}
                </div>

                {itinerary.sharedWith.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-dark-text-secondary text-xs">Shared with:</span>
                    <div className="flex -space-x-2">
                      {itinerary.sharedWith.map((person) => (
                        <span
                          key={person.id}
                          className="text-xl border border-dark-bg rounded-full"
                          title={person.name}
                        >
                          {person.avatar}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Detailed Itinerary View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setSelectedItinerary(null)}
              className="mb-8 text-neon-green hover:text-neon-green-light font-semibold transition-colors flex items-center gap-2"
            >
              ← Back to Itineraries
            </button>

            <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8 pb-8 border-b border-neon-green/20">
                <div className="flex items-start gap-6">
                  <span className="text-7xl">{selectedItinerary.emoji}</span>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{selectedItinerary.name}</h1>
                    <p className="text-dark-text-secondary text-lg">
                      📍 {selectedItinerary.destination}
                    </p>
                    <p className="text-dark-text-secondary">
                      📅 {selectedItinerary.startDate} - {selectedItinerary.endDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {selectedItinerary.budget && (
                    <div>
                      <p className="text-dark-text-secondary text-sm">Budget Progress</p>
                      <p className="text-3xl font-bold text-neon-green">
                        ${selectedItinerary.spent} / ${selectedItinerary.budget}
                      </p>
                      <div className="w-40 bg-dark-bg rounded-full h-3 mt-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(((selectedItinerary.spent || 0) / (selectedItinerary.budget || 1)) * 100).toFixed(0)}%`,
                          }}
                          transition={{ duration: 0.8 }}
                          className="bg-neon-green h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <h2 className="text-2xl font-bold text-white mb-6">✨ Your Schedule</h2>
              <div className="space-y-4">
                {selectedItinerary.items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-6 pb-6 border-b border-neon-green/10 last:border-0"
                  >
                    <div className="flex-shrink-0 text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <span className="text-dark-text-secondary text-sm">
                          {item.date} {item.time && `at ${item.time}`}
                        </span>
                      </div>
                      {item.location && (
                        <p className="text-dark-text-secondary text-sm mb-2">📍 {item.location}</p>
                      )}
                      {item.description && <p className="text-dark-text-secondary">{item.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 pt-8 border-t border-neon-green/20 flex gap-4">
                <button className="flex-1 px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all">
                  📝 Edit Itinerary
                </button>
                <button className="flex-1 px-6 py-3 bg-dark-bg border border-neon-green/20 text-white font-bold rounded-lg hover:border-neon-green transition-all">
                  🔗 Share with Others
                </button>
                <button className="flex-1 px-6 py-3 bg-dark-bg border border-neon-green/20 text-white font-bold rounded-lg hover:border-neon-green transition-all">
                  📥 Export PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {itineraries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-dark-card border border-neon-green/20 rounded-2xl"
          >
            <span className="text-7xl mb-4 block">🗺️</span>
            <p className="text-dark-text-secondary text-lg mb-6">No itineraries yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark"
            >
              Create Your First Itinerary
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
