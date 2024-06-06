import { fetchGroups } from "@/utils/actions/group-actions";
import GroupCard from "./group-card";

export default async function GroupCardList() {

    const groups = await fetchGroups()
    
    return (
        <>
            {groups.length < 1 && (
                <p>No groups yet. Create one now!</p>
            )}
            {groups.map((group) => {
                    return (
                        <GroupCard key={group.id} name={group.name} description={group.description} />
                    )
                })
            }
      </>
    );
}