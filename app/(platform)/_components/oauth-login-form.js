'use client'
import { createBrowserClient } from '@supabase/ssr'


export default function OAuthLoginForm() {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const socialLogin = async (provider) => {
        supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
        
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => socialLogin('google')}>
                Login with google
            </button>
        </div>
    );
}