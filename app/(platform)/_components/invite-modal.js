'use client'
import MemberInviteForm from "./member-invite-form";
import Modal from "./modal";

export default function InviteModal({ children, groupId, inviterId, groupName }) {

    const closeModal = (id) => {
        document.getElementById(id).close();
    };

    return (
        <Modal id="invite_modal" content={<MemberInviteForm onSuccess={() => closeModal("invite_modal")} groupId={groupId} inviterId={inviterId} groupName={groupName}/>}>
            {children}
        </Modal>
    );
}