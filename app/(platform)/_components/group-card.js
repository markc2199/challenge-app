import CenteredCard from "@/components/centered-card";
import { decodeFormState } from "next/dist/server/app-render/entry-base";

export default function GroupCard({ name, description, groupId }) {
    return (
        <div className="flex justify-center">
          <CenteredCard name={name} description={description} groupId={groupId}/>
        </div>
    );
}