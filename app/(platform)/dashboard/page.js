import Card from "@/components/card";
import Stats from "../_components/stats";

export default function Page() {
  return (
    <>
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        <div className="col-span-1 md:col-span-2 flex justify-center">
         <Stats />
        </div>
            <div className="flex justify-center">
                <Card />
            </div>
            <div className="flex justify-center">
                <Card />
            </div>
            <div className="flex justify-center">
                <Card />
            </div>
      </div>
    </div>
    </>
  )
}