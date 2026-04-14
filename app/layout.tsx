import type { Metadata } from "next"
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}
