import { motion } from 'framer-motion'

interface EventCardProps {
  event: {
    id: string
    name: string
    location: string
    date: string
    price: number
    image: string
  }
  onAdd: () => void
}

export default function EventCard({ event, onAdd }: EventCardProps) {
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
          {event.image}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
        <div className="space-y-2 mb-4 text-sm">
          <p className="text-dark-text-secondary">📍 {event.location}</p>
          <p className="text-dark-text-secondary">📅 {event.date}</p>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-neon-green">${event.price}</p>
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
