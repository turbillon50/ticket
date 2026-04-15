'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface TravelCompanion {
  id: string
  name: string
  avatar: string
  age: number
  location: string
  bio: string
  interests: string[]
  upcomingEvents: Array<{
    name: string
    date: string
    emoji: string
  }>
  spotsFilled: number
  spotsAvailable: number
  verified: boolean
}

export default function TravelCompanionsPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [searchEvent, setSearchEvent] = useState('')
  const [selectedCompanion, setSelectedCompanion] = useState<TravelCompanion | null>(null)
  const [filterInterest, setFilterInterest] = useState<string>('all')

  // Mock companions data
  const companions: TravelCompanion[] = [
    {
      id: 'comp_1',
      name: 'Sarah Chen',
      avatar: '👩',
      age: 26,
      location: 'New York, USA',
      bio: 'Music lover and adventure seeker! Always looking for the best festivals and events around the world.',
      interests: ['Music Festivals', 'Travel', 'Photography', 'Yoga'],
      upcomingEvents: [
        { name: 'Electric Summer Festival', date: 'Jun 15-18', emoji: '🎵' },
        { name: 'Beach Party 2026', date: 'May 1-4', emoji: '🏖️' },
      ],
      spotsFilled: 2,
      spotsAvailable: 2,
      verified: true,
    },
    {
      id: 'comp_2',
      name: 'Marcus Johnson',
      avatar: '👨',
      age: 29,
      location: 'Los Angeles, USA',
      bio: 'Experienced traveler with a passion for festivals and meeting new people. First time using URMAH!',
      interests: ['Festivals', 'Networking', 'Food', 'Nightlife'],
      upcomingEvents: [
        { name: 'Electric Summer Festival', date: 'Jun 15-18', emoji: '🎵' },
      ],
      spotsFilled: 1,
      spotsAvailable: 3,
      verified: true,
    },
    {
      id: 'comp_3',
      name: 'Emma Rodriguez',
      avatar: '👩',
      age: 24,
      location: 'Miami, USA',
      bio: 'Local to Miami but always up for adventures! Love meeting people from all over the world.',
      interests: ['Beach Events', 'Dancing', 'Socializing', 'Wellness'],
      upcomingEvents: [
        { name: 'Electric Summer Festival', date: 'Jun 15-18', emoji: '🎵' },
      ],
      spotsFilled: 3,
      spotsAvailable: 1,
      verified: true,
    },
    {
      id: 'comp_4',
      name: 'James Wilson',
      avatar: '👨',
      age: 31,
      location: 'Denver, USA',
      bio: 'Mountain enthusiast organizing a group for the music retreat. Looking for more adventurous souls!',
      interests: ['Mountain Activities', 'Music', 'Hiking', 'Camping'],
      upcomingEvents: [
        { name: 'Mountain Music Retreat', date: 'Apr 10-12', emoji: '🏔️' },
      ],
      spotsFilled: 4,
      spotsAvailable: 2,
      verified: true,
    },
    {
      id: 'comp_5',
      name: 'Olivia Martinez',
      avatar: '👩',
      age: 27,
      location: 'Barcelona, Spain',
      bio: 'International traveler excited to explore American festivals. Solo traveler looking for a squad!',
      interests: ['Travel', 'Festivals', 'Art', 'Culture'],
      upcomingEvents: [
        { name: 'Electric Summer Festival', date: 'Jun 15-18', emoji: '🎵' },
        { name: 'Winter Wonderland Fest', date: 'Dec 20-23', emoji: '⛄' },
      ],
      spotsFilled: 1,
      spotsAvailable: 4,
      verified: true,
    },
  ]

  const allInterests = Array.from(new Set(companions.flatMap((c) => c.interests)))

  let filteredCompanions = companions

  if (searchEvent) {
    filteredCompanions = filteredCompanions.filter((c) =>
      c.upcomingEvents.some((e) => e.name.toLowerCase().includes(searchEvent.toLowerCase()))
    )
  }

  if (filterInterest !== 'all') {
    filteredCompanions = filteredCompanions.filter((c) => c.interests.includes(filterInterest))
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Find Travel Companions</h1>
          <p className="text-dark-text-secondary mb-8">
            Sign in to connect with other travelers heading to your events
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
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold font-playfair text-white mb-4">Find Travel Companions</h1>
          <p className="text-dark-text-secondary text-lg">
            Connect with other travelers heading to your favorite events and create unforgettable memories together
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card border border-neon-green/20 rounded-2xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Search by Event</label>
              <input
                type="text"
                placeholder="Festival name..."
                value={searchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Filter by Interest</label>
              <select
                value={filterInterest}
                onChange={(e) => setFilterInterest(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
              >
                <option value="all">All Interests</option>
                {allInterests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Companions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredCompanions.map((companion) => (
            <motion.div
              key={companion.id}
              variants={itemVariants}
              className="bg-dark-card border border-neon-green/20 rounded-2xl overflow-hidden hover:border-neon-green/50 transition-all cursor-pointer"
              onClick={() => setSelectedCompanion(companion)}
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 136, 0.03)',
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-dark-bg to-dark-surface p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{companion.avatar}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{companion.name}</h3>
                      <p className="text-dark-text-secondary text-sm">{companion.age} • {companion.location}</p>
                    </div>
                  </div>
                  {companion.verified && <span className="text-neon-green text-lg">✓</span>}
                </div>
                <p className="text-dark-text-secondary text-sm line-clamp-2">{companion.bio}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Interests */}
                <div>
                  <p className="text-xs text-dark-text-secondary mb-2 uppercase tracking-wide">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {companion.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-neon-green/10 text-neon-green text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Events */}
                <div className="border-t border-neon-green/10 pt-4">
                  <p className="text-xs text-dark-text-secondary mb-2 uppercase tracking-wide">Upcoming Events</p>
                  <div className="space-y-2">
                    {companion.upcomingEvents.map((event, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span>{event.emoji}</span>
                        <span className="text-white">{event.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-dark-bg rounded-lg p-3 border border-neon-green/10">
                  <p className="text-xs text-dark-text-secondary mb-2">Group Spots Available</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 bg-dark-card rounded-full h-2 overflow-hidden mr-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(companion.spotsFilled / (companion.spotsFilled + companion.spotsAvailable)) * 100}%` }}
                        transition={{ duration: 0.6 }}
                        className="bg-neon-green h-full"
                      />
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {companion.spotsAvailable}/{companion.spotsFilled + companion.spotsAvailable}
                    </span>
                  </div>
                </div>

                {/* Connect Button */}
                <button className="w-full px-4 py-2 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all text-sm">
                  💬 Connect
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCompanions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-dark-card border border-neon-green/20 rounded-2xl"
          >
            <span className="text-7xl mb-4 block">🔍</span>
            <p className="text-dark-text-secondary text-lg">No travel companions found</p>
            <p className="text-dark-text-secondary text-sm mt-2">Try adjusting your filters</p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-neon-green mb-2">{companions.length}</p>
            <p className="text-dark-text-secondary">Active Travelers</p>
          </div>
          <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-neon-green mb-2">
              {companions.reduce((sum, c) => sum + c.upcomingEvents.length, 0)}
            </p>
            <p className="text-dark-text-secondary">Upcoming Events</p>
          </div>
          <div className="bg-dark-card border border-neon-green/20 rounded-lg p-6 text-center">
            <p className="text-4xl font-bold text-neon-green mb-2">100%</p>
            <p className="text-dark-text-secondary">Verified Profiles</p>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedCompanion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedCompanion(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-card border border-neon-green/20 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <span className="text-8xl block mb-4">{selectedCompanion.avatar}</span>
              <h2 className="text-3xl font-bold text-white mb-2">{selectedCompanion.name}</h2>
              <p className="text-dark-text-secondary">
                {selectedCompanion.age} • {selectedCompanion.location}
              </p>
            </div>

            <p className="text-white text-center mb-6">{selectedCompanion.bio}</p>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-neon-green font-semibold text-sm mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCompanion.interests.map((i) => (
                    <span key={i} className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded">
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-neon-green/20 pt-4">
                <p className="text-neon-green font-semibold text-sm mb-2">Going To</p>
                {selectedCompanion.upcomingEvents.map((e, i) => (
                  <p key={i} className="text-white text-sm">
                    {e.emoji} {e.name} ({e.date})
                  </p>
                ))}
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all mb-3">
              💬 Send Message
            </button>
            <button
              onClick={() => setSelectedCompanion(null)}
              className="w-full px-6 py-2 bg-dark-bg border border-neon-green/20 text-white font-semibold rounded-lg hover:border-neon-green transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
