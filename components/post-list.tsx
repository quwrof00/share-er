'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react' // or any spinner icon from your icon lib

export default function PostList({ posts }: { posts: any[] }) {
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null)
  const router = useRouter()

  const handleClick = (postId: string) => {
    setLoadingPostId(postId)
    router.push(`/post/${postId}`)
  }

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClick(post.id)}
            className="cursor-pointer"
          >
            <div className="border border-gray-700 py-5 px-5 rounded-xl shadow-xl bg-gradient-to-r from-gray-700 to-gray-800 hover:bg-gradient-to-l hover:from-gray-800 hover:to-gray-700 transition-all duration-300 h-25 flex justify-between items-center">
              <div>
                <p className="text-white text-lg truncate">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posted by {post.username ?? 'Anonymous'}
                </p>
              </div>
              {loadingPostId === post.id && (
                <Loader2 className="animate-spin text-white ml-4 w-5 h-5" />
              )}
            </div>
          </div>
        ))
      )}
    </>
  )
}
