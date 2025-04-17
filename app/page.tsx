import Link from 'next/link'
import { getPosts } from './actions/get-posts'
import { createClient } from '@/utils/supabase/server'
import { logout } from './logout/actions'

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
    } else {
      profile = profileData
    }
  }

  const posts = await getPosts()

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto mt-10 space-y-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/post/new"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transform hover:scale-105 transition duration-300"
          >
            ➕ New Post
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="text-lg text-gray-300 hover:text-gray-100 font-medium"
              >
                Profile
              </Link>
              <form action="/logout" method="post">
                <button
                  formAction={logout}
                  className="text-lg text-red-600 hover:text-red-700 font-medium"
                >
                  Logout ({profile?.username ?? 'Unknown'})
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-lg text-gray-300 hover:text-gray-100 font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="block">
              <div className="border border-gray-700 py-5 px-5 rounded-xl shadow-xl bg-gradient-to-r from-gray-700 to-gray-800 hover:bg-gradient-to-l hover:from-gray-800 hover:to-gray-700 transition-all duration-300 h-25">
                <p className="text-white text-lg truncate">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posted by {post.username ?? 'Anonymous'}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
