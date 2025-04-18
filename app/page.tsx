import { getPosts } from './actions/get-posts'
import PostList from '@/components/post-list' // adjust path if needed

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto mt-10 space-y-8">
        <PostList posts={posts} />
      </div>
    </div>
  )
}
