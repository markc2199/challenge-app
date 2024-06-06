import { fetchGroupData } from "@/utils/actions/group-actions";
import { notFound } from "next/navigation";

export default async function Page({ params }) {

    let group

    try {
        group = await fetchGroupData(params.groupId)
    } catch (error) {
        notFound()
    }

    return (
        <div>yoooooo {group[0]?.name}</div>
    );
}