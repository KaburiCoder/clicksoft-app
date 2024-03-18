"use client";
import { emitPaths } from "@/paths";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { useEmit } from "@/lib/hooks/use-emit";
import { useSearchDataStore } from "@/stores/search-data.store";
import { Scan } from "@/sockets/models/scan";
import ScanBox from "./scan-box";

export default function ScanBody() {
  const { scan } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<Scan>({
      eventName: emitPaths.getScan,
      searchState: scan,
    });

  const dateGroups = items?.reduce((map: Map<string, Scan[]>, cur) => {
    if (map.has(cur.writeDateShortText)) {
      map.get(cur.writeDateShortText)?.push(cur);
    } else {
      map.set(cur.writeDateShortText, [cur]);
    }

    return map;
  }, new Map<string, Scan[]>());

  const components = Array.from(dateGroups || []).map(([shortDate, scans]) => (
    <ScanBox key={shortDate} shortDate={shortDate} scans={scans} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
      inViewEl={inViewEl}
    >
      <div className="flex w-full flex-col gap-2 overflow-y-visible">
        {components}
      </div>
    </SearchWrapper>
  );
}
