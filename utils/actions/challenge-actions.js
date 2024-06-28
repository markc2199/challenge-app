'use server'
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { challengeSchema, scoreSchema } from "../validation";

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

export async function fetchChallengeData(challengeId) {

    const supabase = createClient()

    let { data: challenge, error } = await supabase
    .from('challenge')
    .select('*')
    .eq('id', challengeId)

    if (error) {
        throw new Error("Cannot get challenge info")
    }

    if (challenge.length < 1) {
        throw new Error("Group does not exist")
    }

    return challenge

}

export async function updateScore(formData) {

    const validated = scoreSchema.safeParse(formData)

    if (!validated) {
        throw new error("Invalid data")
    }
    
    const supabase = createClient();

    const { data, error } = await supabase
    .from('scores')
    .insert([
    { 
        score: validated.data.score, 
        challenge_item_id: formData.challengeItemId },
    ])
    .select()

    if (error) {
        throw new Error(`Error updating score: ${error.message}`)
    }

    revalidatePath(`/groups/${formData.groupId}/challenges/${formData.challengeId}`)
        
}

export async function getScores(challengeItemId) {

    const supabase = createClient()

    const { data, error } = await supabase
    .rpc('get_total_scores_for_item', { challenge_item_id_arg: challengeItemId })
    .select()

    if (error) {
        throw new Error(`Cannot fetch scores: ${error.message}`)
    }

    return data

}

export async function fetchChallengeItem(challengeId) {

    const supabase = createClient()

    let { data: challengeItem, error } = await supabase
    .from('challenge_items')
    .select('*')
    .eq('challenge_id', challengeId)

    if (error) {
        throw new Error("Cannot get challenge info")
    }

    return challengeItem

}

export async function getIndividualScores(challengeItemId) {


    const supabase = createClient()

    let { data: scores, error } = await supabase
    .from('scores')
    .select("*")
    .eq('challenge_item_id', challengeItemId)
    .order('submitted_at', { ascending: true })

    if (error) {
        throw new Error("Error retrieving scores")
    }

    return scores
        


}