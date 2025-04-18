// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Always return a NextResponse; any thrown error becomes MIDDLEWARE_INVOCATION_FAILED
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Skip static files, images, favicon
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
