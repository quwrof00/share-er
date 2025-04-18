"use client"

import { useTransition } from 'react'
import { updateUsername } from '../app/profile/actions/edit-profile'
import { motion } from 'framer-motion'

export default function ProfileForm({ defaultUsername }: { defaultUsername: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 px-4">
      <motion.form
        action={(formData) => {
          startTransition(() => updateUsername(formData))
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-6 bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700/50"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={defaultUsername}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-500"
            required
          />
        </motion.div>

        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="min-w-[150px] h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-300 relative flex items-center justify-center overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <span className="transition-opacity duration-300 ease-in-out opacity-100">Save Changes</span>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  )
}