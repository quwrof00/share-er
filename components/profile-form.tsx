'use client'

import { useTransition } from 'react'
import { updateUsername } from '../app/profile/actions/edit-profile'

export default function ProfileForm({ defaultUsername }: { defaultUsername: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        startTransition(() => updateUsername(formData))
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={defaultUsername}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      <div className="flex justify-end">
      <button
  type="submit"
  disabled={isPending}
  className="min-w-[150px] h-[42px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition relative flex items-center justify-center overflow-hidden"
>
  {!isPending && <span className="transition-opacity duration-300 ease-in-out opacity-100">Save Changes</span>}
  {isPending && <div className="Updateloader absolute" />}
</button>




      </div>
    </form>
  )
}
