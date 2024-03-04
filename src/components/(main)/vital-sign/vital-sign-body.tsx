"use client";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { VitalSignBox } from "./vital-sign-box";
import { useEmit } from "@/lib/hooks/use-emit";
import { useSearchDataStore } from "@/stores/search-data.store";
import { emitPaths } from "@/paths";
import { VitalSign } from "@/sockets/models/vital-sign";

export default function VitalSignBody() {
  const { handleSearch, isPending, error } = useEmit<VitalSign>({
    eventName: emitPaths.getVitalSign,
  });
  const { vitalSign } = useSearchDataStore();

  const components = vitalSign?.data?.map((vs) => (
    <VitalSignBox key={`${vs.writeDateFullText}_${vs.managerName}`} {...vs} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={vitalSign?.dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      <div className="flex flex-col gap-2">{components}</div>
    </SearchWrapper>
  );
}
