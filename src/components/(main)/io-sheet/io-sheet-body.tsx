"use client";
import React, { useEffect, useRef } from "react";
import SearchWrapper from "../search-wrapper";
import IOSheetTable from "./table/io-sheet-table";
import { useEmit } from "@/lib/hooks/use-emit";
import { IOSheet } from "@/sockets/models/io-sheet";
import { emitPaths } from "@/paths";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function IOSheetBody() {
  const { ioSheet } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<IOSheet>({
      eventName: emitPaths.getIOSheet,
      searchState: ioSheet,
    });

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      <div className="overflow-auto">
        <IOSheetTable data={items} />
        {inViewEl}
      </div>
    </SearchWrapper>
  );
}
