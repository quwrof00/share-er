'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updateUsername(formData: FormData) {
  const username = formData.get('username')?.toString().trim()

  if (!username) {
    console.error('Invalid username')
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

  // 🛠️ Update Username
  const { error: updateError } = await supabase
    .from('users')
    .update({ username })
    .eq('id', user.id)

  if (updateError) {
    console.error('Update failed:', updateError)
    throw new Error('Failed to update username')
  }

  // ✅ Redirect on success
  redirect('/profile')
}
