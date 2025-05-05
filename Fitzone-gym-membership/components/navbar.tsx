"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Database, BarChart2 } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path ? "text-blue-500 font-bold" : "hover:text-blue-500"
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-800">FitZone</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={`px-3 py-2 ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/members" className={`px-3 py-2 ${isActive("/members")}`}>
              Members
            </Link>
            <Link href="/dashboard" className={`px-3 py-2 ${isActive("/dashboard")}`}>
              <div className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link href="/data-loader" className={`px-3 py-2 ${isActive("/data-loader")}`}>
              <div className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                <span>Data Loader</span>
              </div>
            </Link>
            <Link href="/about" className={`px-3 py-2 ${isActive("/about")}`}>
              About Us
            </Link>
            <Link href="/contact" className={`px-3 py-2 ${isActive("/contact")}`}>
              Contact
            </Link>
            <Link href="/login" className="px-3 py-2 ml-4 btn-primary">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={`block px-3 py-2 rounded-md ${isActive("/")}`} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              href="/members"
              className={`block px-3 py-2 rounded-md ${isActive("/members")}`}
              onClick={() => setIsOpen(false)}
            >
              Members
            </Link>
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded-md ${isActive("/dashboard")}`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              href="/data-loader"
              className={`block px-3 py-2 rounded-md ${isActive("/data-loader")}`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                <span>Data Loader</span>
              </div>
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md ${isActive("/about")}`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md ${isActive("/contact")}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link href="/login" className="block px-3 py-2 rounded-md btn-primary" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
