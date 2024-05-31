import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

export default function SubmitButton(props) {
    const { pending } = useFormStatus()
    return (
        <button {...props} className={`${props.className} flex items-center space-x-1 justify-center`} disabled={pending}>
            {pending && <Loader className="animate-spin w-4 h-4"/>}
            <span>{props.children}</span>
        </button>
    );
}