import SignOutButton from "@/app/(platform)/_components/sign-out-button";
import { createClient } from "@/utils/supabase/server";



export default async function NavBar() {

    const supabase = createClient()
    const { data: {user}, error } = await supabase.auth.getUser()

    return (
        <div className="navbar bg-base-100 text-neutral-content flex justify-between px-11">
            <button className="btn btn-ghost text-xl dark:text-primary text-neutral font-bold">challenger</button>
            {user && (
                <div className="navbar-end">
                <SignOutButton />
              </div>
            )}
            {!user && (
                <button className="btn btn-primary">Login</button>
            )}
        </div>
    );
}