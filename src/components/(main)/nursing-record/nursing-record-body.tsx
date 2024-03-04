"use client";
import React from "react";
import NursingRecordBox from "./nursing-record.box";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import SearchWrapper from "../search-wrapper";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function NursingRecordBody() {
  const { handleSearch, isPending, error } = useEmit<NursingRecord>({
    eventName: emitPaths.getNursingRecord,
  });

  const { nursingRecord } = useSearchDataStore();

  const nursingRecordComponents = nursingRecord?.data?.map(
    (nursingRecord, i) => (
      <NursingRecordBox
        key={`${nursingRecord.writeDateFullText}${i}`}
        nursingRecord={nursingRecord}
      />
    ),
  );

  return (
    <SearchWrapper
      defaultDateRange={nursingRecord?.dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      {nursingRecordComponents}
    </SearchWrapper>
  );
}
