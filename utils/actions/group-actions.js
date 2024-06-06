'use server'
import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server";
import { groupSchema } from "../validation";

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
        throw new Error("Cannot fetch groups")
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