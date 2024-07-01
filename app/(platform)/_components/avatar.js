import { createClient } from "@/utils/supabase/server";
import { User } from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width = 32, height = 32, user_id }) {

    // Get user

    // Signed URL - 5 minutes

    // <Image> configure to accept supabase domain

    // Display the default if no avatar

    const supabase = createClient()

    // if a user is not specified, just get the avatar for the current user
    const {data: {user}} = await supabase.auth.getUser()

    let userId = user_id ?? user.id
    
    let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)

    const {data: imageData, error} = await supabase.storage
        .from('avatars')
        .createSignedUrl(profile[0].avatar, 60 * 60 * 24)

    if (error) {
        return <User />
    }

    //return <Image src={imageData.signedUrl} width={width} height={height} alt='user avatar' className="rounded-lg"/>

    return (
        <div className="avatar flex items-center justify-center">
            <div className="rounded-full flex items-center justify-center">
                <Image src={imageData.signedUrl} width={width} height={height} alt='user avatar' className="rounded-lg"/>
            </div>
        </div>
    )

}