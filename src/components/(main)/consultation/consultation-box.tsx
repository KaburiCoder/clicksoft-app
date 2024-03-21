import { Consultation } from "@/sockets/entities/consultation";
import React from "react";
import { SearchDataBox } from "../search-data-box";

interface Props {
  item: Consultation;
}

export default function ConsultationBox({ item }: Props) {
  return (
    <div className="flex flex-col rounded border border-primary-sm">
      <h2 className="bg-green-300 py-2 text-center text-lg font-bold text-green-900">
        {item.title}
      </h2>
      <div className="flex w-full flex-col sm:flex-row">
        <SearchDataBox
          noBorder
          className="sm0:border-b flex-1 sm:border-r"
          contents={item.from.headers}
        >
          {item.from.request}
        </SearchDataBox>
        <SearchDataBox noBorder className="flex-1" contents={item.to?.headers!}>
          {item.to.response}
        </SearchDataBox>
      </div>
    </div>
  );
}
