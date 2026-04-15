'use client'

import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { useCart } from '@/lib/store'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import ReviewSection from '@/components/reviews/ReviewSection'
import SocialShare from '@/components/sharing/SocialShare'
import { getEventReviews, createReview } from '@/lib/reviews'
import { useEffect } from 'react'

interface EventDetail {
  id: string
  name: string
  emoji: string
  location: string
  startDate: string
  endDate: string
  description: string
  price: number
  capacity: number
  bookings: number
  includes: string[]
  flightPrice?: number
  accommodationPrice?: number
  accommodationNights?: number
}

// Mock event data
const MOCK_EVENTS: { [key: string]: EventDetail } = {
  'electric-summer': {
    id: 'evt_electric',
    name: 'Electric Summer Festival 2026',
    emoji: '🎵',
    location: 'Miami Beach, Florida',
    startDate: 'Jun 15, 2026',
    endDate: 'Jun 18, 2026',
    description:
      'Experience the ultimate all-inclusive festival experience with world-class artists, luxury accommodation, and curated experiences. Electric Summer Festival brings together music lovers from around the world for an unforgettable weekend.',
    price: 899,
    capacity: 500,
    bookings: 342,
    includes: [
      '3-day festival access',
      '5-star accommodation',
      'Round-trip flights',
      'Daily meals included',
      'VIP lounge access',
      'Meet & greet opportunities',
    ],
    flightPrice: 350,
    accommodationPrice: 250,
    accommodationNights: 3,
  },
  'mountain-retreat': {
    id: 'evt_mountain',
    name: 'Mountain Music Retreat',
    emoji: '🏔️',
    location: 'Aspen, Colorado',
    startDate: 'Apr 10, 2026',
    endDate: 'Apr 12, 2026',
    description:
      'A serene music retreat in the heart of the Colorado mountains. Perfect for those seeking an intimate connection with nature and exceptional musical performances in a breathtaking setting.',
    price: 699,
    capacity: 200,
    bookings: 156,
    includes: [
      '2-night mountain lodge stay',
      'All meals',
      'Hiking tours',
      'Concert tickets',
      'Wellness workshops',
    ],
    flightPrice: 280,
    accommodationPrice: 435,
    accommodationNights: 2,
  },
}

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { addItem } = useCart()
  const [reviews, setReviews] = useState<any[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const eventId = params.id as string
  const event = MOCK_EVENTS[eventId]

  useEffect(() => {
    const loadReviews = async () => {
      if (event) {
        const eventReviews = await getEventReviews(event.id)
        setReviews(eventReviews)
      }
    }
    loadReviews()
  }, [event])

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
          <button
            onClick={() => router.push('/all-inclusive')}
            className="px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark"
          >
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    setIsAdding(true)
    setTimeout(() => {
      addItem({
        id: event.id,
        type: 'event',
        title: event.name,
        price: event.price + (event.flightPrice || 0) + (event.accommodationPrice || 0) * (event.accommodationNights || 1),
        quantity: 1,
        details: {
          location: event.location,
          dates: `${event.startDate} - ${event.endDate}`,
        },
      })
      setIsAdding(false)
      router.push('/checkout')
    }, 1000)
  }

  const handleSubmitReview = async (data: { rating: number; title: string; comment: string }) => {
    // In production, would get actual user ID from Clerk
    const newReview = await createReview('user_123', 'Current User', event.id, data)
    setReviews((prev) => [newReview, ...prev])
  }

  const bundlePrice =
    event.price + (event.flightPrice || 0) + (event.accommodationPrice || 0) * (event.accommodationNights || 1)

  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header & Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => router.back()}
            className="mb-6 text-neon-green hover:text-neon-green-light font-semibold transition-colors"
          >
            ← Back
          </button>

          <div className="flex items-start gap-8 mb-8">
            <div className="text-9xl">{event.emoji}</div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold font-playfair text-white mb-2">{event.name}</h1>
              <p className="text-2xl text-dark-text-secondary mb-4">
                📍 {event.location}
              </p>
              <p className="text-dark-text-secondary mb-4">
                📅 {event.startDate} - {event.endDate}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <span className="text-white font-semibold">{reviews.length} reviews</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Description & Includes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Description */}
            <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This Experience</h2>
              <p className="text-dark-text-secondary leading-relaxed mb-6">{event.description}</p>

              {/* Availability */}
              <div className="bg-neon-green/10 border border-neon-green/20 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">🎟️ Availability</p>
                <p className="text-dark-text-secondary">
                  {event.bookings} of {event.capacity} spots booked
                </p>
                <div className="w-full bg-dark-bg rounded-full h-3 mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(event.bookings / event.capacity) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="bg-neon-green h-full"
                  />
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.includes.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-neon-green font-bold text-lg">✓</span>
                    <span className="text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Guest Reviews</h2>
              <ReviewSection eventId={event.id} reviews={reviews} onSubmitReview={handleSubmitReview} />
            </div>
          </motion.div>

          {/* Right: Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-8 h-fit"
          >
            <div
              className="bg-dark-card border border-neon-green/20 rounded-2xl p-8"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Book Now</h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-neon-green/20">
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Event Ticket</span>
                  <span className="text-white font-semibold">${event.price}</span>
                </div>
                {event.flightPrice && (
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">Flight (round-trip)</span>
                    <span className="text-white font-semibold">${event.flightPrice}</span>
                  </div>
                )}
                {event.accommodationPrice && event.accommodationNights && (
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">
                      Accommodation ({event.accommodationNights} nights)
                    </span>
                    <span className="text-white font-semibold">
                      ${event.accommodationPrice * event.accommodationNights}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mb-6">
                <p className="text-dark-text-secondary text-sm mb-2">Total (Before Tax)</p>
                <p className="text-4xl font-bold text-neon-green">${bundlePrice}</p>
                <p className="text-dark-text-secondary text-xs mt-2">Plus 10% tax at checkout</p>
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full px-6 py-4 font-bold rounded-lg transition-all ${
                  isAdding
                    ? 'bg-dark-text-tertiary text-dark-bg cursor-not-allowed'
                    : 'bg-neon-green text-dark-bg hover:bg-neon-green-dark'
                }`}
              >
                {isAdding ? '⏳ Adding to Cart...' : '🛒 Add to Cart'}
              </button>

              <p className="text-center text-dark-text-secondary text-xs mt-4">
                🔒 Secure checkout with Stripe
              </p>

              {!isSignedIn && (
                <p className="text-center text-yellow-400 text-xs mt-4 p-2 bg-yellow-500/10 rounded">
                  Sign in to add items to cart
                </p>
              )}

              {/* Social Share */}
              <div className="mt-6">
                <SocialShare
                  eventName={event.name}
                  eventUrl={`https://urmah.events/event/${eventId}`}
                  eventEmoji={event.emoji}
                  eventLocation={event.location}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
