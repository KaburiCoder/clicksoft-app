"use client";
import React, { useEffect, useRef } from "react";
import SearchWrapper from "../search-wrapper";
import IOSheetTable from "./table/io-sheet-table";
import { useEmit } from "@/lib/hooks/use-emit";
import { IOSheet } from "@/sockets/models/io-sheet";
import { emitPaths } from "@/paths";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function IOSheetBody() {
  const { handleSearch, isPending, error } = useEmit<IOSheet>({
    eventName: emitPaths.getIOSheet,
  });
  const divRef = useRef<HTMLDivElement>(null);
  const { ioSheet } = useSearchDataStore();

  useEffect(() => {
    function handleScrollChange(this: HTMLDivElement, e: Event) {
      console.log("this.scrollTop", this.scrollTop);
    }

    divRef.current?.addEventListener("scroll", handleScrollChange);

    return () => { };
  }, [divRef]);
  return (
    <SearchWrapper
      defaultDateRange={undefined}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      <div ref={divRef} className="overflow-auto">
        <IOSheetTable defaultData={ioSheet?.data} />
      </div>
    </SearchWrapper>
  );
}
