'use client'

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { displayNameSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateDisplayName } from "@/utils/actions/user-actions";

export default function DisplayNameForm({ onSuccess, displayName}) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        resolver: zodResolver(displayNameSchema),
      })

    const [lastError, setLastError] = useState()
    const [isSaving, setSaving] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            setSaving(true)
            await updateDisplayName(data)
            onSuccess()
        } catch (error) {
            setLastError(error)
        } finally {
          setSaving(false)
        }
    }

    return (

        <form action={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-center font-semibold pb-4">Update Display Name</h1>
          <Input {...register("display_name")} name="display_name" id="display_name" placeholder="Display Name" type="display_name"/>
          <button type="submit" size="sm" className="btn w-full btn-primary" disabled={isSaving}>
            Update
          </button>
          <div className="space-y-4">
            <FormError error={errors.display_name}/>
            <FormError error={lastError}/>
          </div>
        </form>
    
      );
}