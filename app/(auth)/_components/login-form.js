'use client'

import { useState } from 'react';
import Input from "@/components/input";
import { login } from "@/utils/actions/login-actions";
import { useFormState } from "react-dom";

const initialState = {
    message: '',
    error: false
}

export default function LoginForm() {

const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <h1>Login</h1>
      <Input name="email" type="email"/>
      <button type="submit" size="sm" className="btn w-full">
        Sign in with email
      </button>
      <p className={`${state?.error ? 'text-red-500' : 'text-green-500'}`}>
            {state?.message}
        </p>
    </form>
  );
}