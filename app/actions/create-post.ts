'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const content = formData.get('content') as string
  if (!content || content.trim().length === 0) return

  // Retrieve cookies
  const cookieStore = await cookies()

  // Create Supabase client
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

  // Check if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Unauthorized attempt to create post')
    redirect('/login') // Ensure no further code runs after this
    return // Stop execution after the redirect
  }

  // Insert post into the database
  const { error: insertError } = await supabase.from('posts').insert({
    content,
    user_id: user.id,
  })

  if (insertError) {
    console.error('Failed to insert post:', insertError)
    return // Stop if there was an issue inserting
  }
  redirect('/');

  console.log('Post created successfully!')
}
