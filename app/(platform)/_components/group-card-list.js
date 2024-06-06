import { fetchGroups } from "@/utils/actions/group-actions";
import GroupCard from "./group-card";

export default async function GroupCardList() {

    const groups = await fetchGroups()
    console.log(groups)


    return (
        <>
            {groups.map((group) => {
                    return (
                        <GroupCard key={group.id} name={group.name} description={group.description} />
                    )
                })
            }
      </>
    );
}