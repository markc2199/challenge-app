import { getIndividualScores, getScores } from "@/utils/actions/challenge-actions";
import LeaderboardRow from "./leaderboard-row";

export default async function Leaderboard({ challengeItemId, challengeItemUnit }) {


    // get users and total scores
    
    let scores
    try {
        scores = await getScores(challengeItemId)
    } catch (error) {
        console.log(error.message)
    }

    // get all the individual scores for this challenge item
    let allScores
    try {
      allScores = await getIndividualScores(challengeItemId)
    } catch (error) {
      console.log(error.message)
    }

    return (
        <>
        {scores.length > 0 && (
            <div className="overflow-x-auto w-full max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto">
  <table className="table w-full rounded-lg overflow-hidden bg-slate-800">
    {/* head */}
    <thead className="bg-primary text-slate-800">
      <tr>
        <th>Name</th>
        <th>{challengeItemUnit}</th>
      </tr>
    </thead>
    <tbody>
    {scores.map((score) => {
        return <LeaderboardRow key={score.user_id} userId={score.user_id} name={score.display_name} email={score.email} totalScore={score.total_score} challengeItem={challengeItemId} allScores={allScores}/>
    })}
    </tbody>
    {/* foot */}
  </table>
</div>
        )}
        {scores.length < 1 && (
            <p>No scores, yet. Be the first!</p>
        )}
        
        </>
        
    );
}