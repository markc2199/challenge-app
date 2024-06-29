import Badge from "@/app/(platform)/_components/badge";
import { checkGroupMembership } from "@/utils/actions/group-actions";
import { createClient } from "@/utils/supabase/server";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default async function Card({ name, description, groupId }) {

    // get current user
    const supabase = createClient()
    const { data: {user}, error } = await supabase.auth.getUser()

    // get current user's group role
    let role
    try {
        role = await checkGroupMembership(user.id, groupId)
    } catch(error) {
        console.log(error)
    }

    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-600 rounded-lg">
            <div className="flex items-center space-x-2">
               <h2 className="card-title font-bold">{name}</h2>
               {role[0]?.role === 'owner' && (
                <Badge>Owner</Badge>
               )}    
            </div>
    
            <div className="flex justify-between">
                <p>{description}</p>
                <Link href={`/groups/${groupId}`}>
                    <button className="btn btn-square btn-md btn-primary">
                     <MoveRight />
                    </button>
                </Link>
            </div>
            
        </div>
        </div>
    );
}