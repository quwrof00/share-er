'use client'

import Link from 'next/link'

export default function Navbar({ user, profile, logout }: { user: any, profile: any, logout: any }) {
  return (
    <nav className="w-full bg-gray-950 shadow-md py-4 px-6 text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
          Share-er
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {user && (
            <Link
              href="/post/new"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium shadow-md transition duration-300"
            >
              ➕ New Post
            </Link>
          )}

          {user ? (
            <>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white font-medium"
              >
                Profile
              </Link>
              <form action="/logout" method="post" className="ml-1">
                <button
                  formAction={logout}
                  className="text-red-500 hover:text-red-600 font-medium whitespace-nowrap"
                >
                  Logout ({profile?.username ?? 'Unknown'})
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-gray-300 hover:text-white font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
