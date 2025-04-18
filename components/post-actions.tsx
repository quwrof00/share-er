"use client"

import { useTransition } from 'react'
import { updatePost } from '@/app/actions/update-post'
import { deletePost } from '@/app/actions/delete-post'
import { motion } from 'framer-motion'

export function PostActions({ postId, defaultContent }: { postId: string; defaultContent: string }) {
  const [isPendingUpdate, startUpdate] = useTransition()
  const [isPendingDelete, startDelete] = useTransition()

  const handleUpdateSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    startUpdate(() => updatePost(formData))
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('id', postId)
    startDelete(() => deletePost(formData))
  }

  return (
    <motion.form
      onSubmit={handleUpdateSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 w-full bg-gray-900/80 backdrop-blur-lg p-6 rounded-3xl border border-gray-700/50"
    >
      <input type="hidden" name="id" value={postId} />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <textarea
          name="content"
          defaultValue={defaultContent}
          required
          className="w-full h-48 p-4 text-lg rounded-xl bg-gray-800/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-500 resize-none"
        />
      </motion.div>
      <motion.div
        className="flex justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="submit"
          disabled={isPendingUpdate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex-1 h-12 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-300 relative flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPendingUpdate ? (
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <span>Save Changes</span>
          )}
        </motion.button>
        <motion.button
          type="button"
          onClick={handleDeleteClick}
          disabled={isPendingDelete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex-1 h-12 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold shadow-lg transition-all duration-300 relative flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPendingDelete ? (
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <span>Delete Post</span>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}