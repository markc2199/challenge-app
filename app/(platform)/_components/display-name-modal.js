'use client'

import DisplayNameForm from "./display-name-form";
import GhostModal from "./ghost-modal";
import Modal from "./modal";

export default function DisplayNameModal({ children }) {

    const closeModal = (id) => {
        document.getElementById(id).close();
    };


    return (
        <GhostModal id="display_name_modal" content={<DisplayNameForm onSuccess={() => closeModal("display_name_modal")}/>}>
            {children}
        </GhostModal>
    );
}