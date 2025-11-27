import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Fund Forecasting Tool',
    description: 'Advanced fund modeling and forecasting',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={clsx(inter.className, "bg-background min-h-screen antialiased")}>
                <div className="flex h-screen overflow-hidden bg-background">
                    {/* We are inlining AppLayout logic here or importing it. 
              Since AppLayout is a client component (likely due to interactivity later), 
              we might need to keep RootLayout server-side. 
              Let's just import AppLayout. But wait, AppLayout uses Sidebar which uses Link.
              That's fine in Server Components.
          */}
                    {children}
                </div>
            </body>
        </html>
    )
}
