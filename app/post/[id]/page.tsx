// @ts-nocheck

'use server'

import { FC } from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { updatePost } from '@/app/actions/update-post'
import { deletePost } from '@/app/actions/delete-post'
import { addComment } from '@/app/actions/comment/add-comment'
import { deleteComment } from '@/app/actions/comment/delete-comment'

interface PageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PageProps) {
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

  // Fetch the post from the database
  const { data: post, error: postError } = await supabase
    .from('posts_with_usernames')
    .select('id, content, created_at, username, user_id, impressions')
    .eq('id', params.id)
    .single()

  if (postError || !post) return notFound()

  // Update the impressions of the post
  await supabase
    .from('posts')
    .update({ impressions: (post.impressions ?? 0) + 1 })
    .eq('id', post.id)

  // Fetch comments for the specific post
  const { data: comments, error: commentsError } = await supabase
    .from('comments_with_usernames')
    .select('id, content, created_at, user_id, post_id, username')
    .eq('post_id', post.id)
    .order('created_at', { ascending: false })

  if (commentsError) {
    console.error('Error fetching comments:', commentsError)
  }

  // Fetch logged-in user data
  const {
    data: { user: loggedInUser },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !loggedInUser) {
    redirect('/login')
  }

  const isAuthor = post.user_id === loggedInUser.id

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto mt-10 space-y-10">
        {/* Post Header */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-5xl font-bold text-white">
            {post.username}'s Post
          </h1>

          {isAuthor ? (
            <>
              <form action={updatePost} className="space-y-4 w-full">
                <input type="hidden" name="id" value={post.id} />
                <textarea
                  name="content"
                  defaultValue={post.content}
                  className="w-full h-52 p-6 text-xl border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

              <form action={deletePost} className="mt-4 flex justify-end">
                <input type="hidden" name="id" value={post.id} />
                <button
                  type="submit"
                  className="text-red-600 text-base font-medium hover:text-red-700 transition"
                >
                  Delete Post
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="text-2xl sm:text-3xl leading-relaxed text-gray-100">
                {post.content}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                By {post.username} •{' '}
                {new Date(post.created_at).toLocaleString()}
              </p>
            </>
          )}
        </div>

        {/* Post Impressions */}
        <p className="text-xs text-gray-500 mt-2">
          👁️ {post.impressions + 1} views
        </p>

        {/* Comments Section */}
        <div className="bg-gray-800 p-6 rounded-xl mt-8">
          <h2 className="text-xl text-gray-200 mb-4">Comments</h2>
          <form action={addComment} className="space-y-4">
            <input type="hidden" name="postId" value={post.id} />
            <textarea
              name="content"
              placeholder="Write a comment..."
              className="w-full h-20 p-3 border rounded-lg bg-gray-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition duration-300 text-sm"
            >
              Comment
            </button>
          </form>

          {/* Comments Loading Spinner */}
          {!comments && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin border-t-4 border-blue-600 rounded-full w-10 h-10"></div>
            </div>
          )}

          {/* Render Comments */}
          <div className="mt-6 space-y-3">
            {comments?.map((comment) => {
              const isCommentAuthor = comment.user_id === loggedInUser.id

              return (
                <div
                  key={comment.id}
                  className="bg-gray-700 p-3 rounded-lg text-sm shadow-sm"
                >
                  <p className="text-gray-100">{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    By {comment.username || 'Anonymous'} •{' '}
                    {new Date(comment.created_at).toLocaleString()}
                  </p>

                  {isCommentAuthor && (
                    <form action={deleteComment} className="mt-1">
                      <input type="hidden" name="id" value={comment.id} />
                      <input type="hidden" name="postId" value={post.id} />
                      <button
                        type="submit"
                        className="text-red-500 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
