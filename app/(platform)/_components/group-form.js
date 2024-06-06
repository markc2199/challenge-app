'use client'

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "@/utils/actions/group-actions";

export default function GroupForm({ onSuccess }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        resolver: zodResolver(groupSchema),
      })

    const [lastError, setLastError] = useState()
    const [isSaving, setSaving] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            await createGroup(data)
            onSuccess()
        } catch (error) {
            setLastError(error)
        }
    }

    return (

        <form action={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-center font-semibold pb-4">Create a Group</h1>
          <Input {...register("name")} name="name" id="name" placeholder="Group Name" type="text"/>
          <Input {...register("description")} name="description" id="description" placeholder="Description (optional)" type="description"/>
          <button type="submit" size="sm" className="btn w-full" disabled={isSaving}>
            Create
          </button>
          <div className="space-y-4">
            <FormError error={errors.name}/>
            <FormError error={lastError}/>
          </div>
        </form>
    
      );
}