import { createClient } from "@/utils/supabase/server";
import Notification from "./notification";
import { fetchInvites } from "@/utils/actions/group-actions";
import InviteNotification from "./invite-notification";
import Skeleton from "./skeleton";

export default async function NotificationList() {

    const supabase = createClient()

    //get current user
    const { data: {user}, error } = await supabase.auth.getUser()

    // get all pending notifications

    let invites

    try {
        invites = await fetchInvites(user)
    } catch (error) {
        console.log(error)
    }
    
    return (
        <div className="space-y-2">

            {invites.length > 0 && (
               invites.map((invite) => {
                return (
                <InviteNotification key={invite.id} inviteId={invite.id}>
                    {`You've been invited to join ${invite.group_name}`}
                </InviteNotification> 
                )
            }) 
            )}
        </div>
    );
}