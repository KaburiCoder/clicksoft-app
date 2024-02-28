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

  function setTerm(value: number, unit: ManipulateType) {
    setDate({
      from: dayjs().add(value, unit).add(1, "d").toDate(),
      to: dayjs().toDate(),
    });
  }

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
          <div className="flex justify-center gap-1 py-1">
            <Button
              className="p-2"
              variant={"outline"}
              onClick={() => {
                setTerm(-1, "week");
              }}
            >
              1주
            </Button>
            <Button
              className="p-2"
              variant={"outline"}
              onClick={() => {
                setTerm(-1, "month");
              }}
            >
              1달
            </Button>
            <Button
              className="p-2"
              variant={"outline"}
              onClick={() => {
                setTerm(-3, "month");
              }}
            >
              3달
            </Button>
            <Button
              className="p-2"
              variant={"outline"}
              onClick={() => {
                setTerm(-6, "month");
              }}
            >
              6달
            </Button>
            <Button
              className="p-2"
              variant={"outline"}
              onClick={() => {
                setTerm(-1, "year");
              }}
            >
              1년
            </Button>
          </div>
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
