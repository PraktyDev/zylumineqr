import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: "Purchase Concierge Portal",
  description: "Generate, register, and deliver a bespoke post-purchase experience",
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const session = await auth()

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <SessionProvider session={session}>
        <div 
          className="fixed inset-0 -z-10"
          style={{
            background: `radial-gradient(circle at top, rgba(236, 72, 153, 0.4), transparent 45%), radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.45), transparent 40%), #030712`
          }}
        />
        {children}
        <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}