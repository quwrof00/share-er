"use client"

import { login, signup } from "./actions"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

function LoginForm() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSignup(formData: FormData) {
    setIsPending(true)
    const res = await signup(formData)
    setIsPending(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Signup successful! Check your email.")
    }
  }

  async function handleLogin(formData: FormData) {
    setIsPending(true)
    const res = await login(formData)
    setIsPending(false)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Logged in successfully!")
      const redirectTo = searchParams.get("redirectTo") || "/"
      router.push(redirectTo)
    }
  }

  return (
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
        Welcome User! 👋
      </motion.h2>

      <form action={handleLogin} className="space-y-6">
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
            type="submit"
            className="w-1/2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-300"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log In"}
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
            className="w-1/2 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 font-semibold shadow-md transition-all duration-300"
            disabled={isPending}
          >
            {isPending ? "Please wait..." : "Sign Up"}
          </button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
