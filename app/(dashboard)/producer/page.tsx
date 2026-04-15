'use client'

import { motion } from 'framer-motion'
import StatsCard from '@/components/dashboard/StatsCard'
import { useUser } from '@clerk/nextjs'

const PRODUCER_STATS = [
  { label: 'My Events', value: '24', icon: '🎪', trend: '+3' },
  { label: 'Total Bookings', value: '1,543', icon: '🎫', trend: '+124' },
  { label: 'Total Earnings', value: '$48.2K', icon: '💰', trend: '+18%' },
  { label: 'Avg Rating', value: '4.8★', icon: '⭐', trend: '+0.3' },
]

export default function ProducerDashboard() {
  const { user } = useUser()

  return (
    <div className="flex-1 p-8 bg-dark-bg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold font-playfair text-white mb-2">
          Producer Dashboard
        </h1>
        <p className="text-dark-text-secondary">
          Manage your events and earnings
        </p>
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
          <h2 className="text-2xl font-bold text-white mb-4">My Events</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-neon-green/10 hover:border-neon-green/30 transition-all cursor-pointer"
              >
                <div>
                  <p className="text-white font-semibold">Event #{i} - Music Festival</p>
                  <p className="text-dark-text-secondary text-sm">520 bookings • $15,200 earned</p>
                </div>
                <span className="px-3 py-1 bg-neon-green/10 text-neon-green rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Create Event CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-green/30 rounded-2xl p-6 flex flex-col items-center justify-center"
        >
          <span className="text-5xl mb-4">🎪</span>
          <h3 className="text-xl font-bold text-white mb-2 text-center">
            Create New Event
          </h3>
          <p className="text-dark-text-secondary text-sm text-center mb-6">
            Add your next event to URMAH
          </p>
          <button className="w-full px-4 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all">
            Create Event
          </button>
        </motion.div>
      </div>
    </div>
  )
}
