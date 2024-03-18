"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { Consultation } from "@/sockets/models/consultation";
import { emitPaths } from "@/paths";
import { SearchDataBox } from "../search-data-box";
import ConsultationBox from "./consultation-box";

export default function ConsultationBody() {
  const { consultation } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<Consultation>({
      eventName: emitPaths.getConsultation,
      searchState: consultation,
    });

  const contents = items?.map((item) => (
    <ConsultationBox key={item.id} item={item} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
      inViewEl={inViewEl}
    >
      {contents}
    </SearchWrapper>
  );
}
