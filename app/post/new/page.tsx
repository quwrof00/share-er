// app/post/new/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PostForm from '@/components/post-form'

export default async function NewPostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <PostForm />
}
