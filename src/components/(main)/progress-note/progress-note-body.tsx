"use client";
import React from "react";
import { emitPaths } from "@/paths";
import { GetProgressNoteDto } from "@/sockets/dtos/get-progress-note.dto";
import ProgressNoteBox from "./progress-note-box";
import { ProgressNote } from "@/sockets/models/progress-note";
import { useEmit } from "@/lib/hooks/use-emit";
import SearchWrapper from "../search-wrapper";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function ProgressNoteBody() {
  const { handleSearch, isPending, error } = useEmit<ProgressNote>({
    emitCb: (socket, patInfo, args) => {
      return socket?.emitWithAck(emitPaths.getProgressNote, {
        chartNo: patInfo?.chartNo!,
        startDate: args.dates.from!,
        endDate: args.dates.to!,
      } satisfies GetProgressNoteDto);
    },
    kind: "progressNote",
  });

  const { progress } = useSearchDataStore();

  const progNoteContents = progress?.data?.map((p, i) => (
    <ProgressNoteBox key={i} progressNote={p} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={progress?.dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
    >
      {progNoteContents}
    </SearchWrapper>
  );
}
