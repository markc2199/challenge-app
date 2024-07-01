import Avatar from "@/app/(platform)/_components/avatar";
import AvatarModal from "@/app/(platform)/_components/avatar-modal";
import SignOutButton from "@/app/(platform)/_components/sign-out-button";
import { createClient } from "@/utils/supabase/server";
import { User } from "lucide-react";
import Link from "next/link";

export default async function NavBar() {

    const supabase = createClient()
    const { data: {user}, error } = await supabase.auth.getUser()

    return (
        <div className="navbar bg-base-100 text-neutral-content flex justify-between md:px-11 p-0">
            <Link className="text-left text-primary font-bold" href="/">
                <button className="btn btn-ghost text-primary text-left text-lg">challenger</button>
            </Link>
            
            {user && (
                <div className="navbar-end">
                    <div className="flex space-x-4 items-center">
                        <AvatarModal>
                            <Avatar />
                        </AvatarModal>
                        <SignOutButton />
                    </div>
              </div>
            )}
            {!user && (
                <Link href="/login">
                    <button className="btn btn-ghost text-primary text-left text-lg">Login</button>
                </Link>
            )}
        </div>
    );
}