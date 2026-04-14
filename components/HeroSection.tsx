'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent-amber/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block mb-8"
          >
            <span className="px-6 py-2 border-2 border-accent-amber/50 text-accent-amber text-sm font-semibold tracking-widest rounded-full bg-accent-amber/5 backdrop-blur-sm">
              ✨ PREMIUM EVENTS COLLECTIVE
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair tracking-tighter mb-6 leading-tight"
          >
            Discover{' '}
            <span className="bg-gradient-to-r from-accent-amber via-yellow-400 to-accent-amber bg-clip-text text-transparent">
              Extraordinary
            </span>
            <br />
            Experiences
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl font-light text-dark-text-secondary mb-12 max-w-2xl mx-auto"
          >
            From world-class festivals to exclusive performances. Flights, accommodations, and premium concierge services included.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-accent-amber to-yellow-400 text-dark-bg font-semibold rounded-lg text-lg shadow-glow"
            >
              Explore Events
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#fbbf24' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-accent-amber text-accent-amber font-semibold rounded-lg text-lg hover:bg-accent-amber/10 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-4 md:gap-8 mt-32"
          >
            {[
              { label: 'Premium Events', value: '50+' },
              { label: 'Destinations', value: '150+' },
              { label: 'Happy Travelers', value: '10K+' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-6 rounded-lg bg-dark-surface/50 backdrop-blur-sm border border-dark-border"
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-dark-text-secondary font-light">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
