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

export async function uploadAvatar(formData) {

    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    const file = formData.get('file')

    if (file.name === undefined) {
        throw new Error("Please select a file")
    }

    const path = formData.get('path')

    // Original extension of the file
    // File name will be generated
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Math.random()}.${fileExt}`

    const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

    if (error) {
        throw new Error("Error uploading avatar")
    }

    // Remove the old avatar
    const { data: currentAvatar, error: getCurrentAvatarError } =  await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (getCurrentAvatarError) {
        throw new Error("Error getting current avatar for deletion")
    }

    if (currentAvatar.avatar) {
        const { error } = await supabase.storage
            .from('avatars')
            .remove([currentAvatar.avatar])

        if (error) {
            throw new Error("Error deleting old avatar")
        }
    }

    // Update user profile

    const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({ avatar: fileName })
        .eq('id', user.id)

    if(updateProfileError) {
        throw new Error('Error associating avatar with user')
    }

    revalidatePath(path)
}