'use client'

import GroupForm from "./group-form";
import Modal from "./modal";

export default function GroupModal({ children }) {

    const closeModal = (id) => {
        document.getElementById(id).close();
    };


    return (
        <Modal id="group_modal" content={<GroupForm onSuccess={() => closeModal("group_modal")}/>}>
            {children}
        </Modal>
    );
}