import React from "react";
import SearchDataHeader from "../search-data-header";
import { cn } from "@/lib/utils";
import { VitalSign, VitalSignDetail } from "@/sockets/models/vital-sign";

interface Props extends VitalSign { }
export function VitalSignBox({
  writeDateFullText,
  managerName,
  details,
}: Props) {
  return (
    <div
      key={`${writeDateFullText}_${managerName}`}
      className="flex flex-col border border-primary-sm"
    >
      <SearchDataHeader
        contents={[
          { title: "작성일자", text: writeDateFullText },
          { title: "작성자", text: managerName },
        ]}
      />

      <div
        className={`grid-area md2:grid-cols-7 lg2:grid-cols-9 xl2:grid-cols-11 grid grid-cols-4 bg-white md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12`}
      >
        {details.map((d, i) => (
          <VitalDetail key={d.title} {...d} isOdd={i % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}

const spanObj: { [key: string]: string } = {
  "2": "col-span-2",
  "3": "col-span-3",
  "4": "col-span-4",
  "5": "col-span-5",
  "6": "col-span-6",
  "7": "col-span-7",
  "8": "col-span-8",
  "9": "col-span-9",
  "10": "col-span-10",
  "11": "col-span-11",
  "12": "col-span-12",
};

interface VitalDetailProps extends VitalSignDetail {
  isOdd: boolean;
}

export function VitalDetail({
  title,
  value,
  isOdd,
  spanCount,
}: VitalDetailProps) {
  return (
    <div
      key={title}
      className={cn(
        "flex flex-col border border-primary/30 text-center shadow",
        spanCount ? spanObj[spanCount] : "",
      )}
    >
      <div
        className={cn(
          "px-2 py-1 text-black",
          isOdd ? "bg-green-100" : "bg-pink-100",
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          " px-2 py-1 font-semibold",
          isOdd ? "bg-white" : "bg-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}
