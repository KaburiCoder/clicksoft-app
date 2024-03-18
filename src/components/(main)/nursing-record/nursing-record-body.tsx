"use client";
import React, { useRef } from "react";
import NursingRecordBox from "./nursing-record.box";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import SearchWrapper from "../search-wrapper";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function NursingRecordBody() {
  const { nursingRecord } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<NursingRecord>({
      eventName: emitPaths.getNursingRecord,
      searchState: nursingRecord,
    });

  const nursingRecordComponents = items?.map((ns) => (
    <NursingRecordBox key={ns.id} nursingRecord={ns} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
      inViewEl={inViewEl}
    >
      {nursingRecordComponents}
    </SearchWrapper>
  );
}