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
import "react-day-picker/dist/style.css";

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
        <PopoverContent className="w-auto p-0 max-h-[34rem] overflow-y-auto" align="start">
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

          <div className="flex flex-col sm:flex-row">
            <CustomCalendar
              defaultMonth={date?.from}
              selected={date?.from}
              onSelect={(date) =>
                setDate((prev) => ({ from: date, to: prev?.to }))
              }
            />
            <CustomCalendar
              defaultMonth={date?.to}
              selected={date?.to}
              onSelect={(date) =>
                setDate((prev) => ({ from: prev?.from, to: date }))
              }
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface CustomCalendarProps {
  defaultMonth?: Date;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}
function CustomCalendar({
  selected,
  defaultMonth,
  onSelect,
}: CustomCalendarProps) {
  return (
    <Calendar
      initialFocus
      captionLayout="dropdown-buttons"
      classNames={{
        caption_label:
          "flex items-center justify-center w-20 text-base font-medium",
        dropdown: "rdp-dropdown",
        dropdown_icon: "ml-2",
        dropdown_year: "rdp-dropdown_year ml-3",
        caption_dropdowns: "w-full flex flex-row-reverse justify-end",
      }}
      fromYear={1995}
      toYear={dayjs().add(1, "year").year()}
      locale={ko}
      mode="single"
      onSelect={(date) => {
        if (date) onSelect(date);
      }}
      defaultMonth={defaultMonth}
      selected={selected}
    />
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
