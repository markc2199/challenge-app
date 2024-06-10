import { MoveRight } from "lucide-react";
import Link from "next/link";
import Skeleton from "./skeleton";

export default function CardSkeleton() {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body bg-slate-200 dark:bg-slate-700 rounded-lg space-y-8">
            <Skeleton />
            <Skeleton />
        </div>
        </div>
    );
}