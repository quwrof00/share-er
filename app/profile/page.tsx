import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('Error fetching user:', userError)
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Error fetching profile:', profileError)
    redirect('/error')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white p-10 rounded-2xl shadow-xl space-y-8">
        <h1 className="text-3xl font-bold tracking-wide text-center">Your Profile</h1>

        <ProfileForm defaultUsername={profile?.username || ''} />

        <div className="border-t border-white/10 pt-6 space-y-2 text-sm text-gray-300">
          <p>
            <span className="font-medium text-white">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium text-white">Username:</span> {profile?.username}
          </p>
        </div>
      </div>
    </div>
  )
}
