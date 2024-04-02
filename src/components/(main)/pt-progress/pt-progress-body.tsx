"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { PtProgress } from "@/sockets/entities/pt-progress";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { SearchDataBox } from "../search-data-box";
import HighlighterSplit from "@/components/custom/highlighter-split";

export default function PtProgressBody() {
  const { ptProgress } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<PtProgress>({
      eventName: emitPaths.getPtProgress,
      searchState: ptProgress,
    });

  const contents = items?.map((item) => (
    <SearchDataBox
      key={item.id}
      contents={[
        { title: "작성일자", text: item.writeDateFullText },
        { title: "치료코드", text: item.code },
        { title: "치료명칭", text: item.name },
        { title: "담당자", text: item.managerName },
      ]}
    >
      <HighlighterSplit
        searchString={ptProgress?.searchString}
        textToHighlight={item.content}
      />
    </SearchDataBox>
  ));

  return (
    <SearchWrapper
      defaultState={ptProgress}
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
      inViewEl={inViewEl}
      searchStringPlaceholder="내용 조회"
    >
      {contents}
    </SearchWrapper>
  );
}
