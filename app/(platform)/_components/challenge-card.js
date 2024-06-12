import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function ChallengeCard({ name, description, groupId }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-600 rounded-lg">
            <h2 className="card-title font-bold">{name}</h2>
            
            <div className="flex justify-between">
                <p>{description}</p>
                <Link href={``}>
                    <button className="btn btn-square btn-md btn-primary">
                     Leaderboard
                    </button>
                </Link>
            </div>
            
        </div>
        </div>
    );
}