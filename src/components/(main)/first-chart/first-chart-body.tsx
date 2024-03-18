"use client";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { useEmit } from "@/lib/hooks/use-emit";
import { FirstChart } from "@/sockets/models/first-chart";
import { emitPaths } from "@/paths";
import { SearchDataBox } from "../search-data-box";
import FirstChartBox from "./first-chart-box";

export default function FirstChartBody() {
  const { firstChart } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<FirstChart>({
      eventName: emitPaths.getFirstChart,
      searchState: firstChart,
    });

  const contents = items?.map((item) => (
    <SearchDataBox
      key={item.id}
      contents={[
        { title: "작성일자", text: item.writeDateFullText },
        ...(item.headers || []),
      ]}
      childrenClassName="p-0"
    >
      <FirstChartBox details={item.details} />
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
