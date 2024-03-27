"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { Prescription } from "@/sockets/entities/prescription";
import OrderBox from "./boxes/order-box";
import PrescriptionBox from "./prescription-box";

export default function PrescriptionBody() {
  const { prescription } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<Prescription>({
      eventName: emitPaths.getPrescription,
      searchState: prescription,
    });

  const components = items?.map((p) => (
    <PrescriptionBox key={p.id} prescription={p} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      <div className="flex flex-col gap-4">
        {components}
        {inViewEl}
      </div>
    </SearchWrapper>
  );
}
