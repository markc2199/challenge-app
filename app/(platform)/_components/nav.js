import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/utils/actions/login-actions";
import SignOutButton from "./sign-out-button";

export default async function Nav() {

    const supabase = createClient()
    const { data: {user}, error } = await supabase.auth.getUser()

    return (
        <div className="navbar bg-base-100">
  
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">challenger</a>
  </div>
  {user && (
    <div className="navbar-end">
    <SignOutButton />
  </div>
  )}
</div>
    )

}