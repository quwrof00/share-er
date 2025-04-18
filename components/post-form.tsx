'use client'

import { createPost } from '@/app/actions/create-post'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return pending ? (
    <div className="flex justify-center">
      <div className="CreateLoader" />
    </div>
  ) : (
    <button
      type="submit"
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition duration-300"
    >
      Post
    </button>
  )
}

export default function PostForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form action={createPost} className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl">
        <textarea
          name="content"
          placeholder="What’s happening?"
          className="w-full rounded-md border border-gray-700 bg-gray-700 text-white p-4 text-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        <SubmitButton />
      </form>
    </div>
  )
}
