'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Eye } from 'lucide-react'

interface Post {
  id: string
  content: string
  username?: string
  impressions: number
  createdAt: string
}

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<'latest' | 'popular'>('latest')
  const router = useRouter()

  const handleClick = (postId: string) => {
    setLoadingPostId(postId)
    setTimeout(() => {
      router.push(`/post/${postId}`)
    }, 200)
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortMode === 'popular') {
      return b.impressions - a.impressions
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sort Toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setSortMode('latest')}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md
            ${sortMode === 'latest' 
              ? 'bg-indigo-600 text-white shadow-indigo-500/50' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          aria-pressed={sortMode === 'latest'}
        >
          Latest
        </button>
        <button
          onClick={() => setSortMode('popular')}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md
            ${sortMode === 'popular' 
              ? 'bg-indigo-600 text-white shadow-indigo-500/50' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          aria-pressed={sortMode === 'popular'}
        >
          Most Popular
        </button>
      </div>

      {/* Post List */}
      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl font-light italic">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedPosts.map((post) => {
            const isLoading = loadingPostId === post.id

            return (
              <div
                key={post.id}
                onClick={() => handleClick(post.id)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(post.id)}
                aria-label={`View post by ${post.username ?? 'Anonymous'}`}
              >
                <div
                  className={`relative bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg
                    transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl
                    ${isLoading ? 'animate-pulse opacity-90' : 'hover:bg-gradient-to-r hover:from-indigo-900 hover:to-gray-900'}`}
                >
                  {/* Post Content */}
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-white text-lg font-medium line-clamp-2 break-words leading-relaxed">
                        {post.content}
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <p className="text-sm text-gray-400">
                          Posted by{' '}
                          <span className="text-indigo-400 font-semibold">
                            {post.username ?? 'Anonymous'}
                          </span>
                        </p>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Eye className="w-4 h-4" />
                          <span>{post.impressions}</span>
                        </div>
                      </div>
                    </div>
                    {isLoading && (
                      <Loader2 className="animate-spin text-indigo-400 w-6 h-6 mt-2" />
                    )}
                  </div>

                  {/* Subtle Gradient Overlay on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}