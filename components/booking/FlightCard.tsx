import { motion } from 'framer-motion'

interface FlightCardProps {
  flight: {
    id: string
    airline: string
    from: string
    to: string
    departure: string
    arrival: string
    price: number
  }
  onAdd: () => void
}

export default function FlightCard({ flight, onAdd }: FlightCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
      style={{
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
      }}
    >
      <h3 className="text-xl font-bold text-white mb-4">✈️ {flight.airline}</h3>

      {/* Flight Info */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">{flight.departure}</p>
            <p className="text-dark-text-secondary text-sm">{flight.from}</p>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="h-0.5 flex-1 bg-neon-green"></div>
            <span className="text-neon-green">✓</span>
            <div className="h-0.5 flex-1 bg-neon-green"></div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{flight.arrival}</p>
            <p className="text-dark-text-secondary text-sm">{flight.to}</p>
          </div>
        </div>
      </div>

      {/* Price & Button */}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-neon-green">${flight.price}</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="px-4 py-2 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all"
        >
          Add
        </motion.button>
      </div>
    </motion.div>
  )
}
