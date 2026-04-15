'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/dashboard/StatsCard'
import { useUser } from '@clerk/nextjs'

const PRODUCER_STATS = [
  { label: 'My Events', value: '4', icon: '🎪', trend: '+1' },
  { label: 'Total Bookings', value: '896', icon: '🎫', trend: '+45' },
  { label: 'Total Earnings', value: '$853K', icon: '💰', trend: '+12%' },
  { label: 'Avg Rating', value: '4.8★', icon: '⭐', trend: '+0.2' },
]

export default function ProducerDashboard() {
  const { user } = useUser()
  const router = useRouter()

  const recentEvents = [
    { id: '1', name: 'Electric Summer Festival', bookings: 342, earned: '$307.5K', status: 'Active' },
    { id: '2', name: 'Mountain Music Retreat', bookings: 156, earned: '$109K', status: 'Active' },
    { id: '3', name: 'Winter Wonderland Fest', bookings: 398, earned: '$437.2K', status: 'Ended' },
  ]

  return (
    <div className="flex-1 p-8 bg-dark-bg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-start"
      >
        <div>
          <h1 className="text-4xl font-bold font-playfair text-white mb-2">
            Producer Dashboard
          </h1>
          <p className="text-dark-text-secondary">
            Welcome back! Manage your events and track earnings
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard/producer/events/new')}
          className="px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
        >
          ✨ Create Event
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {PRODUCER_STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* My Events & Create New */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-dark-card border border-neon-green/20 rounded-2xl p-6"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Recent Events</h2>
            <button
              onClick={() => router.push('/dashboard/producer/events')}
              className="text-neon-green hover:text-neon-green-light text-sm font-semibold transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ x: 8 }}
                onClick={() => router.push('/dashboard/producer/events')}
                className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-neon-green/10 hover:border-neon-green/30 transition-all cursor-pointer"
              >
                <div>
                  <p className="text-white font-semibold">{event.name}</p>
                  <p className="text-dark-text-secondary text-sm">
                    {event.bookings} bookings • {event.earned} earned
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'Active'
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'bg-dark-text-secondary/10 text-dark-text-secondary'
                  }`}
                >
                  {event.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-neon-green/20 to-neon-green/10 border border-neon-green/30 rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <span className="text-5xl mb-4">🎪</span>
          <h3 className="text-xl font-bold text-white mb-2 text-center">
            Create New Event
          </h3>
          <p className="text-dark-text-secondary text-sm text-center mb-6">
            Add your next all-inclusive experience to URMAH
          </p>
          <button
            onClick={() => router.push('/dashboard/producer/events/new')}
            className="w-full px-4 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
          >
            Create Event
          </button>
          <div className="mt-6 pt-6 border-t border-neon-green/20 w-full">
            <button
              onClick={() => router.push('/dashboard/producer/events')}
              className="w-full text-center text-neon-green hover:text-neon-green-light font-semibold text-sm transition-colors"
            >
              Manage All Events →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
