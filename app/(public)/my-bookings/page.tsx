'use client'

import { motion } from 'framer-motion'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Booking {
  id: string
  orderId: string
  eventName: string
  date: string
  location: string
  ticketCodes: string[]
  total: number
  status: 'upcoming' | 'past' | 'cancelled'
  items: Array<{
    title: string
    type: string
    quantity: number
    price: number
  }>
}

export default function MyBookingsPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Sign In Required</h1>
          <p className="text-dark-text-secondary mb-8">
            Please sign in to view your bookings
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

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      orderId: 'URMAH-1713100800000',
      eventName: 'Electric Sunset Festival 2026',
      date: 'Jun 15-18, 2026',
      location: 'Miami Beach, Florida',
      status: 'upcoming',
      total: 2450.0,
      ticketCodes: ['URMAH-URMAH-1713100800000-0001', 'URMAH-URMAH-1713100800000-0002'],
      items: [
        { title: 'Event Pass', type: 'event', quantity: 2, price: 899 },
        { title: 'Flight (MIA)', type: 'flight', quantity: 2, price: 350 },
        { title: 'Beachfront Resort', type: 'accommodation', quantity: 3, price: 250 },
      ],
    },
    {
      id: '2',
      orderId: 'URMAH-1712000000000',
      eventName: 'Mountain Music Retreat',
      date: 'Apr 10-12, 2026',
      location: 'Aspen, Colorado',
      status: 'upcoming',
      total: 1850.0,
      ticketCodes: ['URMAH-URMAH-1712000000000-0001'],
      items: [
        { title: 'Event Pass', type: 'event', quantity: 1, price: 699 },
        { title: 'Flight (DEN)', type: 'flight', quantity: 1, price: 280 },
        { title: 'Mountain Lodge', type: 'accommodation', quantity: 2, price: 435 },
      ],
    },
  ]

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming')
  const pastBookings = bookings.filter((b) => b.status === 'past')

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-dark-card border border-neon-green/20 rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
      }}
    >
      <div
        className="h-2 bg-gradient-to-r from-neon-green to-neon-green-light"
      />
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{booking.eventName}</h3>
            <p className="text-dark-text-secondary">
              📍 {booking.location} • 📅 {booking.date}
            </p>
          </div>
          <span className="px-3 py-1 bg-neon-green/20 text-neon-green text-xs font-bold rounded-full">
            {booking.status.toUpperCase()}
          </span>
        </div>

        {/* Order ID */}
        <div className="mb-6 pb-6 border-b border-neon-green/20">
          <p className="text-dark-text-secondary text-sm mb-1">Order ID</p>
          <p className="text-neon-green font-mono font-bold">{booking.orderId}</p>
        </div>

        {/* Booking Items */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
            Booking Details
          </h4>
          <div className="space-y-2">
            {booking.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-dark-text-secondary">
                  {item.title} ({item.type}) × {item.quantity}
                </span>
                <span className="text-white font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Codes */}
        {selectedBooking === booking.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-dark-bg rounded-lg p-4 mb-6"
          >
            <h4 className="text-sm font-bold text-white mb-3">🎟️ Ticket Codes</h4>
            <div className="space-y-2">
              {booking.ticketCodes.map((code) => (
                <div
                  key={code}
                  className="bg-dark-card p-3 rounded border border-neon-green/30 font-mono text-xs flex justify-between items-center"
                >
                  <span className="text-neon-green">{code}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="text-dark-text-secondary hover:text-neon-green text-xs font-semibold transition-colors"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Total & Actions */}
        <div className="border-t border-neon-green/20 pt-4 flex justify-between items-center">
          <div>
            <p className="text-dark-text-secondary text-sm mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-neon-green">${booking.total.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setSelectedBooking(selectedBooking === booking.id ? null : booking.id)
              }
              className="px-4 py-2 bg-neon-green/20 text-neon-green hover:bg-neon-green/30 rounded-lg font-semibold transition-colors text-sm"
            >
              {selectedBooking === booking.id ? '▲ Hide' : '▼ View'} Codes
            </button>
            <button className="px-4 py-2 bg-neon-green text-dark-bg hover:bg-neon-green-dark rounded-lg font-semibold transition-colors text-sm">
              ⬇️ Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold font-playfair text-white mb-2">
            My Bookings
          </h1>
          <p className="text-dark-text-secondary text-lg">
            Manage your all-inclusive experiences
          </p>
        </motion.div>

        {/* Upcoming Bookings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            📅 Upcoming ({upcomingBookings.length})
          </h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-6">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-dark-card border border-neon-green/20 rounded-2xl"
            >
              <p className="text-dark-text-secondary text-lg mb-4">
                No upcoming bookings yet
              </p>
              <button
                onClick={() => router.push('/all-inclusive')}
                className="px-6 py-2 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark"
              >
                Explore Events
              </button>
            </motion.div>
          )}
        </div>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              ✓ Past Events ({pastBookings.length})
            </h2>
            <div className="space-y-6">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
