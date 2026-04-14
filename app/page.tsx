'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FlightSearch from '@/components/FlightSearch'
import StaysSearch from '@/components/StaysSearch'
import EventsGrid from '@/components/EventsGrid'
import PackageBuilder from '@/components/PackageBuilder'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'flights' | 'stays' | 'events' | 'packages'>('events')

  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />

      {/* Tab Navigation */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-2 font-light text-sm border-b-2 transition-colors ${
                activeTab === 'events'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Events & Festivals
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`py-4 px-2 font-light text-sm border-b-2 transition-colors ${
                activeTab === 'flights'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Flights
            </button>
            <button
              onClick={() => setActiveTab('stays')}
              className={`py-4 px-2 font-light text-sm border-b-2 transition-colors ${
                activeTab === 'stays'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Accommodations
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-2 font-light text-sm border-b-2 transition-colors ${
                activeTab === 'packages'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              All-Inclusive Packages
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'events' && <EventsGrid />}
        {activeTab === 'flights' && <FlightSearch />}
        {activeTab === 'stays' && <StaysSearch />}
        {activeTab === 'packages' && <PackageBuilder />}
      </div>

      <Footer />
    </main>
  )
}
