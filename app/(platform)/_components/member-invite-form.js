'use client'

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InviteMember, createGroup } from "@/utils/actions/group-actions";

export default function MemberInviteForm({ onSuccess, groupId, inviterId, groupName }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        resolver: zodResolver(inviteSchema),
      })

    const [lastError, setLastError] = useState()
    const [isSaving, setSaving] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            setSaving(true)
            await InviteMember(data, groupId, inviterId, groupName)
            onSuccess()
        } catch (error) {
            setLastError(error)
        } finally {
          setSaving(false)
        }
    }

    return (

        <form action={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-center font-semibold pb-4">Invite a new member</h1>
          <Input {...register("email")} name="email" id="email" placeholder="User Email" type="email"/>
          <button type="submit" size="sm" className="btn w-full dark:btn-primary btn-neutral" disabled={isSaving}>
            Send Invite
          </button>
          <div className="space-y-4">
            <FormError error={errors.name}/>
            <FormError error={lastError}/>
          </div>
        </form>
    
      );
}