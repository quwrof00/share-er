"use client"

import { useFormStatus } from 'react-dom'
import { addComment } from '@/app/actions/comment/add-comment'
import { motion } from 'framer-motion'

export function CommentForm({ postId }: { postId: string }) {
  return (
    <motion.form
      action={addComment}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      <input type="hidden" name="postId" value={postId} />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <textarea
          name="content"
          placeholder="Write a comment..."
          required
          className="w-full h-20 p-4 text-base rounded-xl bg-gray-800/50 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 placeholder-gray-500 resize-none"
        />
      </motion.div>
      <CommentSubmitButton />
    </motion.form>
  )
}

function CommentSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Comment
      {pending && (
        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
    </motion.button>
  )
}