'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function PublicHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-neon-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold font-playfair text-white"
            >
              URMAH
            </motion.h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#events" className="text-dark-text-secondary hover:text-neon-green transition">
                Events
              </a>
              <a href="#how-it-works" className="text-dark-text-secondary hover:text-neon-green transition">
                How It Works
              </a>
              <a href="#policies" className="text-dark-text-secondary hover:text-neon-green transition">
                Policies
              </a>
              <a href="#faq" className="text-dark-text-secondary hover:text-neon-green transition">
                FAQ
              </a>
              <Link
                href="/sign-in"
                className="px-6 py-2 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4 space-y-2"
            >
              <a href="#events" className="block text-dark-text-secondary hover:text-neon-green py-2">
                Events
              </a>
              <a href="#how-it-works" className="block text-dark-text-secondary hover:text-neon-green py-2">
                How It Works
              </a>
              <a href="#policies" className="block text-dark-text-secondary hover:text-neon-green py-2">
                Policies
              </a>
              <Link href="/sign-in" className="block text-neon-green font-bold py-2">
                Sign In →
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 px-4 text-center"
      >
        <h2 className="text-6xl font-bold font-playfair text-white mb-6">
          Extraordinary Experiences Await
        </h2>
        <p className="text-2xl text-dark-text-secondary mb-8 max-w-2xl mx-auto">
          Book complete experiences - events, flights, and accommodations all in one platform
        </p>
        <Link
          href="/sign-up"
          className="inline-block px-8 py-4 bg-gradient-to-r from-neon-green to-neon-blue text-dark-bg font-bold rounded-lg hover:shadow-glow-lg transition"
        >
          Explore Events
        </Link>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-white mb-12 text-center">
          What We Offer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🎪', title: 'Discover Events', desc: 'Browse thousands of events worldwide' },
            { icon: '✈️', title: 'Book Flights', desc: 'Compare and book flights to your destination' },
            { icon: '🏨', title: 'Find Stays', desc: 'Premium accommodations curated for you' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-dark-card border border-neon-green/20 rounded-2xl p-8 text-center"
            >
              <span className="text-5xl block mb-4">{feature.icon}</span>
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-dark-text-secondary">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Policies Section */}
      <section id="policies" className="py-20 px-4 bg-dark-card/50 border-y border-neon-green/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-12 text-center">
            Our Policies & Trust
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Secure Payments', desc: '🔒 All payments encrypted with industry-standard security' },
              { title: 'Verified Events', desc: '✅ Every event is verified and curated' },
              { title: 'Guest Protection', desc: '🛡️ Full refund guarantee if event is cancelled' },
              { title: '24/7 Support', desc: '💬 Round-the-clock customer support' },
            ].map((policy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-6 bg-dark-bg rounded-xl border border-neon-green/20"
              >
                <h4 className="text-lg font-bold text-white mb-2">{policy.title}</h4>
                <p className="text-dark-text-secondary">{policy.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the World?
          </h3>
          <Link
            href="/sign-up"
            className="inline-block px-8 py-4 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition"
          >
            Create Free Account
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-card border-t border-neon-green/20 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">URMAH</h4>
            <p className="text-dark-text-secondary text-sm">Premium global events platform</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-dark-text-secondary text-sm">
              <li><a href="#" className="hover:text-neon-green">About</a></li>
              <li><a href="#" className="hover:text-neon-green">Blog</a></li>
              <li><a href="#" className="hover:text-neon-green">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-dark-text-secondary text-sm">
              <li><a href="#" className="hover:text-neon-green">Help Center</a></li>
              <li><a href="#" className="hover:text-neon-green">Contact</a></li>
              <li><a href="#" className="hover:text-neon-green">Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-dark-text-secondary text-sm">
              <li><a href="#" className="hover:text-neon-green">Privacy</a></li>
              <li><a href="#" className="hover:text-neon-green">Terms</a></li>
              <li><a href="#" className="hover:text-neon-green">Policies</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-dark-text-secondary text-sm">
          <p>© 2026 URMAH. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
