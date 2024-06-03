'use server'
import { redirect } from "next/navigation"
import { createClient } from "../supabase/server"
import { loginSchema } from "../validation"

export async function login(formData) {
    const validated = loginSchema.safeParse(formData)

    if (!validated.success) {
        throw new Error('Invalid data, please try again')
    }
    const email = validated.data.email

    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,  
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
      },
    })

    if (error) {
      throw new Error(`Error authenticating: ${error}`)
    }
  }

  export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    redirect('/login')
}
  