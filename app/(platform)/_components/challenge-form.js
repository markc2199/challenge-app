'use client'

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "@/utils/actions/group-actions";

export default function ChallengeForm({ onSuccess }) {

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
            console.log(data)
            onSuccess()
        } catch (error) {
            setLastError(error)
        }
    }

    return (

        <form action={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-center font-semibold pb-4">Create a Challenge</h1>
          <Input {...register("title")} name="title" id="title" placeholder="Challenge Title" type="text"/>
          <Input {...register("description")} name="description" id="description" placeholder="Description (optional)" type="text"/>
          <Input {...register("item")} name="item" id="item" placeholder="Challenge Item (i.e. push ups, miles, etc.)" type="text"/>
          <Input {...register("start")} name="start" id="start" placeholder="Start Date" type="date"/>
          <Input {...register("end")} name="end" id="end" placeholder="End Date" type="date"/>
          <button type="submit" size="sm" className="btn w-full btn-primary" disabled={isSaving}>
            Create
          </button>
          <div className="space-y-4">
            <FormError error={errors.name}/>
            <FormError error={lastError}/>
          </div>
        </form>
    
      );
}