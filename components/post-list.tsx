'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

export default function PostList({ posts }: { posts: any[] }) {
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null)
  const router = useRouter()

  const handleClick = (postId: string) => {
    setLoadingPostId(postId)
    setTimeout(() => {
      router.push(`/post/${postId}`)
    }, 200) // give animation a tiny moment before routing
  }

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No posts yet.</p>
      ) : (
        posts.map((post) => {
          const isLoading = loadingPostId === post.id

          return (
            <div
              key={post.id}
              onClick={() => handleClick(post.id)}
              className="cursor-pointer"
            >
              <div
                className={clsx(
                  "border border-gray-700 min-h-[110px] py-5 px-5 rounded-xl shadow-xl bg-gradient-to-r from-gray-700 to-gray-800 transition-all duration-300 flex justify-between items-start gap-4 transform",
                  "hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-bl",
                  isLoading && "animate-pulse translate-x-2 opacity-80"
                )}
              >
                <div className="flex-1">
                  <p className="text-white text-lg line-clamp-2 break-words">
                    {post.content}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Posted by <span className='text-white'>{post.username ?? 'Anonymous'}</span>
                  </p>
                </div>
                {isLoading && (
                  <Loader2 className="animate-spin text-white w-5 h-5 mt-1" />
                )}
              </div>
            </div>
          )
        })
      )}
    </>
  )
}
