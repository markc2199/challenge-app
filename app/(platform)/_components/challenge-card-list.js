import { Suspense } from "react";
import CardSkeleton from "./card-skeleton";
import ChallengeCard from "./challenge-card";
import { fetchChallenges } from "@/utils/actions/challenge-actions";

export default async function ChallengeCardList({ groupId }) {

    // TODO make this fetch challenges
    const challenges = await fetchChallenges(groupId)

    return (
        <>
            {challenges.length < 1 && (
                <p>No challenges yet.</p>
            )}
            {challenges.map((challenge) => {
                    return (
                            <Suspense key={challenge.id} fallback={<CardSkeleton />}>
                                <ChallengeCard challengeId={challenge.id} name={challenge.name} description={challenge.description} start_date={challenge.start_date} end_date={challenge.end_date} groupId={groupId}/>
                            </Suspense>
                    )
                })
            }
      </>
    );
}