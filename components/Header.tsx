'use client'

import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black/95 backdrop-blur-md border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-light tracking-widest text-white">
              URMAH
            </a>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm font-light text-gray-300 hover:text-white transition">
              Events
            </a>
            <a href="#" className="text-sm font-light text-gray-300 hover:text-white transition">
              Experiences
            </a>
            <a href="#" className="text-sm font-light text-gray-300 hover:text-white transition">
              About
            </a>
            <a href="#" className="text-sm font-light text-gray-300 hover:text-white transition">
              Contact
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-light px-6 py-2 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition">
              Sign In
            </button>
            <button className="text-sm font-light px-6 py-2 bg-amber-400 text-black hover:bg-amber-500 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
