import { User } from "lucide-react";
import IndividualScoresModal from "./individual-scores-modal";

export default function LeaderboardRow({ userId, name, email, totalScore, challengeItem, allScores }) {
    return (
       
        <tr>
          <td>
            <div className="flex items-center gap-3">
              {/* <div className="avatar">
                <div className="mask mask-squircle md:w-12 md:h-12 w-8 h-8">
                  <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div> */}
              <div className="flex space-x-2 items-center justify-center">
                <div className="md:w-12 md:h-12 w-8 h-8"><User /></div>
                <div className="font-bold items-center">{name ?? email}</div>
              </div>
            </div>
          </td>
          <td>
            <IndividualScoresModal userId={userId} challengeItem={challengeItem} allScores={allScores}>
              {totalScore}
            </IndividualScoresModal>
            
          </td>
        </tr>
   
    );
}