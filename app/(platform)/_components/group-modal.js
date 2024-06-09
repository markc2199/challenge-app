'use client'

import GroupForm from "./group-form";
import Modal from "./modal";

export default function GroupModal({ children }) {

    const closeModal = () => {
        document.getElementById('my_modal_3').close();
    };


    return (
        <Modal content={<GroupForm onSuccess={closeModal}/>}>
            {children}
        </Modal>
    );
}