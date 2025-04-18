"use client"

import { createPost } from '@/app/actions/create-post'
import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {pending ? (
        <div className="flex justify-center">
          <svg className="animate-spin h-6 w-6 text-indigo-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-300"
        >
          Post
        </button>
      )}
    </motion.div>
  )
}

export default function PostForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4">
      <motion.form
        action={createPost}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-6 bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-gray-700/50"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            name="content"
            placeholder="What’s happening?"
            required
            className="w-full h-32 rounded-xl border border-gray-600/50 bg-gray-800/50 p-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none"
          />
        </motion.div>
        <SubmitButton />
      </motion.form>
    </div>
  )
}