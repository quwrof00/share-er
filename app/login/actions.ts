'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // attempt to sign in
  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    console.error('Login error:', error)

    if (error.code === 'email_not_confirmed') {
      // redirect to a “check your inbox” page
      redirect('/check-your-email')
    }

    // other errors
    redirect('/error')
  }

  // on success, session cookie is set for you
  revalidatePath('/')
  redirect('/')
}


export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    redirect('/error')
  }

  const { data: userData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (error || !userData?.user) {
    console.error('Signup error:', error)
    redirect('/error')
  }

  // Insert into public.users with default username
  const { error: insertError } = await supabase.from('users').insert({
    id: userData.user.id,
    username: 'new_user_' + Date.now(), // default username
    created_at: new Date().toISOString(),
  })

  if (insertError) {
    console.error('Failed to insert user into public.users:', insertError)
    redirect('/error')
  }

  console.log('User signed up:', userData)

  revalidatePath('/')
  redirect('/')
}


  
