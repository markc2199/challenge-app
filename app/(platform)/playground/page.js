import CardSkeleton from "../_components/card-skeleton";
import Leaderboard from "../_components/leaderboard";

export default function Page() {
    return (
        <div>
            <CardSkeleton />
            <div className="flex justify-center mx-0">
                <Leaderboard/>
            </div>
            
        </div>
    );
}