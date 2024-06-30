'use client'

import AvatarForm from "./avatar-form";
import GhostModal from "./ghost-modal";

export default function AvatarModal({ children }) {

    const closeModal = (id) => {
        document.getElementById(id).close();
    };


    return (
        <GhostModal id="avatar-modal" content={<AvatarForm onSuccess={() => closeModal("avatar-modal")}/>}>
            {children}
        </GhostModal>
    );
}