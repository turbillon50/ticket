'use client'

import { motion } from 'framer-motion'
import { useCart } from '@/lib/store'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, clearCart, getTotal } = useCart()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')

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
            Please sign in to complete your booking
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-dark-text-secondary mb-8">
            Add some items to get started
          </p>
          <button
            onClick={() => router.push('/all-inclusive')}
            className="px-8 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!email || !fullName) {
      alert('Please fill in all fields')
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order
      const orderId = `URMAH-${Date.now()}`
      const total = getTotal()

      // Send email (in production, would call API route)
      console.log('Sending confirmation email to:', email)

      // Clear cart and redirect
      clearCart()
      router.push(`/booking-success?orderId=${orderId}`)
    } catch (error) {
      alert('Booking failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const total = getTotal()

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold font-playfair text-white mb-2">
            Checkout
          </h1>
          <p className="text-dark-text-secondary text-lg">
            Complete your all-inclusive booking
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-dark-card border border-neon-green/20 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-dark-text-secondary text-sm">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </p>
                  </div>
                  <span className="text-neon-green font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
                  <span>Qty: {item.quantity}</span>
                  <span>•</span>
                  <span>${item.price} each</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Guest Info</h2>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none"
              />
            </div>

            {/* Price Summary */}
            <div className="bg-dark-bg rounded-lg p-4 mb-6 space-y-3 border border-neon-green/10">
              <div className="flex justify-between text-dark-text-secondary">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-dark-text-secondary">
                <span>Taxes:</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-neon-green/10 pt-3 flex justify-between">
                <span className="text-white font-bold">Total:</span>
                <span className="text-neon-green font-bold text-2xl">
                  ${(total * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full px-6 py-4 font-bold rounded-lg transition-all ${
                isProcessing
                  ? 'bg-dark-text-tertiary text-dark-bg cursor-not-allowed'
                  : 'bg-neon-green text-dark-bg hover:bg-neon-green-dark'
              }`}
            >
              {isProcessing ? '🔄 Processing...' : '✨ Complete Booking'}
            </button>

            <p className="text-center text-dark-text-secondary text-xs mt-4">
              🔒 Secure payment powered by Stripe
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
