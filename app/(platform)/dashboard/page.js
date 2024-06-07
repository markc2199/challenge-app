import Card from "@/components/card";
import Stats from "../_components/stats";
import CenteredCard from "@/components/centered-card";
import Modal from "../_components/modal";
import Stat from "../_components/stat";
import { PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { fetchGroups } from "@/utils/actions/group-actions";
import GroupCardList from "../_components/group-card-list";

export default async function Page() {

  const supabase = createClient()

  const { data: {user}, error } = await supabase.auth.getUser()

  try {
    const groups = await fetchGroups()
  } catch(error) {
    console.log(error)
  }

  return (
    <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-8 gap-8">
        <div className="col-span-8 md:col-span-2 border-2 border-neutral rounded-lg">
          
          <h6 className="font-semibold text-xl text-center">Profile</h6>

          <div className="pt-8 px-2">
            <p>Display Name:</p>
            <p></p>
            <p>Email:</p>
            <p>{user.email}</p>
            <p>user stuffuser stuffuser stuffuser stuff</p>
            <p>user stuff</p>
            <p>user stuff</p>

          </div>
         
        </div>
        <div className="col-span-8 md:col-span-6">
        <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flex container for "My Groups" heading and Modal */}
        <div className="col-span-1 md:col-span-2 flex justify-center space-x-8 md:justify-between">
          <h6 className="font-semibold text-xl">My Groups</h6>
          <Modal>
            <span className="hidden md:block">Create New Group</span>
            <PlusCircle />
          </Modal>
        </div>

        {/* The rest of your content */}
        <GroupCardList />
      </div>
    </div>
        </div>

      </div>
      
  );
}