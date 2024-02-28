"use client";
import React from "react";
import NursingRecordBox from "./nursing-record.box";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { GetNursingRecordDto } from "@/sockets/dtos/get-nursing-record.dto";
import SearchWrapper from "../search-wrapper";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function NursingRecordBody() {
  const { handleSearch, isPending, error } = useEmit<NursingRecord>({
    emitCb: (socket, patInfo, args) => {
      return socket?.emitWithAck(emitPaths.getNursingRecord, {
        chartNo: patInfo?.chartNo!,
        startDate: args.dates.from!,
        endDate: args.dates.to!,
      } satisfies GetNursingRecordDto);
    },
    kind: "nursingRecord",
  });

  const { nursingRecord } = useSearchDataStore();

  const nursingRecordComponents = nursingRecord?.data?.map(
    (nursingRecord, i) => (
      <NursingRecordBox key={i} nursingRecord={nursingRecord} />
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
