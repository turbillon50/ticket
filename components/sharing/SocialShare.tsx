'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface SocialShareProps {
  eventName: string
  eventUrl: string
  eventEmoji: string
  eventLocation: string
}

interface SharePlatform {
  id: string
  name: string
  icon: string
  color: string
  generateShareUrl: (url: string, text: string) => string
}

export default function SocialShare({ eventName, eventUrl, eventEmoji, eventLocation }: SocialShareProps) {
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareText = `🎉 Just booked ${eventName} on URMAH! ${eventEmoji} This all-inclusive experience includes flights, accommodation, and more. Join me! 🌍✈️🏨`

  const platforms: SharePlatform[] = [
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: '𝕏',
      color: 'hover:bg-black',
      generateShareUrl: (url, text) =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'f',
      color: 'hover:bg-blue-600',
      generateShareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: 'hover:bg-pink-600',
      generateShareUrl: (url) => `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '♪',
      color: 'hover:bg-black',
      generateShareUrl: (url) => `https://www.tiktok.com/share?url=${encodeURIComponent(url)}`,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'in',
      color: 'hover:bg-blue-700',
      generateShareUrl: (url, text) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      color: 'hover:bg-green-500',
      generateShareUrl: (url, text) =>
        `https://wa.me/?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
    },
  ]

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: SharePlatform) => {
    const shareUrl = platform.generateShareUrl(eventUrl, shareText)
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="space-y-4">
      {!showShare ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowShare(true)}
          className="w-full px-6 py-3 bg-neon-green/20 border border-neon-green/50 text-neon-green font-bold rounded-lg hover:bg-neon-green/30 transition-all flex items-center justify-center gap-2"
        >
          🔗 Share This Event
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Share on Social Media</h3>
            <button
              onClick={() => setShowShare(false)}
              className="text-dark-text-secondary hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          {/* Copy Link Section */}
          <div className="mb-6 pb-6 border-b border-neon-green/20">
            <p className="text-dark-text-secondary text-sm mb-3">Or copy the link</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-dark-bg border border-neon-green/20 rounded-lg px-4 py-2 text-dark-text-secondary text-sm truncate flex items-center">
                {eventUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green-dark transition-all text-sm"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Social Platforms Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {platforms.map((platform) => (
              <motion.button
                key={platform.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare(platform)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg bg-dark-bg border border-neon-green/20 text-white hover:border-neon-green transition-all ${platform.color}`}
              >
                <span className="text-3xl mb-1">{platform.icon}</span>
                <span className="text-xs font-semibold text-center">{platform.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Share Preview */}
          <div className="mt-6 pt-6 border-t border-neon-green/20">
            <p className="text-dark-text-secondary text-xs mb-2">Preview</p>
            <div className="bg-dark-bg border border-neon-green/10 rounded-lg p-4 text-sm text-white">
              <p>{shareText}</p>
              <p className="text-neon-green mt-2 break-all">{eventUrl}</p>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setShowShare(false)}
            className="w-full mt-4 px-6 py-2 bg-dark-bg border border-neon-green/20 text-white font-semibold rounded-lg hover:border-neon-green transition-all"
          >
            Done
          </button>
        </motion.div>
      )}
    </div>
  )
}
