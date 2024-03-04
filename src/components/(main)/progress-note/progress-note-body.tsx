"use client";
import React from "react";
import { emitPaths } from "@/paths";
import ProgressNoteBox from "./progress-note-box";
import { ProgressNote } from "@/sockets/models/progress-note";
import { useEmit } from "@/lib/hooks/use-emit";
import SearchWrapper from "../search-wrapper";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function ProgressNoteBody() {
  const { handleSearch, isPending, error } = useEmit<ProgressNote>({
    eventName: emitPaths.getProgressNote,
  });

  const { progress } = useSearchDataStore();

  const progNoteContents = progress?.data?.map((p, i) => (
    <ProgressNoteBox key={`${p.writeDateFullText}${i}`} progressNote={p} />
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
