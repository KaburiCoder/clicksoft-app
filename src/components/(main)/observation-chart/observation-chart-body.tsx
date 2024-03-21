"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { ObservationChart } from "@/sockets/entities/observation-chart";
import { useSearchDataStore } from "@/stores/search-data.store";
import React from "react";
import SearchWrapper from "../search-wrapper";
import ObservationChartBox from "./observation-chart-box";

export default function ObservationChartBody() {
  const { observationChart } = useSearchDataStore();
  const { dates, items, inViewEl, handleSearch, isPending, error } =
    useEmit<ObservationChart>({
      eventName: emitPaths.getObservationChart,
      searchState: observationChart,
    });

  const components = items?.map((p) => (
    <ObservationChartBox key={p.id} data={p} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={handleSearch}
      isPending={isPending}
      error={error}
      inViewEl={inViewEl}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{components}</div>
    </SearchWrapper>
  );
}
