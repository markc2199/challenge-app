import Avatar from "@/app/(platform)/_components/avatar";
import AvatarModal from "@/app/(platform)/_components/avatar-modal";
import SignOutButton from "@/app/(platform)/_components/sign-out-button";
import { createClient } from "@/utils/supabase/server";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function NavBar() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <div className="navbar bg-base-100 text-neutral-content flex justify-between md:px-11 p-0">
      <div className="flex items-center space-x-1">
        <Link href="/">
          <button className="btn btn-ghost text-primary text-left text-lg p-0 md:px-4">
            <span className="flex items-center">
              <Image className="rounded-full" src="/logo/v2-challenger-logo.png" width={25} height={25} alt="challenger logo" />
              <div className="ml-2">challenger</div>
            </span>
          </button>
        </Link>
      </div>

      {user && (
        <div className="navbar-end">
          <div className="flex space-x-4 items-center">
            <a target="_blank" href='https://insigh.to/b/challenger'>
                <button className="btn btn-ghost">
                    Feedback?
                </button>
            </a>
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