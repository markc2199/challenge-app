import { User } from "lucide-react";

export default function LeaderboardRow({ name, email, totalScore }) {
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
            {totalScore}
          </td>
          <td className="hidden md:table-cell">6/23/2024</td>
          <th>
            <button className="hidden md:table-cell btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
   
    );
}