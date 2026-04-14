'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-dark-bg/80 dark:bg-dark-bg/80 light:bg-light-bg/80 backdrop-blur-xl border-b border-dark-border light:border-light-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            <Link
              href="/"
              className="text-3xl font-bold font-playfair bg-gradient-to-r from-accent-amber via-yellow-400 to-accent-amber bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              URMAH
            </Link>
          </motion.div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/flights">Flights</NavLink>
            <NavLink href="/stays">Stays</NavLink>
            <NavLink href="/packages">Packages</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex px-6 py-2 border-2 border-accent-amber text-accent-amber font-semibold rounded-lg hover:bg-accent-amber hover:text-dark-bg transition-all"
            >
              Sign In
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-accent-amber to-yellow-400 text-dark-bg font-semibold rounded-lg hover:shadow-glow-lg transition-all"
            >
              Book Now
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-dark-border pt-4 pb-4"
          >
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/flights">Flights</NavLink>
            <NavLink href="/stays">Stays</NavLink>
            <NavLink href="/packages">Packages</NavLink>
          </motion.div>
        )}
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className="text-dark-text-secondary hover:text-accent-amber transition-colors font-medium"
      >
        {children}
      </Link>
    </motion.div>
  )
}
