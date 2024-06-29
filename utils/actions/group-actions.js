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
        throw new Error(`Cannot fetch groups ${error}`)
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

    // check if user exists with this email

    const supabase = createClient()

    let { data: validatedEmail, error: emailError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)

    if(emailError) {
        throw new error(`Error during validation: ${emailError}`)
    }

    if (validatedEmail.length < 1) {
        throw new Error(`No user exists with email ${email}`)
    }


    // get user ID based on email
   
   
    let { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

    const user_id = profile.id

    // check if user is already in the group
    let { data: groupData, error: groupError } = await supabase
    .from('group_memberships')
    .select('*')
    .eq('group_id', groupId)
    .eq('user_id', user_id)

    if (groupData.length > 0) {
        throw new Error(`${email} is already in this group`)
    }

    // check if there is already a pending invite for this user
    let { data: invite, error: inviteError } = await supabase
    .from('invites')
    .select('*')
    .eq('group_id', groupId)
    .eq('user_id', user_id)
    .eq('invite_status', 'pending')

    if (invite.length > 0) {
        throw new Error(`${email} has already been invited`)
    }
    
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
        throw new Error(`Error accepting the invite: ${error.message}`)
    }

    revalidatePath('/dashboard')

    //once the status is updated to accepted, a supabase trigger adds a record in group_membership table
        
}

export async function declineInvite(inviteId) {

    const supabase = createClient()


        // update invite to declined

        const { data, error } = await supabase
        .from('invites')
        .update({ invite_status: 'rejected' })
        .eq('id', inviteId)
        .select()

        if (error) {
            throw new Error(`Error declining invite: ${error.message}`)
        }

        revalidatePath('/dashboard')
        
}

export async function checkGroupMembership(userId, groupId) {

    const supabase = createClient()

    const { data, error } = await supabase
    .from('group_memberships')
    .select('role')
    .eq('user_id', userId)
    .eq('group_id', groupId)

    if (error) {
        throw new Error(`Error checking group membership: ${error}`)
    }

    return data

}