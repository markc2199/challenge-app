'use client'
import { acceptInvite, declineInvite } from "@/utils/actions/group-actions";
import { useState } from "react";

export default function InviteNotification({ children, inviteId }) {

    const [isSaving, setSaving] = useState(false)

    const handleClickAccept = async (inviteId) => {

        try {
            setSaving(true)
            await acceptInvite(inviteId)
        } catch (error) {
            console.log(error)
            setSaving(false)
        }

    }

    const handleClickDecline = async (inviteId) => {

        try {
            setSaving(true)
            await declineInvite(inviteId)
        } catch (error) {
            console.log(error)
            setSaving(false)
        } 

    }

    return (
        <div role="alert" className="alert md:flex md:justify-between">
            <div className="flex space-x-1">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{children}</span> 
            </div>
            
            <div className="space-x-4">
                <button onClick={() => handleClickDecline(inviteId)} disabled={isSaving} className="btn btn-sm">Deny</button>
                <button onClick={() => handleClickAccept(inviteId)} disabled={isSaving} className="btn btn-sm btn-neutral dark:btn-primary">Accept</button>
            </div>
        </div>
    );
}