'use client'

import { motion } from 'framer-motion'
import StatsCard from '@/components/dashboard/StatsCard'
import { useAuth, useUser } from '@clerk/nextjs'

const STATS = [
  { label: 'Total Users', value: '12,543', icon: '👥', trend: '+12%' },
  { label: 'Total Events', value: '342', icon: '🎪', trend: '+8%' },
  { label: 'Total Revenue', value: '$2.4M', icon: '💰', trend: '+24%' },
  { label: 'Active Bookings', value: '1,428', icon: '🎫', trend: '+15%' },
]

export default function AdminDashboard() {
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
          Dashboard
        </h1>
        <p className="text-dark-text-secondary">
          Welcome back, {user?.firstName}! 👋
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, idx) => (
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

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-dark-card border border-neon-green/20 rounded-2xl p-6"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recent Events</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-neon-green/10">
                <div>
                  <p className="text-white font-semibold">Event #{i}</p>
                  <p className="text-dark-text-secondary text-sm">Created 2 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-neon-green/10 text-neon-green rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all">
              Create Event
            </button>
            <button className="w-full px-4 py-3 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all">
              Manage Users
            </button>
            <button className="w-full px-4 py-3 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all">
              View Reports
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
