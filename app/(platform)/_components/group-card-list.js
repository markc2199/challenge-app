import { fetchGroups } from "@/utils/actions/group-actions";
import GroupCard from "./group-card";
import Card from "@/components/card";

export default async function GroupCardList() {

    const groups = await fetchGroups()
    
    return (
        <>
            {groups.length < 1 && (
                <p>No groups yet. Create one now!</p>
            )}
            {groups.map((group) => {
                    return (
                        <Card key={group.id} name={group.name} description={group.description} groupId={group.id} />
                    )
                })
            }
      </>
    );
}