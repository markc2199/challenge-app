import { PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { fetchGroups } from "@/utils/actions/group-actions";
import GroupCardList from "../_components/group-card-list";
import GroupModal from "../_components/group-modal";
import NotificationList from "../_components/notification-list";
import { getProfile } from "@/utils/actions/login-actions";

export default async function Page() {

  const supabase = createClient()

  const { data: {user}, error } = await supabase.auth.getUser()

  const profile = await getProfile(user)


  try {
    const groups = await fetchGroups()
  } catch(error) {
    console.log(error)
  }


  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <div className="flex space-x-4">
            <div className="text-4xl">
              👋
            </div>
            <h6 className="font-semibold text-3xl md:text-4xl">{`Welcome, ${profile[0].display_name ?? user.email}`}</h6>
          </div>
          <div>
            <NotificationList />
          </div>
        </div>
        {/* Flex container for "My Groups" heading and Modal */}
        <div className="col-span-1 md:col-span-2 flex items-center space-x-8 justify-between pt-4 px-6">
          <h6 className="font-bold text-2xl">My Groups</h6>
          <div>
            <GroupModal>
            <span className="hidden md:block">Create New Group</span>
            <PlusCircle />
          </GroupModal>
          </div>
          
        </div>

        {/* The rest of your content */}
  
          <GroupCardList />
        
        
      </div>
    </div>
  );
}