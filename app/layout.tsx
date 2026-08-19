import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Link from "next/link"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sharing Vision — Article App",
  description: "Post article management app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <Providers>
          <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
            <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-6">
              <span className="font-semibold text-gray-900">Sharing Vision</span>
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Preview</Link>
              <Link href="/posts" className="text-sm text-gray-600 hover:text-gray-900">All Posts</Link>
              <Link href="/posts/new" className="text-sm text-gray-600 hover:text-gray-900">Add New</Link>
            </nav>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
