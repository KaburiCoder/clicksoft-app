"use client";
import React from "react";
import { UserRoundSearch } from "lucide-react";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import HeaderButton from "@/components/custom/header-button";
import usePatientStore from "@/stores/patient.store";
import { Badge } from "@/components/ui/badge";

export default function SearchUserButton() {
  const { push } = useRouter();
  const { patInfo } = usePatientStore();
  function handleCllick(): void {
    push(paths.searchUser);
  }

  if (patInfo) {
    return (
      <div
        className="h-header-item header-item-border flex flex-col items-center px-1 py-0.5 text-sm hover:cursor-pointer hover:bg-secondary"
        onClick={handleCllick}
      >
        <div className="flex items-center gap-2">
          {patInfo.suName}
          <Badge>{patInfo.yuhyungName}</Badge>
        </div>
        <div>{`(${patInfo.chartNo})`}</div>
      </div>
    );
  }

  return (
    <HeaderButton onClick={handleCllick}>
      <UserRoundSearch />
    </HeaderButton>
  );
}
