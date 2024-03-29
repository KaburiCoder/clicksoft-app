"use client";
import { useEmit } from "@/lib/hooks/use-emit";
import { emitPaths } from "@/paths";
import { useSearchDataStore } from "@/stores/search-data.store";
import React, { useState } from "react";
import SearchWrapper from "../search-wrapper";
import { Prescription } from "@/sockets/entities/prescription";
import PrescriptionBox from "./prescription-box";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileCog } from "lucide-react";
import PrescriptionOptions, {
  PrescriptionCondition,
} from "./prescription-options";
import { removeFalse } from "@/lib/utils/object-util";

export default function PrescriptionBody() {
  const { prescription } = useSearchDataStore();
  const { items, dates, inViewEl, handleSearch, isPending, error } =
    useEmit<Prescription>({
      eventName: emitPaths.getPrescription,
      searchState: prescription,
    });
  const [checkOptions, setCheckOptions] = useState<
    PrescriptionCondition | undefined
  >(prescription?.etcParams?.condition);

  const components = items?.map((p) => (
    <PrescriptionBox key={p.id} prescription={p} />
  ));

  return (
    <SearchWrapper
      defaultDateRange={dates}
      onSearch={(args) =>
        handleSearch({
          ...args,
          etcParams: {
            condition: removeFalse(checkOptions),
          },
        })
      }
      isPending={isPending}
      error={error}
      searchComponents={
        <Popover>
          <PopoverTrigger className="h-full w-10 rounded border border-primary-sm bg-white p-2">
            <FileCog className="h-full w-full text-teal-800" />
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <PrescriptionOptions
              defaultCondition={checkOptions}
              onChange={setCheckOptions}
            />
          </PopoverContent>
        </Popover>
      }
    >
      <div className="flex flex-col gap-4">
        {components}
        {inViewEl}
      </div>
    </SearchWrapper>
  );
}
