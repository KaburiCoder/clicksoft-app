"use client";
import React, { useImperativeHandle, useState } from "react";
import { DateRangePicker } from "../ui/custom/date-range-picker";
import ButtonL from "../ui/custom/button-l";
import { DateRangeType } from "@/lib/types/date.types";
import { LineChart } from "lucide-react";
import { Button } from "../ui/button";

export type SearchArgs = {
  dates?: DateRangeType;
  page?: number;
  count?: number;
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
  defaultDateRange?: DateRangeType;
  isPending?: boolean;
  showGraphButton?: boolean;
  graphVisible?: boolean;
  display?: SearchBarDisplay;
  onGraphVisibleChange?: (visible: boolean) => void;
}

export const SearchControl = React.forwardRef<
  SearchControlRef,
  SearchControlProps
>(
  (
    {
      defaultDateRange,
      isPending,
      showGraphButton,
      onSearch,
      graphVisible,
      display,
      onGraphVisibleChange,
    }: SearchControlProps,
    ref,
  ) => {
    const { dateRange: dispDateRange = true } = display || {};
    const [dateRange, setDateRange] = useState<DateRangeType>();

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

      onSearch({ dates });
    }

    function handleGraphVisible(): void {
      onGraphVisibleChange?.(!graphVisible);
    }

    return (
      <div
        className="flex flex-wrap items-center gap-1 border-y border-primary/30 bg-green-50 px-2 py-1"
        aria-disabled={isPending}
      >
        {dispDateRange && (
          <DateRangePicker
            onDateChange={setDateRange}
            defaultDateRange={defaultDateRange}
          />
        )}
        <ButtonL onClick={handleSearch} isLoading={isPending}>
          조회
        </ButtonL>
        {showGraphButton && (
          <Button
            variant={graphVisible ? "destructive" : "outline"}
            onClick={handleGraphVisible}
          >
            <LineChart />
          </Button>
        )}
      </div>
    );
  },
);

SearchControl.displayName = "SearchControl";
