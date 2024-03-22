"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { BasicExam } from "@/sockets/entities/basic-exam";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import BasicExamBox from "./basic-exam-box";
import TitleValueGraph from "../../custom/graphs/title-value-graph";

export default function BasicExamBody() {
  const { basicExam } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<BasicExam>({
      eventName: emitPaths.getBasicExam,
      searchState: basicExam,
    });

  const components = items?.map((ex) => <BasicExamBox key={ex.id} {...ex} />);

  return (
    <>
      <SearchWrapper
        defaultDateRange={dates}
        onSearch={handleSearch}
        isPending={isPending}
        error={error}
        inViewEl={inViewEl}
        searchBarDisp={{ dateRange: false }}
        graphEl={<TitleValueGraph xName="writeDateFullText" items={items} />}
      >
        <div className="flex flex-col gap-2">{components}</div>
      </SearchWrapper>
    </>
  );
}
