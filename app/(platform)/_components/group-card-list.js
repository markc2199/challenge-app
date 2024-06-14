import { fetchGroups } from "@/utils/actions/group-actions";
import GroupCard from "./group-card";
import Card from "@/components/card";
import { Suspense } from "react";
import CardSkeleton from "./card-skeleton";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default async function GroupCardList() {

    const groups = await fetchGroups()
    
    return (
        <>
            {groups.length < 1 && (
                <p>No groups yet. Create one now!</p>
            )}
            {groups.map((group) => {
                    return (
                            <Suspense key={group.id} fallback={<CardSkeleton />}>
                                <Card name={group.name} description={group.description} groupId={group.id}/>
                            </Suspense>
                    )
                })
            }
      </>
    );
}