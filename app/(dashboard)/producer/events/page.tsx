'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProducerEvent {
  id: string
  name: string
  emoji: string
  location: string
  date: string
  endDate: string
  price: number
  capacity: number
  bookings: number
  revenue: number
  status: 'active' | 'ended' | 'draft'
}

export default function ProducerEventsPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'ended' | 'draft'>('all')

  // Mock events data
  const allEvents: ProducerEvent[] = [
    {
      id: '1',
      name: 'Electric Summer Festival',
      emoji: '🎵',
      location: 'Miami Beach, Florida',
      date: 'Jun 15, 2026',
      endDate: 'Jun 18, 2026',
      price: 899,
      capacity: 500,
      bookings: 342,
      revenue: 307458,
      status: 'active',
    },
    {
      id: '2',
      name: 'Mountain Music Retreat',
      emoji: '🏔️',
      location: 'Aspen, Colorado',
      date: 'Apr 10, 2026',
      endDate: 'Apr 12, 2026',
      price: 699,
      capacity: 200,
      bookings: 156,
      revenue: 109044,
      status: 'active',
    },
    {
      id: '3',
      name: 'Beach Party 2026',
      emoji: '🏖️',
      location: 'Cancun, Mexico',
      date: 'May 1, 2026',
      endDate: 'May 4, 2026',
      price: 799,
      capacity: 300,
      bookings: 0,
      revenue: 0,
      status: 'draft',
    },
    {
      id: '4',
      name: 'Winter Wonderland Fest',
      emoji: '⛄',
      location: 'Lake Tahoe, California',
      date: 'Dec 20, 2025',
      endDate: 'Dec 23, 2025',
      price: 1099,
      capacity: 400,
      bookings: 398,
      revenue: 437202,
      status: 'ended',
    },
  ]

  const filteredEvents =
    filterStatus === 'all'
      ? allEvents
      : allEvents.filter((event) => event.status === filterStatus)

  const activeEvents = allEvents.filter((e) => e.status === 'active')
  const draftEvents = allEvents.filter((e) => e.status === 'draft')
  const totalRevenue = allEvents.reduce((sum, e) => sum + e.revenue, 0)
  const totalBookings = allEvents.reduce((sum, e) => sum + e.bookings, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-neon-green/20 text-neon-green'
      case 'ended':
        return 'bg-dark-text-secondary/20 text-dark-text-secondary'
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div>
          <h1 className="text-4xl font-bold font-playfair text-white mb-2">
            My Events
          </h1>
          <p className="text-dark-text-secondary">
            Manage and monitor your event bundles
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

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Total Events</p>
          <p className="text-3xl font-bold text-white">{allEvents.length}</p>
          <p className="text-neon-green text-xs mt-2">{activeEvents.length} active</p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Total Bookings</p>
          <p className="text-3xl font-bold text-white">{totalBookings}</p>
          <p className="text-neon-green text-xs mt-2">Across all events</p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-neon-green">
            ${(totalRevenue / 1000).toFixed(0)}K
          </p>
          <p className="text-dark-text-secondary text-xs mt-2">Generated</p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Draft Events</p>
          <p className="text-3xl font-bold text-white">{draftEvents.length}</p>
          <p className="text-yellow-400 text-xs mt-2">Ready to publish</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-2"
      >
        {(['all', 'active', 'draft', 'ended'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === status
                ? 'bg-neon-green text-dark-bg'
                : 'bg-dark-card border border-neon-green/20 text-white hover:border-neon-green'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Events Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            variants={itemVariants}
            className="bg-dark-card border border-neon-green/20 rounded-2xl overflow-hidden hover:border-neon-green/50 transition-all"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 136, 0.03)',
            }}
          >
            {/* Header with Emoji */}
            <div className="bg-gradient-to-r from-dark-bg to-dark-surface p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <span className="text-6xl">{event.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{event.name}</h3>
                  <p className="text-dark-text-secondary text-sm">
                    📍 {event.location}
                  </p>
                  <p className="text-dark-text-secondary text-sm">
                    📅 {event.date} - {event.endDate}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.status)}`}>
                {event.status.toUpperCase()}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Pricing */}
              <div className="border-b border-neon-green/10 pb-6">
                <p className="text-dark-text-secondary text-sm mb-2">Bundle Price</p>
                <p className="text-3xl font-bold text-neon-green">${event.price}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-dark-text-secondary text-xs mb-1">Capacity</p>
                  <p className="text-xl font-bold text-white">{event.capacity}</p>
                  <div className="w-full bg-dark-bg rounded-full h-2 mt-2">
                    <div
                      className="bg-neon-green h-2 rounded-full transition-all"
                      style={{
                        width: `${(event.bookings / event.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-dark-text-secondary text-xs mb-1">Bookings</p>
                  <p className="text-xl font-bold text-white">{event.bookings}</p>
                  <p className="text-neon-green text-xs mt-2">
                    {event.capacity > 0
                      ? ((event.bookings / event.capacity) * 100).toFixed(0)
                      : 0}
                    % full
                  </p>
                </div>
                <div>
                  <p className="text-dark-text-secondary text-xs mb-1">Revenue</p>
                  <p className="text-xl font-bold text-neon-green">
                    ${(event.revenue / 1000).toFixed(1)}K
                  </p>
                  <p className="text-dark-text-secondary text-xs mt-2">
                    ${(event.revenue / Math.max(event.bookings, 1)).toFixed(0)} avg
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-neon-green/10 pt-6 flex gap-2">
                <button
                  onClick={() => router.push(`/dashboard/producer/events/${event.id}`)}
                  className="flex-1 px-4 py-2 bg-neon-green/20 text-neon-green hover:bg-neon-green/30 rounded-lg font-semibold text-sm transition-colors"
                >
                  📊 Analytics
                </button>
                <button
                  onClick={() => router.push(`/dashboard/producer/events/${event.id}/edit`)}
                  className="flex-1 px-4 py-2 bg-dark-bg border border-neon-green/20 text-white hover:border-neon-green rounded-lg font-semibold text-sm transition-colors"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-dark-card border border-neon-green/20 rounded-2xl"
        >
          <span className="text-7xl mb-4 block">📭</span>
          <p className="text-dark-text-secondary text-lg mb-6">
            No {filterStatus === 'all' ? '' : filterStatus} events yet
          </p>
          <button
            onClick={() => router.push('/dashboard/producer/events/new')}
            className="px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark"
          >
            Create Your First Event
          </button>
        </motion.div>
      )}
    </div>
  )
}
