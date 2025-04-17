'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData): Promise<{ error?: string; success?: boolean }> {
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
      return { error: 'Activate your email' }
    }
    if (error.code == 'invalid_credentials'){
      return { error: 'Invalid credentials'};
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

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { data: userData, error } = await supabase.auth.signUp({
    email,
    password,
  })

  // Already signed up and confirmed
  if (error?.code === 'user_already_exists') {
    return { error: 'Email is already registered. Try logging in instead.' }
  }

  // No error, but user is not confirmed
  if (!error && userData?.user && !userData.user?.confirmation_sent_at) {
    return { error: 'Confirmation email was already sent. Check your inbox.' }
  }

  if (error) {
    return { error: error.message }
  }

  const { error: insertError } = await supabase.from('users').insert({
    id: userData.user?.id,
    username: 'new_user_' + Date.now(),
    created_at: new Date().toISOString(),
  })

  if (insertError) {
    return { error: 'Failed to set up user profile.' }
  }

  return { success: true }
}



  
