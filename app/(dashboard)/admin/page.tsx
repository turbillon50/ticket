'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import StatsCard from '@/components/dashboard/StatsCard'
import { useAuth, useUser } from '@clerk/nextjs'

const STATS = [
  { label: 'Total Users', value: '6', icon: '👥', trend: '+12%' },
  { label: 'Total Events', value: '4', icon: '🎪', trend: '+8%' },
  { label: 'Total Revenue', value: '$853K', icon: '💰', trend: '+24%' },
  { label: 'Active Bookings', value: '896', icon: '🎫', trend: '+15%' },
]

const recentEvents = [
  { id: '1', name: 'Electric Summer Festival', producer: 'Sarah Anderson', status: 'Active', revenue: '$307.5K' },
  { id: '2', name: 'Mountain Music Retreat', producer: 'Mike Johnson', status: 'Active', revenue: '$109K' },
  { id: '3', name: 'Beach Party 2026', producer: 'Sarah Anderson', status: 'Draft', revenue: '$0' },
]

export default function AdminDashboard() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <div className="flex-1 p-8 bg-dark-bg">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold font-playfair text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-dark-text-secondary">
          Welcome back, {user?.firstName}! Full platform control at your fingertips 👋
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Recent Events</h2>
            <button
              onClick={() => router.push('/dashboard/admin/events')}
              className="text-neon-green hover:text-neon-green-light text-sm font-semibold transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-neon-green/10 hover:border-neon-green/30 transition-all">
                <div>
                  <p className="text-white font-semibold">{event.name}</p>
                  <p className="text-dark-text-secondary text-sm">by {event.producer}</p>
                </div>
                <div className="text-right">
                  <p className="text-neon-green font-semibold">{event.revenue}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    event.status === 'Active'
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
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
          <h2 className="text-2xl font-bold text-white mb-4">Admin Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/dashboard/admin/users')}
              className="w-full px-4 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all text-sm"
            >
              👥 Manage Users
            </button>
            <button
              onClick={() => router.push('/dashboard/admin/events')}
              className="w-full px-4 py-3 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all text-sm"
            >
              🎪 Review Events
            </button>
            <button
              onClick={() => router.push('/dashboard/admin/analytics')}
              className="w-full px-4 py-3 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all text-sm"
            >
              📊 View Analytics
            </button>
            <button
              onClick={() => router.push('/dashboard/admin/payments')}
              className="w-full px-4 py-3 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all text-sm"
            >
              💳 Payments & Payouts
            </button>
            <button
              onClick={() => router.push('/dashboard/admin/settings')}
              className="w-full px-4 py-3 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all text-sm"
            >
              ⚙️ Platform Settings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
