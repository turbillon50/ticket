import { motion } from 'framer-motion'

interface AccommodationCardProps {
  accommodation: {
    id: string
    name: string
    location: string
    price: number
    rating: number
  }
  onAdd: () => void
}

export default function AccommodationCard({ accommodation, onAdd }: AccommodationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-dark-card border border-neon-green/20 rounded-2xl overflow-hidden group"
      style={{
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
      }}
    >
      {/* Image Area */}
      <div className="relative bg-dark-bg h-40 flex items-center justify-center overflow-hidden">
        <span className="text-8xl group-hover:scale-125 transition-transform">
          🏨
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{accommodation.name}</h3>
        <p className="text-dark-text-secondary text-sm mb-4">📍 {accommodation.location}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-neon-green font-bold">{accommodation.rating}★</span>
          <span className="text-dark-text-secondary text-sm">(45 reviews)</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-neon-green">${accommodation.price}</p>
            <p className="text-dark-text-secondary text-xs">/night</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="px-4 py-2 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
          >
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
