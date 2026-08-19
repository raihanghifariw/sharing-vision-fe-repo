import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Link from "next/link"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sharing Vision",
  description: "Article management platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0f0f11] text-[#f4f4f5]`}>
        <Providers>
          {/* Navbar */}
          <header className="header-blur fixed top-0 inset-x-0 z-50 h-14">
            <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-zinc-700 border border-zinc-600 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-sm bg-zinc-200" />
                </span>
                <span className="text-sm font-semibold text-zinc-100 tracking-tight">
                  Sharing Vision
                </span>
              </Link>

              {/* Nav links */}
              <nav className="flex items-center gap-0.5">
                {[
                  { href: "/", label: "Preview" },
                  { href: "/posts", label: "All Posts" },
                  { href: "/posts/new", label: "Write" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="px-3 py-1.5 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  >
                    {label}
                  </Link>
                ))}

                <Link
                  href="/posts/new"
                  className="ml-4 px-4 py-1.5 rounded-md text-sm font-semibold bg-zinc-100 text-zinc-900 hover:bg-white transition-colors"
                >
                  New Post
                </Link>
              </nav>
            </div>
          </header>

          {/* Page */}
          <main className="max-w-5xl mx-auto px-6 pt-24 pb-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
