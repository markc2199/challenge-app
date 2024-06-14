import Leaderboard from "@/app/(platform)/_components/leaderboard";
import ScoreForm from "@/app/(platform)/_components/score-form";
import ScoreModal from "@/app/(platform)/_components/score-modal";
import { fetchChallengeData, fetchChallengeItem }from "@/utils/actions/challenge-actions";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function Page({ params }) {

      // get user
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  // get challenge info
  let challenge;

  try {
    challenge = await fetchChallengeData(params.challengeId);
  } catch (error) {
    notFound();
  }

  // get challenge item info

  let challengeItem

  try {
    challengeItem = await fetchChallengeItem(params.challengeId);
  } catch (error) {
    console.log(error.message)
  }


    return (
        <div className="flex justify-center pt-10">
        <div className="w-full max-w-screen-lg space-y-4">
          <div className="col-span-2 space-y-4">
            <div>
              <h6 className="font-semibold text-4xl">{challenge[0].name}</h6>
            </div>
            <div>
              <p className="text-lg text-slate-200">{challenge[0].description}</p>
            </div>
          </div>
          {/* Flex container for "My Groups" heading and Modal */}
  
          {/* The rest of your content */}
          <ScoreModal challengeItemId={challengeItem[0]?.id}>Submit a score</ScoreModal>
          <Leaderboard challengeItemId={challengeItem[0]?.id}/>
          
        </div>
      </div>
       
    );
}