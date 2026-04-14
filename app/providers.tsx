'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          },
        }}
      />
      {children}
    </ThemeProvider>
  )
}
