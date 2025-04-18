"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar({ user, profile, logout }: { user: any, profile: any, logout: any }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 backdrop-blur-lg shadow-xl py-4 px-6 text-white border-b border-indigo-700/30 sticky top-0 z-50"
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/" className="text-3xl font-bold text-indigo-300 hover:text-indigo-200 transition-all duration-300">
            Share-er
          </Link>
        </motion.div>

        <div className="flex items-center gap-4 sm:gap-6">
          {user && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/post/new"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                ➕ New Post
              </Link>
            </motion.div>
          )}

          {user ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/profile"
                  className="text-indigo-300 hover:text-indigo-200 font-medium transition-all duration-300"
                >
                  Profile
                </Link>
              </motion.div>
              <motion.form
                action="/logout"
                method="post"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  formAction={logout}
                  className="text-red-400 hover:text-red-300 font-medium whitespace-nowrap transition-all duration-300"
                >
                  Logout ({profile?.username ?? 'Unknown'})
                </button>
              </motion.form>
            </>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/login"
                className="text-indigo-300 hover:text-indigo-200 font-medium transition-all duration-300"
                >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
