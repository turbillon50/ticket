'use client'

import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-neon-green rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    redirect('/sign-in')
  }

  return (
    <div className="flex h-screen bg-dark-bg">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
