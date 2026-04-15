'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Review, getAverageRating, getRatingDistribution } from '@/lib/reviews'

interface ReviewSectionProps {
  eventId: string
  reviews: Review[]
  onSubmitReview?: (data: { rating: number; title: string; comment: string }) => void
}

export default function ReviewSection({ eventId, reviews, onSubmitReview }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'rating'>('helpful')
  const [filterRating, setFilterRating] = useState<number | 'all'>(0)

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  })

  const averageRating = getAverageRating(reviews)
  const ratingDistribution = getRatingDistribution(reviews)

  let filteredReviews = reviews
  if (filterRating !== 'all' && filterRating !== 0) {
    filteredReviews = reviews.filter((r) => r.rating === filterRating)
  }

  filteredReviews = filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful
      case 'rating':
        return b.rating - a.rating
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.comment) {
      onSubmitReview?.(formData)
      setFormData({ rating: 5, title: '', comment: '' })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-dark-card border border-neon-green/20 rounded-2xl p-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left: Average Rating */}
          <div className="flex-shrink-0">
            <div className="text-center mb-4">
              <div className="text-6xl font-bold text-neon-green mb-2">{averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-2xl ${i < Math.round(averageRating) ? '⭐' : '☆'}`} />
                ))}
              </div>
              <p className="text-dark-text-secondary text-sm">Based on {reviews.length} verified reviews</p>
            </div>
          </div>

          {/* Right: Rating Distribution */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-white font-semibold w-12">{rating}★</span>
                <div className="flex-1 bg-dark-bg rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(ratingDistribution[rating] / reviews.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (6 - rating), duration: 0.6 }}
                    className="bg-neon-green h-full rounded-full"
                  />
                </div>
                <span className="text-xs text-dark-text-secondary w-12 text-right">
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Review Form */}
      {!showForm && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => setShowForm(true)}
          className="w-full px-6 py-4 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
        >
          ✍️ Write a Review
        </motion.button>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card border border-neon-green/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Share Your Experience</h3>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-white font-semibold mb-4">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                    className={`text-4xl transition-all ${
                      star <= formData.rating ? '⭐' : '☆'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-2">Review Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Sum up your experience..."
                maxLength={100}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors"
              />
              <p className="text-dark-text-secondary text-xs mt-1">{formData.title.length}/100</p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-white font-semibold mb-2">Your Review</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Share details about your experience..."
                rows={5}
                maxLength={500}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors resize-none"
              />
              <p className="text-dark-text-secondary text-xs mt-1">{formData.comment.length}/500</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
              >
                Post Review
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-6 py-3 bg-dark-bg border border-neon-green/20 text-white font-bold rounded-lg hover:border-neon-green transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Filter & Sort */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex gap-2 flex-wrap">
          {[0, 5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilterRating(rating === 0 ? 'all' : rating)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                filterRating === (rating === 0 ? 'all' : rating)
                  ? 'bg-neon-green text-dark-bg'
                  : 'bg-dark-card border border-neon-green/20 text-white hover:border-neon-green'
              }`}
            >
              {rating === 0 ? 'All' : `${rating}★`}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 bg-dark-card border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors text-sm md:ml-auto"
        >
          <option value="helpful">Most Helpful</option>
          <option value="rating">Highest Rating</option>
          <option value="recent">Most Recent</option>
        </select>
      </motion.div>

      {/* Reviews List */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-dark-card border border-neon-green/10 rounded-lg p-6 hover:border-neon-green/30 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white font-bold">{review.userName}</span>
                  {review.verified && <span className="text-neon-green text-xs font-bold">✓ Verified</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{Array.from({ length: review.rating }).map((_, i) => '⭐').join('')}</span>
                  <span className="text-dark-text-secondary text-sm">{review.createdAt}</span>
                </div>
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">{review.title}</h4>
            <p className="text-dark-text-secondary mb-4">{review.comment}</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  // In production, would track helpful vote
                }}
                className="text-xs text-dark-text-secondary hover:text-neon-green transition-colors flex items-center gap-1"
              >
                👍 Helpful ({review.helpful})
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12 bg-dark-card border border-neon-green/10 rounded-lg"
        >
          <p className="text-dark-text-secondary">No reviews yet for this rating</p>
        </motion.div>
      )}
    </div>
  )
}
