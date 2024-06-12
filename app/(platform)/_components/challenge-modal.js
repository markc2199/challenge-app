'use client'
import ChallengeForm from "./challenge-form";
import Modal from "./modal";

export default function ChallengeModal({ children, groupId }) {

    const closeModal = (id) => {
        document.getElementById(id).close();
    };

    return (
        <Modal id="challenge_modal" content={<ChallengeForm groupId={groupId} onSuccess={() => closeModal("challenge_modal")}/>}>
            {children}
        </Modal>
    );
}