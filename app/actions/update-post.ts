'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updatePost(formData: FormData) {
  const id = formData.get('id')?.toString()
  const content = formData.get('content')?.toString().trim()

  if (!id || !content) {
    console.error('Missing or invalid post ID/content')
    return
  }

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

  // 🔐 Auth Check
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Unauthorized: No user')
    throw new Error('Unauthorized')
  }

  // ✅ Ownership Check
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('user_id')
    .eq('id', id)
    .single()

  if (postError || !post || post.user_id !== user.id) {
    console.error('Unauthorized: Not the post author')
    throw new Error('Unauthorized')
  }

  // 🛠️ Update
  const { error: updateError } = await supabase
    .from('posts')
    .update({ content })
    .eq('id', id)

  if (updateError) {
    console.error('Update failed:', updateError)
    throw new Error('Failed to update post')
  }

  // ✅ Redirect on success
  redirect(`/post/${id}`)
}
