import GhostModal from "./ghost-modal";
import IndividualScoresTable from "./individual-scores-table";

export default function IndividualScoresModal({ children, userId, allScores }) {

    return (
        <GhostModal id={userId} content={<IndividualScoresTable allScores={allScores} userId={userId}/>}>
            {children}
        </GhostModal>
    );
}