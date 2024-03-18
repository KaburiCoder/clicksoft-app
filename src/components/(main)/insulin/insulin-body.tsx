"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { Insulin } from "@/sockets/models/insulin";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { SearchDataBox } from "../search-data-box";
import InsulinBox from "./insulin-box";

export default function InsulinBody() {
  const { insulin } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<Insulin>({
      eventName: emitPaths.getInsulin,
      searchState: insulin,
    });

  const contents = items?.map((item) => (
    <SearchDataBox
      key={item.id}
      contents={[
        { title: "작성일자", text: item.writeDateShortText },
        { title: "담당자", text: item.managerName },
      ]}
      childrenClassName="flex flex-col gap-2"
    >
      {item.details.map((detail) => (
        <InsulinBox key={detail.id} insulin={item} detail={detail} />
      ))}
    </SearchDataBox>
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
