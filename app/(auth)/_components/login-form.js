'use client'

import { useState } from 'react';
import Input from "@/components/input";
import { login } from "@/utils/actions/login-actions";

export default function LoginForm() {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h1>Login</h1>
      <Input value={email} onChange={handleInputChange} />
      <button type="submit" size="sm" className="btn w-full">
        Sign in with email
      </button>
    </form>
  );
}