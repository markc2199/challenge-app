'use server'
import { redirect } from "next/dist/server/api-utils"
import { createClient } from "../supabase/server"

export async function login(email) {
    console.log(`login function was called with ${email}`)
    const supabase = createClient()
    

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,  
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: 'https://localhost:3000/dashboard',
      },
    })
  }
  