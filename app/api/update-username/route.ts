import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient() // No arguments needed
  const { username } = await req.json()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('User not found or error retrieving user:', userError)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  console.log('User ID:', user.id)

  const { data, error } = await supabase
    .from('public.users') 
    .update({ username })
    .eq('id', user.id)
    .select()  // Select the updated row to check if the update was successful

  if (error) {
    console.error('Error executing update query:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('Updated user data:', data) // Log the result of the update query

  return NextResponse.json({ success: true })
}
