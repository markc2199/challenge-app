import SignOutButton from "@/app/(platform)/_components/sign-out-button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";



export default async function NavBar() {

    const supabase = createClient()
    const { data: {user}, error } = await supabase.auth.getUser()

    return (
        <div className="navbar bg-base-100 text-neutral-content flex justify-between px-11">
            <Link href="/">
                <button className="btn btn-ghost text-xl dark:text-primary text-neutral font-bold">challenger</button>
            </Link>
            
            {user && (
                <div className="navbar-end">
                <SignOutButton />
              </div>
            )}
            {!user && (
                <Link href="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
                
            )}
        </div>
    );
}