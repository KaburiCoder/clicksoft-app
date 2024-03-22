"use client";
import React from "react";
import SearchWrapper from "../search-wrapper";
import { VitalSignBox } from "./vital-sign-box";
import { useEmit } from "@/lib/hooks/use-emit";
import { useSearchDataStore } from "@/stores/search-data.store";
import { emitPaths } from "@/paths";
import { VitalSign } from "@/sockets/entities/vital-sign";
import TitleValueGraph from "../../custom/graphs/title-value-graph";

export default function VitalSignBody() {
  const { vitalSign } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<VitalSign>({
      eventName: emitPaths.getVitalSign,
      searchState: vitalSign,
    });

  const components = items?.map((vs) => <VitalSignBox key={vs.id} {...vs} />);

  return (
    <>
      <SearchWrapper
        defaultDateRange={dates}
        onSearch={handleSearch}
        isPending={isPending}
        error={error}
        inViewEl={inViewEl}
        graphEl={<TitleValueGraph xName="writeDateFullText" items={items} />}
      >
        <div className="flex flex-col gap-2">{components}</div>
      </SearchWrapper>
    </>
  );
}
