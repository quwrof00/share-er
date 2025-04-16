"use client"

import { login, signup } from "./actions"
import { motion } from "framer-motion"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-xl space-y-6 border border-white/10"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl font-extrabold text-center text-white tracking-wide"
        >
          Welcome User!👋
        </motion.h2>

        <form method="post" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex gap-4 pt-2"
          >
            <button
              formAction={login}
              className="w-1/2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-300"
            >
              Log In
            </button>
            <button
              formAction={signup}
              className="w-1/2 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 font-semibold shadow-md transition-all duration-300"
            >
              Sign Up
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
