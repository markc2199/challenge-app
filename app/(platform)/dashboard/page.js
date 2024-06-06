import Card from "@/components/card";
import Stats from "../_components/stats";
import CenteredCard from "@/components/centered-card";
import Modal from "../_components/modal";
import Stat from "../_components/stat";
import { PlusCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flex container for "My Groups" heading and Modal */}
        <div className="col-span-1 md:col-span-2 flex items-center justify-between px-6">
          <h6 className="font-semibold">My Groups</h6>
          <Modal>
            <span className="hidden md:block">Create New Group</span>
            <PlusCircle />
          </Modal>
        </div>

        {/* The rest of your content */}
        <div className="flex justify-center">
          <CenteredCard>Crossfit yoooooo</CenteredCard>
        </div>
        <div className="flex justify-center">
          <CenteredCard>Other group</CenteredCard>
        </div>
        <div className="flex justify-center">
          <CenteredCard>Crossfit yoooooo</CenteredCard>
        </div>
      </div>
    </div>
  );
}