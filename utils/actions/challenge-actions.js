'use server'
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { challengeSchema } from "../validation";

export async function createChallenge(formData, groupId) {

    const validated = challengeSchema.safeParse(formData)

    if (!validated) {
        throw new Error("Invalid Data")
    }

    // validate start date is greater than or equal to today
    const today = new Date()
    const startDate = new Date(validated.data.start)

    if (today > startDate) {
        throw new Error("Start date cannot be in the past")
    }

    // TODO validate the end date is greater than the start date
    const endDate = new Date(validated.data.end)

    if (startDate > endDate) {
        throw new Error("End date cannot be before start date")
    }

    // get current user

    const supabase = createClient()

    const { data: {user}, error: userError } = await supabase.auth.getUser()

    // create the challenge and challenge item

        // Call the Supabase function
        const { data: result, error: insertError } = await supabase
        .rpc('create_challenge_with_items', {
            _name: validated.data.title,
            _description: validated.data.description,
            _start_date: validated.data.start,
            _end_date: validated.data.end,
            _created_by: user.id,
            _item_name: validated.data.item,
            _group_id: groupId,  // Ensure groupId is included in formData
        });

    if (insertError) {
        throw new Error(`Error creating challenge and item: ${insertError.message}`);
    }

    revalidatePath(`/groups/${groupId}`)

}

export async function fetchChallenges(groupId) {

    const supabase = createClient()

    // fetch challenges that belong to the group
     
    let { data: challenges, error } = await supabase
    .from('challenge')
    .select('*')
    .eq('group_id', groupId)

    if (error) {
        throw new Error("Error fetching challenges")
    }
        
    return challenges;

}