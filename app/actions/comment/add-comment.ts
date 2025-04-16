'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function addComment(formData: FormData) {
  const postId = formData.get('postId') as string
  const content = formData.get('content') as string

  if (!postId || !content || content.trim().length === 0) return

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

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('Unauthorized comment attempt')
    return
  }

  const { error: insertError } = await supabase
    .from('comments')
    .insert({ content, post_id: postId, user_id: user.id })

  if (insertError) {
    console.error('Failed to add comment:', insertError)
  }
  redirect(`/post/${postId}`)
}
