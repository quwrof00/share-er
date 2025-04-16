import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  console.log('Received token_hash:', token_hash)
  console.log('Type:', type)

  if (token_hash && type) {
    const supabase = await createClient()
    const { error: verifyError } = await supabase.auth.verifyOtp({ type, token_hash })

    if (verifyError) {
      console.error('OTP verification failed:', verifyError)
      redirect('/error')
    }

    console.log('OTP verified successfully!')

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error('Error fetching user after verification:', userError)
    }

    console.log('User after verification:', user)

    if (user && user.email_confirmed_at) {
      const { data: existing, error: existingError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

      if (existingError) console.error('Error checking existing user:', existingError)

      if (!existing) {
        const username = user.user_metadata?.username
        console.log('Username from metadata:', username)

        if (username) {
          const { error: insertError } = await supabase.from('users').insert({
            id: user.id,
            username,
            created_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error('Error inserting into users:', insertError)
          } else {
            console.log('User inserted successfully!')
          }
        } else {
          console.warn('No username found in metadata, skipping insert')
        }
      } else {
        console.log('User already exists in users table')
      }
    }

    redirect(next)
  }

  redirect('/error')
}

