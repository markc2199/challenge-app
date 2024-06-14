import Link from "next/link";

export default function ChallengeCard({ name, description, start_date, end_date, challengeId, groupId }) {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-600 rounded-lg flex flex-col justify-center space-y-2 px-24">
        
                <div className="space-y-1">
                    <h2 className="card-title font-bold text-2xl">{name}</h2> 
                    <p className="text-lg">{description}</p>
                </div>

                <div>
                    <p className="text-lg">{`Begins: ${start_date}`}</p>
                    <p className="text-lg">{`Ends: ${end_date}`}</p>
                </div>

            <div className="flex justify-center w-full">
                <Link className="w-full" href={`/groups/${groupId}/challenges/${challengeId}`}>
                    <button className="btn btn-primary w-full">
                     Leaderboard
                    </button>
                </Link>
            </div>
            
        </div>
        </div>
    );
}