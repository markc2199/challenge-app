import Link from "next/link";
import Badge from "./badge";

export default function ChallengeCard({ name, description, start_date, end_date, challengeId, groupId }) {

    let today = new Date()
    // Subtract 4 hours to get the time to EST (default is UTC)
    today.setHours(today.getHours() - 4)

    let endDate = new Date(end_date)
    // Add 23 hours, 59 minutes, and 59 seconds
    endDate.setHours(endDate.getHours() + 23);
    endDate.setMinutes(endDate.getMinutes() + 59);
    endDate.setSeconds(endDate.getSeconds() + 59);
    let startDate = new Date(start_date)

    let status;
    if (today > startDate && today < endDate) {
        status = 'Active'
    } else if (startDate > today) {
        status = 'Coming Soon'
    } else {
        status = 'Ended'
    }

    const statusBadge = {
        'Active': 'badge-primary badge-outline',
        'Ended': 'badge-neutral badge-outline',
        'Coming Soon': 'badge-accent badge-outline'
    }


    // check if challenge is still active
    const isActive = today < endDate

    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-600 rounded-lg flex flex-col justify-center space-y-2 px-4 md:px-12">
        
                <div className="space-y-1">
                    <div className="flex space-x-2 items-center">
                        <h2 className="card-title font-bold text-2xl">{name}</h2>
                        <Badge className={statusBadge[status]}>{status}</Badge> 
                    </div>
                    
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