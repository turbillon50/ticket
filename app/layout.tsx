import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata: Metadata = {
  title: "URMAH - Premium Global Events Platform",
  description: "Discover, book, and experience the world's most exclusive events with integrated flights, accommodations, and premium services.",
  openGraph: {
    title: "URMAH - Premium Global Events Platform",
    description: "Discover, book, and experience the world's most exclusive events",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="bg-dark-bg text-dark-text-primary">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
