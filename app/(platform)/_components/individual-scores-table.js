import IndividualScoresTableRow from "./individual-scores-table-row";

export default async function IndividualScoresTable({ allScores, userId }) {

    // filter scores to only include user
    const filteredScores = allScores.filter((score) => {
        return score.user_id === userId
    })


    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Score</th>
        
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {filteredScores.map((score, index) => {
                    return <IndividualScoresTableRow key={index} submitted_at={score.submitted_at} score={score.score} number={index + 1}/>
                })}
                </tbody>
            </table>
</div>
    );
}