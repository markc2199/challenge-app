'use client'

import GroupForm from "./group-form";

export default function Modal({ children }) {
    return (
   <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn rounded-xl" onClick={()=>document.getElementById('my_modal_3').showModal()}>{children}</button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-lg md:max-w-xl md:h-auto p-0">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className="p-4 md:p-6">
                <GroupForm />
             </div>
        </div>
        </dialog>
</>
    );
}