import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (typeof window === "undefined") {
    throw new Error("Supabase client can only be initialized on the client side")
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
