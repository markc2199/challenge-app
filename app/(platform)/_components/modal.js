'use client'

export default function Modal({ children, content }) {

   
    return (    
    <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn rounded-xl btn-accent dark:btn-primary" onClick={()=>document.getElementById('my_modal_3').showModal()}>{children}</button>
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box w-full max-w-full md:max-w-xl md:h-auto md:rounded-lg p-0 m-0">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="p-4 md:p-6">
                    {content}
                </div>
                
            </div>
        </dialog>
    </>

    );
    
    

}