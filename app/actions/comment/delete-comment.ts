'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteComment(formData: FormData) {
  const commentId = formData.get('id') as string
  const postId = formData.get('postId') as string

  if (!commentId || !postId) return

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
    console.error('Unauthorized delete attempt')
    return
  }

  const { error: deleteError } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.id) // secure: only author's own comment

  if (deleteError) {
    console.error('Failed to delete comment:', deleteError)
  }

  redirect(`/post/${postId}`)
}
