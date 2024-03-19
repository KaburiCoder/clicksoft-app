"use client";
import React, { useImperativeHandle, useState } from "react";
import { DateRangePicker } from "../ui/custom/date-range-picker";
import ButtonL from "../ui/custom/button-l";
import { DateRangeType } from "@/lib/types/date.types";

export type SearchArgs = {
  dates: DateRangeType | undefined;
  page?: number;
  count?: number;
  etcParams?: { [key: string]: any };
};

export type SearchControlRef = {
  search: () => void;
};

export interface SearchControlProps {
  onSearch: (args: SearchArgs) => void;
  defaultDateRange?: DateRangeType;
  isPending?: boolean;
}

export const SearchControl = React.forwardRef<
  SearchControlRef,
  SearchControlProps
>(({ defaultDateRange, isPending, onSearch }: SearchControlProps, ref) => {
  const [dateRange, setDateRange] = useState<DateRangeType>();

  useImperativeHandle(ref, () => ({
    search: handleSearch,
  }));

  function handleSearch(): void {
    if (!dateRange) return;

    onSearch({
      dates: {
        from: dateRange.from,
        to: dateRange.to || dateRange.from,
      },
    });
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1 border-y border-primary/30 bg-green-50 px-2 py-1"
      aria-disabled={isPending}
    >
      <DateRangePicker
        onDateChange={setDateRange}
        defaultDateRange={defaultDateRange}
      />
      <ButtonL onClick={handleSearch} isLoading={isPending}>
        조회
      </ButtonL>
    </div>
  );
});

SearchControl.displayName = "SearchControl";
