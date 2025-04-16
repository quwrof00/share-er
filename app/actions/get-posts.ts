import { createClient } from "@/utils/supabase/server"

export type Post = {
  id: string
  content: string
  created_at: string
  username: string
}

export async function getPosts() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from("posts_with_usernames")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    throw error
  }

  return posts || []
}
