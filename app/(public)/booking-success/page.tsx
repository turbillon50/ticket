'use client'

import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function BookingSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items } = useCart()
  const [orderId, setOrderId] = useState<string>('')
  const [ticketCodes, setTicketCodes] = useState<string[]>([])

  useEffect(() => {
    const id = searchParams.get('orderId')
    if (id) {
      setOrderId(id)
      // Generate mock ticket codes
      const codes = Array.from({ length: Math.max(1, items.length) }, (_, i) =>
        `URMAH-${id}-${String(i + 1).padStart(4, '0')}`
      )
      setTicketCodes(codes)
    }
  }, [searchParams, items])

  const handleDownloadTickets = () => {
    // In production, would generate PDF with barcodes
    alert('Ticket download initiated. Check your email for confirmation.')
  }

  const handleViewBooking = () => {
    router.push('/my-bookings')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-9xl">🎉</span>
          </motion.div>
          <h1 className="text-5xl font-bold font-playfair text-white mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-dark-text-secondary text-lg">
            Your all-inclusive experience is just one step away
          </p>
        </motion.div>

        {/* Order Confirmation Card */}
        <motion.div
          variants={itemVariants}
          className="bg-dark-card border border-neon-green/20 rounded-2xl p-8 mb-8"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
          }}
        >
          <div className="mb-6 pb-6 border-b border-neon-green/20">
            <p className="text-dark-text-secondary text-sm mb-2">Order ID</p>
            <p className="text-3xl font-bold text-neon-green font-mono">
              {orderId || 'LOADING...'}
            </p>
          </div>

          {/* Booking Items */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">📋 Your Booking</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-neon-green/10">
                  <div>
                    <p className="text-white font-semibold">{item.title}</p>
                    <p className="text-dark-text-secondary text-sm">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-neon-green font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Codes */}
          <div className="bg-dark-bg rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold text-white mb-4">🎟️ Your Ticket Codes</h4>
            <div className="space-y-2">
              {ticketCodes.map((code, index) => (
                <motion.div
                  key={code}
                  variants={itemVariants}
                  className="bg-dark-card p-4 rounded-lg border border-neon-green/30 font-mono text-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-neon-green">{code}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(code)}
                      className="text-dark-text-secondary hover:text-neon-green text-xs font-semibold transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-dark-text-secondary text-xs mt-4 text-center">
              💾 Save these codes - you'll need them for check-in
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="bg-neon-green/10 border border-neon-green/20 rounded-lg p-4 mb-6">
            <p className="text-dark-text-secondary text-sm text-center">
              ✓ Confirmation email has been sent to your registered email address
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <button
            onClick={handleDownloadTickets}
            className="px-6 py-4 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all transform hover:scale-105"
          >
            ⬇️ Download Tickets
          </button>
          <button
            onClick={handleViewBooking}
            className="px-6 py-4 bg-dark-card border border-neon-green/30 text-white font-bold rounded-lg hover:border-neon-green transition-all transform hover:scale-105"
          >
            👁️ View My Bookings
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.03)',
          }}
        >
          <h3 className="text-xl font-bold text-white mb-4">📋 What's Next?</h3>
          <ol className="space-y-3 text-dark-text-secondary">
            <li className="flex gap-3">
              <span className="text-neon-green font-bold flex-shrink-0">1.</span>
              <span>Check your email for booking confirmation and ticket details</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold flex-shrink-0">2.</span>
              <span>Download and save your tickets (you can access them anytime)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold flex-shrink-0">3.</span>
              <span>Get ready for an unforgettable all-inclusive experience!</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-green font-bold flex-shrink-0">4.</span>
              <span>Questions? Contact our support team at support@urmah.events</span>
            </li>
          </ol>
        </motion.div>

        {/* Continue Shopping */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-8"
        >
          <p className="text-dark-text-secondary mb-4">
            Ready for another adventure?
          </p>
          <button
            onClick={() => router.push('/all-inclusive')}
            className="text-neon-green hover:text-neon-green-light font-bold transition-colors"
          >
            Explore More Events →
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
