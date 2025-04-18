import { getPosts } from './actions/get-posts'
import PostList from '@/components/post-list' // adjust path if needed

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-200 tracking-tight">
            Welcome to Share-er
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Discover and share thoughts with the community
          </p>
        </div>
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-indigo-700/30">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  )
}