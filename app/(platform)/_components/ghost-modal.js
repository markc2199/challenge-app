'use client'

export default function GhostModal({ children, content, id }) {

   
    return (    
    <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-ghost" onClick={()=>document.getElementById(id).showModal()}>{children}</button>
        <dialog id={id} className="modal">
            <div className="modal-box w-90% max-w-full md:max-w-xl md:h-auto md:rounded-lg p-0 m-0">
                
                <div className="p-4 md:p-6">
                    {content}
                </div>
                <form method="dialog" className="flex justify-center mb-4">
                {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-md btn-ghost">Close</button>
                </form>
                
            </div>
        </dialog>
    </>

    );
    
    

}