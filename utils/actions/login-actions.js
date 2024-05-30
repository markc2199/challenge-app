'use server'
import { redirect } from "next/dist/server/api-utils"
import { createClient } from "../supabase/server"

export async function login(prevState, formData) {
    const supabase = createClient()
    const email = formData.get('email')
    console.log(`this is the email: ${email}`)
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,  
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: 'https://localhost:3000/dashboard',
      },
    })

    if (error) {
        return {
            error: true,
            message: "Error authenticating"
        }
    }

    return {
        message: `Email sent successfully to ${email}`
    }

  }
  