import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function CenteredCard({ name, description, groupId }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-200 dark:bg-slate-700 rounded-lg">
            <div className="card-actions flex items-center justify-between">
            <p>{name}</p>
            <p>{description}</p>
            <Link href={`/groups/${groupId}`}>
            <button className="btn btn-square btn-sm btn-neutral dark:btn-primary">
               <MoveRight />
            </button>
            </Link>
            
            </div>
            
        </div>
        </div>
    );
}