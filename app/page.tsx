import Link from 'next/link'
import { getPosts } from './actions/get-posts'

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto mt-10 space-y-8">
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
