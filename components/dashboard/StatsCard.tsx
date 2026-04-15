import { motion } from 'framer-motion'

interface StatsCardProps {
  label: string
  value: string
  icon: string
  trend: string
}

export default function StatsCard({ label, value, icon, trend }: StatsCardProps) {
  const isPositive = trend.startsWith('+')

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
      style={{
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-dark-text-secondary text-sm">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${isPositive ? 'text-neon-green' : 'text-red-400'}`}>
          {trend}
        </span>
        <span className="text-dark-text-secondary text-sm">vs last month</span>
      </div>
    </motion.div>
  )
}
