'use client'

import Input from "@/components/input";
import { login } from "@/utils/actions/login-actions";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validation";
import FormError from "@/components/form-error";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

const [lastError, setLastError] = useState()
const [success, setSuccess] = useState()
const [isSaving, setSaving] = useState(false)
const router = useRouter()


const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setSaving(true)
    setLastError()
    setSuccess()
    try {
        await login(data)
        setSuccess('Login link sent! Please check your email.')
        // Redirect user to login success
        setTimeout(() => {
          router.push('/login-success')
        }, 2000);

    } catch (error) {
        setLastError(error)
    } finally {
        setSaving(false)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <h1>Login</h1>
      <Input {...register("email")} name="email" id="email" placeholder="Email" type="email" inputvariant="email"/>
      <button type="submit" size="sm" className="btn w-full" disabled={isSaving}>
        Sign in with email
      </button>
      <div className="space-y-4">
        <FormError error={errors.email}/>
        <FormError error={lastError}/>
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
      </div>
    </form>
    </>
  );
}