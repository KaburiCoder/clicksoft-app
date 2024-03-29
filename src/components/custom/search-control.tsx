"use client";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { DateRangePicker } from "../ui/custom/date-range-picker";
import ButtonL from "../ui/custom/button-l";
import { DateRangeType } from "@/lib/types/date.types";
import { LineChart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SearchState } from "@/stores/search-data.store";

export type SearchArgs = {
  dates?: DateRangeType;
  page?: number;
  count?: number;
  searchString?: string;
  etcParams?: { [key: string]: any };
};

export type SearchControlRef = {
  search: () => void;
};

export type SearchBarDisplay = {
  dateRange: boolean;
};
export interface SearchControlProps {
  onSearch: (args: SearchArgs) => void;
  defaultState?: SearchState<any>;
  defaultDateRange?: DateRangeType;
  isPending?: boolean;
  showGraphButton?: boolean;
  searchStringPlaceholder?: string;
  graphVisible?: boolean;
  display?: SearchBarDisplay;
  searchComponents?: React.ReactNode;
  onGraphVisibleChange?: (visible: boolean) => void;
}

export const SearchControl = React.forwardRef<
  SearchControlRef,
  SearchControlProps
>(
  (
    {
      defaultState,
      defaultDateRange,
      isPending,
      showGraphButton,
      onSearch,
      graphVisible,
      display,
      searchComponents,
      searchStringPlaceholder,
      onGraphVisibleChange,
    }: SearchControlProps,
    ref,
  ) => {
    const { dateRange: dispDateRange = true } = display || {};
    const [dateRange, setDateRange] = useState<DateRangeType>();
    const [searchString, setSearchString] = useState(
      defaultState?.searchString,
    );

    useImperativeHandle(ref, () => ({
      search: handleSearch,
    }));

    function handleSearch(): void {
      let dates: DateRangeType | undefined = undefined;
      if (dispDateRange) {
        if (!dateRange) return;

        dates = {
          from: dateRange.from,
          to: dateRange.to || dateRange.from,
        };
      }

      onSearch({ dates, searchString: searchString || undefined });
    }

    function handleGraphVisible(): void {
      onGraphVisibleChange?.(!graphVisible);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      handleSearch();
    }

    return (
      <div aria-disabled={isPending}>
        <form
          className="flex flex-wrap items-center gap-1 border-y border-primary/30 bg-green-50 px-2 py-1"
          onSubmit={handleSubmit}
        >
          {dispDateRange && (
            <DateRangePicker
              onDateChange={setDateRange}
              defaultDateRange={defaultDateRange}
            />
          )}
          {searchComponents}
          {searchStringPlaceholder && (
            <Input
              placeholder={searchStringPlaceholder}
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          )}
          <ButtonL isLoading={isPending}>조회</ButtonL>
          {showGraphButton && (
            <Button
              variant={graphVisible ? "destructive" : "outline"}
              onClick={handleGraphVisible}
            >
              <LineChart />
            </Button>
          )}
        </form>
      </div>
    );
  },
);

SearchControl.displayName = "SearchControl";
