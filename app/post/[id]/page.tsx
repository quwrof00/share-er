'use server'

import { FC } from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Eye } from 'lucide-react'
import { PostActions } from '@/components/post-actions'
import { CommentForm } from '@/components/comment-form'
import { deleteComment } from '@/app/actions/comment/delete-comment'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: post, error: postError } = await supabase
    .from('posts_with_usernames')
    .select('id, content, created_at, username, user_id, impressions')
    .eq('id', id)
    .single()

  if (postError || !post) return notFound()

  await supabase
    .from('posts')
    .update({ impressions: (post.impressions ?? 0) + 1 })
    .eq('id', post.id)

  const { data: comments, error: commentsError } = await supabase
    .from('comments_with_usernames')
    .select('id, content, created_at, user_id, post_id, username')
    .eq('post_id', post.id)
    .order('created_at', { ascending: false })

  const {
    data: { user: loggedInUser },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !loggedInUser) {
    redirect('/login')
  }

  const isAuthor = post.user_id === loggedInUser.id

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Post Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {post.username}&apos;s Post
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
            <span>By {post.username}</span>
            <span>•</span>
            <span>{new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>{(post.impressions ?? 0) + 1} views</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg mb-8">
          {isAuthor ? (
            <PostActions postId={post.id} defaultContent={post.content} />
          ) : (
            <p className="text-xl sm:text-2xl text-gray-100 leading-relaxed">
              {post.content}
            </p>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Comments</h2>

          <CommentForm postId={post.id} />

          {!comments ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin border-t-4 border-indigo-500 rounded-full w-12 h-12"></div>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-400 text-lg font-light italic py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="mt-8 space-y-4">
              {comments.map((comment) => {
                const isCommentAuthor = comment.user_id === loggedInUser.id

                return (
                  <div
                    key={comment.id}
                    className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-sm hover:bg-gray-750 transition-colors duration-200"
                  >
                    <p className="text-gray-100 text-base leading-relaxed">{comment.content}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        By{' '}
                        <span className="text-indigo-400 font-semibold">
                          {comment.username || 'Anonymous'}
                        </span>{' '}
                        •{' '}
                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      {isCommentAuthor && (
                        <form action={deleteComment}>
                          <input type="hidden" name="id" value={comment.id} />
                          <input type="hidden" name="postId" value={post.id} />
                          <button
                            type="submit"
                            className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}