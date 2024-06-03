import { MoveRight } from "lucide-react";

export default function CenteredCard({ children }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <div className="card-actions flex items-center justify-between">
            <p>{children}</p>
            <button className="btn btn-square btn-sm">
               <MoveRight />
            </button>
            </div>
            
        </div>
        </div>
    );
}