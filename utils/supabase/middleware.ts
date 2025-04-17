// utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

// Build Supabase client + NextResponse with full cookie support
export const createClient = (request: NextRequest) => {
  // 1. Create initial NextResponse (preserves request headers)
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 2. Instantiate Supabase client with cookie callbacks
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // a) update request.cookies for SSR components
            request.cookies.set({ name, value, ...options })
            // b) re-create NextResponse to capture updated headers
            response = NextResponse.next({
              request: { headers: request.headers },
            })
            // c) set cookie on the outgoing response to browser
            response.cookies.set({ name, value, ...options })
          })
        },
      },
    }
  )
  return { supabase, response }
}

// Main middleware logic: refresh tokens and return the response
export const updateSession = async (request: NextRequest) => {
  try {
    const { supabase, response } = createClient(request)
    // 3. This revalidates the session on every middleware pass
    await supabase.auth.getUser()  
    // 4. Return the response (redirects, rewrites, etc. would go here if needed)
    return response
  } catch (error) {
    console.error('Supabase middleware error:', error)
    // On any failure, still return a NextResponse instead of throwing
    return NextResponse.next({ request: { headers: request.headers } })
  }
}
