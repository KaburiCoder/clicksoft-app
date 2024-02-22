import React from "react";
import UserItem from "./user-item";
import { UserItemSkeleton } from "./user-item-skeleton";
import { PatientInfo } from "@/sockets/models/patient-info";

interface Props {
  patientInfos: PatientInfo[] | undefined;
  isPending?: boolean;
}
export default function UserItemList({ patientInfos, isPending }: Props) {
  const pinfoComponents = isPending
    ? Array(5)
      .fill(0)
      .map((_, i) => <UserItemSkeleton key={i} />)
    : patientInfos?.map((p, i) => <UserItem key={i} patientInfo={p} />);

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto">
      {pinfoComponents}
    </div>
  );
}
