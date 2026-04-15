'use client'

import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold font-playfair text-white mb-2">
            URMAH
          </h1>
          <p className="text-dark-text-secondary text-lg">
            Join the Premium Community
          </p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-2xl p-8"
          style={{
            boxShadow: '0 0 40px rgba(0, 255, 136, 0.1)',
          }}
        >
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-neon-green text-dark-bg hover:bg-neon-green-dark',
                card: 'bg-transparent border-0 shadow-none',
                cardBox: 'bg-transparent',
              },
            }}
          />
        </div>

        <p className="text-center text-dark-text-secondary text-sm mt-6">
          Already have an account?{' '}
          <a href="/sign-in" className="text-neon-green hover:text-neon-green-light transition-colors">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  )
}
