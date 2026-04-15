'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ADMIN_MENU = [
  { icon: '📊', label: 'Analytics', href: '/admin' },
  { icon: '👥', label: 'Users', href: '/admin/users' },
  { icon: '🎪', label: 'Events', href: '/admin/events' },
  { icon: '💰', label: 'Payments', href: '/admin/payments' },
  { icon: '🎫', label: 'Bookings', href: '/admin/bookings' },
  { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
]

const PRODUCER_MENU = [
  { icon: '📊', label: 'Dashboard', href: '/producer' },
  { icon: '🎪', label: 'My Events', href: '/producer/events' },
  { icon: '🎫', label: 'Bookings', href: '/producer/bookings' },
  { icon: '💰', label: 'Earnings', href: '/producer/earnings' },
  { icon: '📁', label: 'Settings', href: '/producer/settings' },
]

export default function Sidebar() {
  const { signOut } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const isAdmin = user?.publicMetadata?.role === 'admin'
  const menu = isAdmin ? ADMIN_MENU : PRODUCER_MENU

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-dark-card border-r border-neon-green/20 p-6 flex flex-col"
      style={{
        boxShadow: '0 0 40px rgba(0, 255, 136, 0.05)',
      }}
    >
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold font-playfair text-white mb-1">
          URMAH
        </h1>
        <p className="text-neon-green text-sm">
          {isAdmin ? 'Admin Dashboard' : 'Producer Portal'}
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-text-secondary hover:text-white hover:bg-dark-bg transition-all group"
          >
            <span className="text-xl group-hover:text-neon-green transition-colors">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-neon-green/20 pt-4 space-y-3">
        <div className="px-2">
          <p className="text-sm text-dark-text-secondary">Logged in as</p>
          <p className="text-white font-semibold">{user?.firstName}</p>
        </div>
        <button
          onClick={() => signOut(() => router.push('/'))}
          className="w-full px-4 py-2 bg-neon-green/10 border border-neon-green/30 text-neon-green rounded-lg hover:bg-neon-green/20 transition-all font-medium"
        >
          Sign Out
        </button>
      </div>
    </motion.div>
  )
}
