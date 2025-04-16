// supabase/functions/insert_user_after_confirmation/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { event, user } = await req.json()

  if (event !== "user.confirmed") {
    return new Response("Not a confirmation event", { status: 400 })
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  // Insert into public.users if not already there
  const { error } = await supabaseAdmin
    .from("users")
    .insert({ id: user.id })
    .select()

  if (error && !error.message.includes("duplicate key")) {
    console.error("Failed to insert user:", error)
    return new Response("DB error", { status: 500 })
  }

  return new Response("User inserted")
})

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
