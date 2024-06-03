import Card from "@/components/card";
import Stats from "../_components/stats";
import CenteredCard from "@/components/centered-card";
import Modal from "../_components/modal";
import Stat from "../_components/stat";
import { PlusCircle } from "lucide-react";

export default function Page() {
  return (
    <>
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2 flex space-x-4">
          <div className="flex justify-between">
            <Stat />
          </div>
          <div>
            <Stat />
          </div>
        </div>
        <div className="flex col-span-1 md:col-span-2 justify-start">
          <div>
          <Modal>
            <span>Create New Group</span>
            <PlusCircle />
          </Modal>
          </div>
        </div>
            <div className="flex justify-center">
                <CenteredCard>
                  Crossfit yoooooo
                </CenteredCard>
            </div>
            <div className="flex justify-center">
                <CenteredCard>
                  Other group
                </CenteredCard>
            </div>
            <div className="flex justify-center">
                <CenteredCard>
                  Crossfit yoooooo
                </CenteredCard>
            </div>
      </div>
    </div>
    </>
  )
}