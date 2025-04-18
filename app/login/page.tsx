"use client"

import { login, signup } from "./actions"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { useState } from "react"

export default function LoginPage() {
  const [loadingAction, setLoadingAction] = useState<'login' | 'signup' | null>(null)

  async function handleSignup(formData: FormData) {
    setLoadingAction('signup')
    const res = await signup(formData)
    setLoadingAction(null)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Signup successful! Check your email.")
    }
  }

  async function handleLogin(formData: FormData) {
    setLoadingAction('login')
    const res = await login(formData)
    setLoadingAction(null)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Logged in successfully!")
    }
  }

  return (
    <div className="min-h-screen font-sans flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-md w-full bg-gray-900/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl space-y-8 border border-gray-700/50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white tracking-tight">Welcome Back! 👋</h2>
          <p className="mt-2 text-sm text-gray-400">Log in or sign up to join the community</p>
        </motion.div>

        <form action={handleLogin} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
              className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 pt-4"
          >
            <button
              type="submit"
              className="w-1/2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingAction !== null}
            >
              {loadingAction === 'login' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </button>

            <button
              type="button"
              onClick={async () => {
                const form = document.querySelector("form") as HTMLFormElement
                if (form) {
                  const formData = new FormData(form)
                  await handleSignup(formData)
                }
              }}
              className="w-1/2 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingAction !== null}
            >
              {loadingAction === 'signup' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}