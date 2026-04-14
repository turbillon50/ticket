'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import EventsGrid from '@/components/EventsGrid'
import EventsWithYouTube from '@/components/EventsWithYouTube'
import FlightsWithSkyscanner from '@/components/FlightsWithSkyscanner'
import AccommodationsWithMap from '@/components/AccommodationsWithMap'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'events' | 'flights' | 'accommodations'>('events')

  const tabs = [
    { id: 'events', label: '🎉 Events & Videos', icon: '🎪' },
    { id: 'flights', label: '✈️ Find Flights', icon: '✈️' },
    { id: 'accommodations', label: '🏨 Stay in Style', icon: '🏨' },
  ]

  return (
    <div className="bg-dark-bg text-white">
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

      {/* Premium Experience Hub - Tab Navigation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface/50 border-y border-neon-cyan/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6 text-center">
              Plan Your Premium Experience
            </h2>
            <p className="text-dark-text-secondary text-lg text-center max-w-2xl mx-auto mb-8">
              Everything you need for an unforgettable journey - curated events, seamless flights, and luxury accommodations
            </p>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all text-lg ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg border-2 border-neon-cyan shadow-lg'
                      : 'border-2 border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan/60 hover:bg-neon-cyan/5'
                  }`}
                  style={{
                    boxShadow: activeTab === tab.id
                      ? '0 0 30px rgba(0, 245, 210, 0.5)'
                      : 'none'
                  }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-bg/50 backdrop-blur-md rounded-2xl border border-neon-cyan/20 p-8"
              style={{
                boxShadow: '0 0 40px rgba(0, 245, 210, 0.1)'
              }}
            >
              {activeTab === 'events' && <EventsWithYouTube />}
              {activeTab === 'flights' && <FlightsWithSkyscanner />}
              {activeTab === 'accommodations' && <AccommodationsWithMap />}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border-y border-neon-cyan/20">
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
            Book your complete premium experience - events, flights, and accommodations in one seamless platform
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 245, 210, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-semibold rounded-lg shadow-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}
