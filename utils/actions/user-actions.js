'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"
import { displayNameSchema } from "../validation"

export async function updateDisplayName(formData) {

    // validate the data

     const validated = displayNameSchema.safeParse(formData)

     if (!validated.success) {
         throw new Error("Invalid data")
     }
 
    const display_name = validated.data.display_name

    const supabase = createClient()

    // get current user
    const { data: { user } } = await supabase.auth.getUser()

    // update display_name

    const { data, error } = await supabase
    .from('profiles')
    .update({ display_name: display_name })
    .eq('id', user.id)
    .select()

    if (error) {
        throw new Error("Error updating display name")
    }
        
    // revalidate path
    revalidatePath('/dashboard')
}