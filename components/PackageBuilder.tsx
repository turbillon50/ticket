'use client'

import { useState } from 'react'

export default function PackageBuilder() {
  const [packages, setPackages] = useState([
    {
      name: 'Essential',
      price: 2999,
      includes: ['Event Ticket', 'Round-trip Flights', '3 Nights Hotel', 'Airport Transfer'],
    },
    {
      name: 'Premium',
      price: 5999,
      includes: ['VIP Ticket', 'First Class Flights', '5 Nights 5-Star Hotel', 'Private Transfers', 'Concierge 24/7'],
    },
    {
      name: 'Ultimate',
      price: 9999,
      includes: ['Premium VIP Ticket', 'Private Jet', 'Luxury Villa', 'Personal Concierge', 'All Meals Included'],
    },
  ])

  return (
    <div className="py-12">
      <h2 className="text-4xl font-light mb-12">All-Inclusive Packages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <div key={idx} className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30 hover:border-amber-400/50 transition">
            <h3 className="text-2xl font-light mb-4">{pkg.name}</h3>
            <p className="text-4xl font-light text-amber-400 mb-8">${pkg.price.toLocaleString()}</p>

            <ul className="space-y-3 mb-8">
              {pkg.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 font-light">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>

            <button className="w-full bg-amber-400 text-black py-3 font-light hover:bg-amber-500 transition">
              Customize Package
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
