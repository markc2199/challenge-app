'use client'

import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scoreSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateScore } from "@/utils/actions/challenge-actions";

export default function ScoreForm({ onSuccess, challengeItemId }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "onTouched",
        resolver: zodResolver(scoreSchema),
      })

    const [lastError, setLastError] = useState()
    const [isSaving, setSaving] = useState(false)
    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            setSaving(true)
            data.challengeItemId = challengeItemId
            await updateScore(data)
            onSuccess()
        } catch (error) {
            setLastError(error)
        } finally {
            setSaving(false)
        }
    }


    return (

        <form action={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-center font-semibold pb-4">Update Score</h1>
          <p>Updating your score will add to your current score.</p>
          <Input {...register("score")} name="score" id="score" placeholder="Score" type="number"/>
          <button type="submit" size="sm" className="btn w-full btn-primary" disabled={isSaving}>
            Submit
          </button>
          <div className="space-y-4">
            <FormError error={errors.score}/>
            <FormError error={lastError}/>
          </div>
        </form>
    
      );
}