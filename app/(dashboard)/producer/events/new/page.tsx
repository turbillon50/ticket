'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EventFormData {
  name: string
  description: string
  date: string
  endDate: string
  location: string
  price: number
  capacity: number
  imageEmoji: string
  category: string
  includesFlight: boolean
  flightPrice: number
  includesAccommodation: boolean
  accommodationPrice: number
  accommodationNights: number
}

const EMOJI_OPTIONS = [
  '🎵', '🎸', '🎤', '🎬', '🎭', '🎪', '⚽', '🏀', '🎾', '⛳',
  '🚀', '🏔️', '🏖️', '🏝️', '🌴', '🎡', '🎢', '🎠', '🏰', '🗽'
]

const CATEGORIES = [
  'Music Festival',
  'Sports Event',
  'Cultural Festival',
  'Conference',
  'Workshop',
  'Party/Nightlife',
  'Adventure',
  'Wellness Retreat',
  'Food Festival',
  'Art Exhibition'
]

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    date: '',
    endDate: '',
    location: '',
    price: 0,
    capacity: 0,
    imageEmoji: '🎵',
    category: '',
    includesFlight: true,
    flightPrice: 0,
    includesAccommodation: true,
    accommodationPrice: 0,
    accommodationNights: 3,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseFloat(value) || 0
            : value,
    }))
  }

  const handleEmojiSelect = (emoji: string) => {
    setFormData((prev) => ({
      ...prev,
      imageEmoji: emoji,
    }))
  }

  const calculateBundlePrice = () => {
    let total = formData.price
    if (formData.includesFlight) total += formData.flightPrice
    if (formData.includesAccommodation) {
      total += formData.accommodationPrice * formData.accommodationNights
    }
    return total.toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In production, would create event via API
      const eventId = `evt_${Date.now()}`
      console.log('Event created:', { ...formData, id: eventId })

      alert('Event created successfully!')
      router.push('/dashboard/producer')
    } catch (error) {
      alert('Failed to create event. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold font-playfair text-white mb-2">
          Create New Event
        </h1>
        <p className="text-dark-text-secondary">
          Bundle flights and accommodations for an all-inclusive experience
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Main Event Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">📋 Event Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Electric Summer Festival 2026"
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event, what attendees can expect..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Miami Beach, Florida"
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Max attendees"
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">💰 Pricing</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Event Ticket Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-white font-semibold">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Flight Add-on */}
              <div className="border-t border-neon-green/10 pt-4">
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    name="includesFlight"
                    checked={formData.includesFlight}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-neon-green cursor-pointer"
                  />
                  <span className="text-white font-semibold">
                    Include Flight Add-on
                  </span>
                </label>

                {formData.includesFlight && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-8"
                  >
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-white font-semibold">$</span>
                      <input
                        type="number"
                        name="flightPrice"
                        value={formData.flightPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <p className="text-dark-text-secondary text-xs mt-2">
                      Price per person for round-trip flight
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Accommodation Add-on */}
              <div className="border-t border-neon-green/10 pt-4">
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    name="includesAccommodation"
                    checked={formData.includesAccommodation}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-neon-green cursor-pointer"
                  />
                  <span className="text-white font-semibold">
                    Include Accommodation Add-on
                  </span>
                </label>

                {formData.includesAccommodation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-8 space-y-3"
                  >
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-white font-semibold">$</span>
                      <input
                        type="number"
                        name="accommodationPrice"
                        value={formData.accommodationPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-text-secondary text-xs mb-1">
                        Nights of Stay
                      </label>
                      <input
                        type="number"
                        name="accommodationNights"
                        value={formData.accommodationNights}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <p className="text-dark-text-secondary text-xs">
                      Price per night for accommodation
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Emoji Selection */}
          <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">🎨 Event Icon</h2>
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`text-4xl p-3 rounded-lg transition-all ${
                    formData.imageEmoji === emoji
                      ? 'bg-neon-green/30 border border-neon-green'
                      : 'bg-dark-bg border border-neon-green/20 hover:border-neon-green'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Submit */}
        <div>
          {/* Bundle Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-8 space-y-6"
          >
            <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">📦 Bundle Preview</h3>

              {/* Icon Display */}
              <div className="text-center mb-6 pb-6 border-b border-neon-green/20">
                <span className="text-7xl">{formData.imageEmoji}</span>
              </div>

              {/* Bundle Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-neon-green/20">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-text-secondary">Event Ticket</span>
                  <span className="text-neon-green font-semibold">
                    ${formData.price.toFixed(2)}
                  </span>
                </div>

                {formData.includesFlight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text-secondary">Flight Add-on</span>
                    <span className="text-neon-green font-semibold">
                      ${formData.flightPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                {formData.includesAccommodation && (
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-text-secondary">
                      Accommodation ({formData.accommodationNights} nights)
                    </span>
                    <span className="text-neon-green font-semibold">
                      ${(formData.accommodationPrice * formData.accommodationNights).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mb-6">
                <p className="text-dark-text-secondary text-sm mb-2">Bundle Total</p>
                <p className="text-4xl font-bold text-neon-green">
                  ${calculateBundlePrice()}
                </p>
              </div>

              {/* Validation Checks */}
              <div className="space-y-2 mb-6 pb-6 border-b border-neon-green/20">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`${
                      formData.name
                        ? 'text-neon-green'
                        : 'text-dark-text-secondary'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-dark-text-secondary">Event name</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`${
                      formData.date && formData.endDate
                        ? 'text-neon-green'
                        : 'text-dark-text-secondary'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-dark-text-secondary">Dates selected</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`${
                      formData.location && formData.capacity
                        ? 'text-neon-green'
                        : 'text-dark-text-secondary'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-dark-text-secondary">Location & capacity</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 font-bold rounded-lg transition-all ${
                  isSubmitting
                    ? 'bg-dark-text-tertiary text-dark-bg cursor-not-allowed'
                    : 'bg-neon-green text-dark-bg hover:bg-neon-green-dark'
                }`}
              >
                {isSubmitting ? '⏳ Creating Event...' : '✨ Create Event'}
              </button>
            </div>

            {/* Help Text */}
            <div className="bg-dark-bg border border-neon-green/20 rounded-lg p-4 text-xs text-dark-text-secondary">
              <p className="mb-2 font-semibold text-white">💡 Pro Tip:</p>
              <p>
                Create comprehensive bundles with flights and accommodation for
                higher conversion rates and customer satisfaction.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.form>
    </div>
  )
}
