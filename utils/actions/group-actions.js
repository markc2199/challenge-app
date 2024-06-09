'use server'
import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server";
import { groupSchema, inviteSchema } from "../validation";

export async function createGroup(formData) {

    // validate the data

    const validated = groupSchema.safeParse(formData)

    if (!validated.success) {
        throw new Error("Invalid data")
    }

    const name = validated.data.name
    const description = validated.data.description

    // create the group

    const supabase = createClient()
    
    const { data, error } = await supabase
    .from('groups')
    .insert([
    { 
        name: name, 
        description: description
    },
    ])
    .select()
        

    if (error) {
        throw new Error(error)
    }

    // create the group_membership with the creator as an owner

    const { data: groupMemebershipData, error: groupMembershipError } = await supabase
    .from('group_memberships')
    .insert([
    { 
        group_id: data[0].id, 
        user_id: data[0].created_by,
        role: 'owner'
    },
    ])
    .select()

    if (groupMembershipError) {
        throw new Error("Error assigning group membership")
    }

    revalidatePath('/dashboard')
        
}

export async function fetchGroups() {

    const supabase = createClient()

    let { data: groups, error } = await supabase
    .from('groups')
    .select('*')

    if (error) {
        console.log(error)
        //throw new Error("Cannot fetch groups")
    }

    return groups;
        
}

export async function fetchGroupData(groupId) {

    const supabase = createClient()

    let { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)

    if (error) {
        throw new Error("Cannot get group info")
    }

    if (group.length < 1) {
        throw new Error("Group does not exist")
    }

    return group
}

export async function InviteMember(formData, groupId, inviterId, groupName) {

    // validate the data

    const validated = inviteSchema.safeParse(formData)

    if (!validated.success) {
        throw new Error("Invalid data")
    }

    const email = validated.data.email

    // get user ID based on email
    const supabase = createClient()
    

   
    let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

    const user_id = profile.id
    
    // create the invite record


    const { data, error } = await supabase
    .from('invites')
    .insert([
    { 
        group_name: groupName,
        group_id: groupId,
        inviter_id: inviterId,
        invite_status: 'pending',
        email: email,
        user_id
    },
    ])
    .select()

    if (error) {
        throw new Error("Error inviting user")
    }
        
}

export async function fetchInvites(user) {

    const supabase = createClient()

    let { data: invites, error: inviteError } = await supabase
    .from('invites')
    .select('*')
    .eq('invite_status', 'pending')
    .eq('email', user.email)

    if (inviteError) {
        console.log(error)
    }

    return invites
}

export async function acceptInvite(inviteId) {

    const supabase = createClient()

    // update invite to accepted

    const { data, error } = await supabase
    .from('invites')
    .update({ invite_status: 'accepted' })
    .eq('id', inviteId)
    .select()

    if (error) {
        throw new Error("Error accepting invite: ", error)
    }

    revalidatePath('/dashboard')

    //once the status is updated to accepted, a supabase trigger adds a record in group_membership table
        


}