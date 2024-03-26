"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { Prescription } from "@/sockets/entities/prescription";
import PrescriptionTable from "./table/prescription-table";

export default function PrescriptionBody() {
  const { prescription } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<Prescription>({
      eventName: emitPaths.getPrescription,
      searchState: prescription,
      defaultCount: 50,
    });

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      <div className="overflow-auto">
        <PrescriptionTable data={items} />
        {inViewEl}
      </div>
    </SearchWrapper>
  );
}
