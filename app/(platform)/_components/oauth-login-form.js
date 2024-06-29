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
        <div className='flex flex-col items-center space-y-4'>
            <button className="btn btn-neutral bg-slate-100 text-black hover:bg-slate-300" onClick={() => socialLogin('google')}>
                <img src='/icons/ios_neutral_sq_na@3x.png' height={30} width={30}/>
                <span>
                    Login with Google
                </span>
            </button>
            <button className="btn btn-neutral bg-slate-900 text-white hover:bg-slate-700" onClick={() => socialLogin('github')}>
                <img src='/icons/github-mark-white.png' height={25} width={25}/>
                <span>
                    Login with Github
                </span>
            </button>
        </div>
    );
}