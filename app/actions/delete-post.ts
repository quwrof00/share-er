'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deletePost(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return

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

  try {
    // Fetch the current logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('Unauthorized attempt to delete post')
      throw new Error('Unauthorized')
    }

    console.log('Logged-in user:', user.id)

    // Fetch the post details
    const { data: post, error: postError } = await supabase.from('posts').select('user_id').eq('id', id).single()

    if (postError || !post) {
      console.error('Post not found or error fetching post:', postError)
      throw new Error('Post not found')
    }

    console.log('Post author user_id:', post.user_id)

    // Check if the logged-in user is the author
    if (post.user_id !== user.id) {
      console.error('User is not the author of the post')
      throw new Error('Unauthorized')
    }

    // Delete the post from the database
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', id)

    if (deleteError) {
      console.error('Failed to delete post:', deleteError)
      throw new Error('Failed to delete post')
    } 
    // Redirect to homepage after deletion
     // Return the redirect, which works with server-side functions

  } catch (error) {
    console.error('Delete post failed:', error)
    return
  }
  redirect('/');
}
