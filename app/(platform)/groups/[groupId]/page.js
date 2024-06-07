import { fetchGroupData } from "@/utils/actions/group-actions";
import { notFound } from "next/navigation";
import Modal from "../../_components/modal";
import { PlusCircle } from "lucide-react";

export default async function Page({ params }) {

    let group

    try {
        group = await fetchGroupData(params.groupId)
    } catch (error) {
        notFound()
    }

    return (
        <div className="flex justify-center pt-10">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flex container for "My Groups" heading and Modal */}
        <div className="col-span-1 md:col-span-2 flex items-center justify-center space-x-8 md:justify-between">
          <h6 className="font-semibold text-xl">Challenges</h6>
          <Modal>
            <span className="hidden md:block">Create New Challenge</span>
            <PlusCircle />
          </Modal>
        </div>

        {/* The rest of your content */}
      </div>
    </div>
  );
}