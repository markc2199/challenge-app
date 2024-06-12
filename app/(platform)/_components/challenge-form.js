'use client'

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { challengeSchema, groupSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createChallenge from "@/utils/actions/challenge-actions";

export default function ChallengeForm({ onSuccess, groupId }) {


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        resolver: zodResolver(challengeSchema),
      })

    const [lastError, setLastError] = useState()
    const [isSaving, setSaving] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            setSaving(true)
            data.groupId = groupId
            await createChallenge(data, groupId)
            onSuccess()
        } catch (error) {
            setLastError(error)
        } finally {
          setSaving(false)
        }
    }

    return (

        <form action={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-center font-semibold pb-4">Create a Challenge</h1>
          <div className="space-y-2">
            <Input {...register("title")} name="title" id="title" placeholder="Challenge Title" type="text"/>
            <FormError error={errors.title}/>
          </div>
          <div className="space-y-2">
            <Input {...register("description")} name="description" id="description" placeholder="Description (optional)" type="text"/>
            <FormError error={errors.description}/>
          </div>
          <div className="space-y-2">
            <Input {...register("item")} name="item" id="item" placeholder="Challenge Item (i.e. push ups, miles, etc.)" type="text"/>
            <FormError error={errors.item}/>
          </div>
          <div className="space-y-2">
            <Input {...register("start")} name="start" id="start" placeholder="Start Date" type="date"/>
            <FormError error={errors.start}/>
          </div>
          <div className="space-y-2">
            <Input {...register("end")} name="end" id="end" placeholder="End Date" type="date"/>
            <FormError error={errors.end}/>
          </div>
          
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