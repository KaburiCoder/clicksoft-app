"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs, { ManipulateType } from "dayjs";
import { DateRangeType } from "@/lib/types/date.types";
import { cn } from "@/lib/utils";
import { Calendar } from "../calendar";
import { PopoverClose } from "@radix-ui/react-popover";

interface Props {
  onDateChange: (date?: DateRangeType) => void;
  defaultDateRange?: DateRangeType;
}

export function DateRangePicker({
  defaultDateRange,
  className,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & Props) {
  const [date, setDate] = React.useState<DateRangeType | undefined>(
    defaultDateRange || {
      from: new Date(),
      to: new Date(),
    },
  );

  React.useEffect(() => {
    onDateChange(date);
  }, [date, onDateChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-fit justify-start border-primary text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("YYYY-MM-DD")} -{" "}
                  {dayjs(date.to).format("YYYY-MM-DD")}
                </>
              ) : (
                dayjs(date.from).format("YYYY-MM-DD")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <PopoverClose className="mx-auto flex justify-center gap-1 py-1">
            <TermButton setDate={setDate} value={-1} unit="week">
              1주
            </TermButton>
            <TermButton setDate={setDate} value={-1} unit="month">
              1달
            </TermButton>
            <TermButton setDate={setDate} value={-3} unit="month">
              3달
            </TermButton>
            <TermButton setDate={setDate} value={-6} unit="month">
              6달
            </TermButton>
            <TermButton setDate={setDate} value={-1} unit="year">
              1년
            </TermButton>
            <TermButton setDate={setDate} value={-10} unit="year">
              10년
            </TermButton>
          </PopoverClose>
          <Calendar
            initialFocus
            mode="range"
            locale={ko}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          // components={{ Caption: ({ displayMonth }) => <div>{displayMonth.getFullYear()}</div> }}
          // components={{ WeekNumber: () => <div>12321312</div> }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function TermButton({
  value,
  unit,
  children,
  setDate,
}: {
  value: number;
  unit: ManipulateType;
  children: React.ReactNode;
  setDate: React.Dispatch<React.SetStateAction<DateRangeType | undefined>>;
}) {
  function setTerm(value: number, unit: ManipulateType) {
    setDate({
      from: dayjs().add(value, unit).add(1, "d").toDate(),
      to: dayjs().toDate(),
    });
  }

  return (
    <div
      className="rounded-xl border border-primary-sm p-2 text-sm hover:bg-primary hover:text-primary-foreground"
      onClick={() => {
        setTerm(value, unit);
      }}
    >
      {children}
    </div>
  );
}
