'use client'

import { useTransition } from 'react'
import { updatePost } from '@/app/actions/update-post'
import { deletePost } from '@/app/actions/delete-post'

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

    // Create a FormData instance for delete
    const formData = new FormData()
    formData.append('id', postId)

    // Call deletePost with FormData
    startDelete(() => deletePost(formData))
  }

  return (
    <>
      {/* Update Form */}
      <form onSubmit={handleUpdateSubmit} className="space-y-4 w-full">
        <input type="hidden" name="id" value={postId} />
        <textarea
          name="content"
          defaultValue={defaultContent}
          className="w-full h-52 p-6 text-xl border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="flex justify-between mt-2">
          {/* Save Changes button */}
          <button
            type="submit"
            disabled={isPendingUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 relative h-12 min-w-[150px] flex items-center justify-center hover:bg-blue-700"
          >
            {isPendingUpdate ? (
              <div className="Updateloader w-full" />
            ) : (
              <span>Save Changes</span>
            )}
          </button>
          {/* Delete button */}
          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={isPendingDelete}
            className="bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 relative h-12 min-w-[150px] flex items-center justify-center hover:bg-red-800"
          >
            {isPendingDelete ? (
              <div className="Deleteloader w-full" />
            ) : (
              <span>Delete Post</span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
