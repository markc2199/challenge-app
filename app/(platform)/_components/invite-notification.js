'use client'
import { acceptInvite } from "@/utils/actions/group-actions";

export default function InviteNotification({ children, inviteId }) {

    const handleClickAccept = async (inviteId) => {

        try {
            console.log("this is the key: ", inviteId)
            await acceptInvite(inviteId)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div role="alert" className="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{children}</span>
            <div className="space-x-4">
                <button className="btn btn-sm">Deny</button>
                <button onClick={() => handleClickAccept(inviteId)} className="btn btn-sm btn-neutral dark:btn-primary">Accept</button>
            </div>
        </div>
    );
}