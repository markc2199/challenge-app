'use client'
import ChallengeForm from "./challenge-form";
import Modal from "./modal";
import ScoreForm from "./score-form";

export default function ScoreModal({ children, challengeItemId, challengeId, groupId }) {

    const closeModal = (id) => {
        document.getElementById(id).close();
    };

    return (
        <Modal id="score_modal" content={<ScoreForm challengeId={challengeId} groupId={groupId} challengeItemId={challengeItemId} onSuccess={() => closeModal("score_modal")}/>}>
            {children}
        </Modal>
    );
}