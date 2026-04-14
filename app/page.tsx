'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import EventsGrid from '@/components/EventsGrid'

export default function Home() {
  return (
    <div className="bg-dark-bg">
      {/* Hero */}
      <HeroSection />

      {/* Featured Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            Featured Events
          </h2>
          <p className="text-dark-text-secondary text-lg mb-12 max-w-2xl">
            Discover the world's most exclusive festivals, concerts, and experiences
          </p>

          <EventsGrid />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-amber/10 to-amber-500/10 border-y border-dark-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-3xl md:text-5xl font-bold font-playfair mb-6">
            Ready for an unforgettable experience?
          </h3>
          <p className="text-dark-text-secondary text-lg mb-8">
            Book your complete experience - events, flights, and accommodations in one seamless platform
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-accent-amber to-yellow-400 text-dark-bg font-semibold rounded-lg shadow-glow"
          >
            Start Exploring
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
