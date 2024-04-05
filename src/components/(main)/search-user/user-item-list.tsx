import React from "react";
import UserItem from "./user-item";
import { UserItemSkeleton } from "./user-item-skeleton";
import { PatientInfo } from "@/sockets/entities/patient-info";
import LottieSearch from "@/components/custom/lotties/lottie-search";

interface Props {
  patientInfos: PatientInfo[] | undefined;
  isPending?: boolean;
  bottomComponents?: React.ReactNode;
}
export default function UserItemList({
  patientInfos,
  isPending,
  bottomComponents,
}: Props) {
  const pinfoComponents = patientInfos?.map((p, i) => (
    <UserItem key={`${p.chartNo}_${i}`} patientInfo={p} />
  ));

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto px-2">
      {pinfoComponents}
      {isPending && <LottieSearch />}
      {bottomComponents}
    </div>
  );
}
