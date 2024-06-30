'use client'

import { uploadAvatar } from "@/utils/actions/user-actions";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { anySchema, avatarSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";

export default function AvatarForm({ onSuccess }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        resolver: zodResolver(anySchema),
      })

    const [lastError, setLastError] = useState()
    const [isSaving, setSaving] = useState(false)

    const onSubmit = async (formData) => {
        try {
            setSaving(true)
            const file = formData.file[0]
            const newFormData = new FormData()
            newFormData.append('file', file)
            newFormData.append('path', path)
            await uploadAvatar(newFormData)
            onSuccess()
        } catch (error) {
            setLastError(error)
        } finally {
            setSaving(false)
        }
    }

    const path = usePathname()

    return (
        <>
            <h1 className="text-xl font-semibold mb-8">Avatar</h1>
            <form className="space-y-4" action={handleSubmit(onSubmit)}>
            <input {...register("file")}
                type="file"
                name="file"
                id="file"
                className="file-input file-input-bordered w-full max-w-xs" />
            <input type="hidden" value={path} name="path" id="path"/>
                <button type="submit" size="sm" className="btn w-full btn-primary" disabled={isSaving}>
                Upload Avatar
                </button>
                <div className="space-y-4">
                    <FormError error={errors.file}/>
                    <FormError error={lastError}/>
                </div>
            </form>
        </>
    );
}