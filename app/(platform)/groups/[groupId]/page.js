import { fetchGroupData } from "@/utils/actions/group-actions";
import { notFound } from "next/navigation";
import Modal from "../../_components/group-modal";
import { PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import InviteModal from "../../_components/invite-modal";

export default async function Page({ params }) {

    //get user

    const supabase = createClient()

    const { data: {user}, error } = await supabase.auth.getUser()

    // get group info

    let group

    try {
        group = await fetchGroupData(params.groupId)
    } catch (error) {
        notFound()
    }

    return (
      <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 space-y-4">
          <div>
            <h6 className="font-semibold text-4xl">{group[0].name}</h6>
          </div>
          <div className="pl-2">
            <p className="text-lg text-slate-200">{group[0].description}</p>
          </div>
        </div>
        {/* Flex container for "My Groups" heading and Modal */}
        <div className="col-span-1 md:col-span-2 flex items-center space-x-8 justify-between pt-4 px-6">
          <h6 className="font-bold text-2xl">Challenges</h6>
          {group[0].created_by === user.id && (
            <div className="flex items-center space-x-4">
              <div>
                <InviteModal groupName={group[0].name} groupId={group[0].id} inviterId={user.id}>
                <span className="hidden md:block">Invite Members</span>
                <PlusCircle />
              </InviteModal>
              </div>

              <div>
                <Modal>
                <span className="hidden md:block">Create New Challenge</span>
                <PlusCircle />
              </Modal>
              </div>

              
            </div>
            
          
          )}
          
        </div>

        {/* The rest of your content */}
      </div>
    </div>
  );
}