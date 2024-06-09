'use client'
import MemberInviteForm from "./member-invite-form";
import Modal from "./modal";

export default function InviteModal({ children, groupId, inviterId, groupName }) {

    const closeModal = () => {
        document.getElementById('my_modal_3').close();
    };

    return (
        <Modal content={<MemberInviteForm onSuccess={closeModal} groupId={groupId} inviterId={inviterId} groupName={groupName}/>}>
            {children}
        </Modal>
    );
}