import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Card({ name, description, groupId }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-200 dark:bg-slate-700 rounded-lg">
            <h2 className="card-title">{name}</h2>
            
            <div className="flex justify-between">
                <p>{description}</p>
                <Link href={`/groups/${groupId}`}>
                    <button className="btn btn-square btn-md btn-accent dark:btn-primary">
                     <MoveRight />
                    </button>
                </Link>
            </div>
            
        </div>
        </div>
    );
}