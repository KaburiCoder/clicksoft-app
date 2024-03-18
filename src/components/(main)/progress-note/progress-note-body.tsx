"use client";
import React from "react";
import { emitPaths } from "@/paths";
import ProgressNoteBox from "./progress-note-box";
import { ProgressNote } from "@/sockets/models/progress-note";
import { useEmit } from "@/lib/hooks/use-emit";
import SearchWrapper from "../search-wrapper";
import { useSearchDataStore } from "@/stores/search-data.store";

export default function ProgressNoteBody() {
  const { progress } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<ProgressNote>({
      eventName: emitPaths.getProgressNote,
      searchState: progress,
    });

  const progNoteContents = items?.map((p) => (
    <ProgressNoteBox key={p.id} progressNote={p} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
      inViewEl={inViewEl}
    >
      {progNoteContents}
    </SearchWrapper>
  );
}
