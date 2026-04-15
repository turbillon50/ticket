'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Notification, getNotifications, markNotificationAsRead, getNotificationIcon } from '@/lib/notifications'

interface NotificationBellProps {
  userId?: string
}

export default function NotificationBell({ userId }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userId && isOpen) {
      loadNotifications()
    }
  }, [userId, isOpen])

  const loadNotifications = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const notifs = await getNotifications(userId)
      setNotifications(notifs)
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationClick = async (notifId: string) => {
    await markNotificationAsRead(notifId)
    setNotifications((prev) => prev.map((n) => (n.id === notifId ? { ...n, read: true } : n)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!userId) {
    return null
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-neon-green transition-colors"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-96 bg-dark-card border border-neon-green/20 rounded-2xl shadow-2xl z-50"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 136, 0.1)',
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neon-green/20">
              <h3 className="text-xl font-bold text-white">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-dark-text-secondary hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <p className="text-dark-text-secondary">Loading...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <span className="text-4xl mb-2 block">📭</span>
                  <p className="text-dark-text-secondary">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-neon-green/10">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 cursor-pointer transition-colors ${
                        notif.read ? 'bg-dark-bg/50 hover:bg-dark-bg' : 'bg-neon-green/5 hover:bg-neon-green/10'
                      }`}
                      onClick={() => handleNotificationClick(notif.id)}
                    >
                      <div className="flex gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {getNotificationIcon(notif.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold ${notif.read ? 'text-dark-text-secondary' : 'text-white'}`}>
                            {notif.title}
                          </h4>
                          <p className="text-dark-text-secondary text-sm line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="text-xs text-dark-text-secondary mt-1">
                            {new Date(notif.createdAt).toLocaleDateString()} at{' '}
                            {new Date(notif.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-neon-green flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-neon-green/20 text-center">
                <button className="text-neon-green hover:text-neon-green-light font-semibold text-sm transition-colors">
                  View All Notifications →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
