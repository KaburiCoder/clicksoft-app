import { cn } from "@/lib/utils";
import { NursingRecord } from "@/sockets/models/nursing-record";
import React from "react";
import SearchDataHeader from "../search-data-header";

interface Props {
  nursingRecord: NursingRecord;
}

export default function NursingRecordBox({ nursingRecord }: Props) {
  const detailComponents = nursingRecord.details.map((d, i) => (
    <Content
      key={`${d.title}${i}`}
      title={d.title}
      detail={d.detail}
      noBorder={i === nursingRecord.details.length - 1}
    />
  ));

  return (
    <div className="border-primary-sm border border-solid shadow-xl">
      <SearchDataHeader
        contents={[
          { title: "작성일자", text: nursingRecord.writeDateFullText },
          { title: "담당자", text: nursingRecord.nurseName },
        ]}
      />
      <div
        className={cn(
          "justify-stretch whitespace-pre-wrap bg-white",
          "sm:flex",
        )}
      >
        {detailComponents}
      </div>
    </div>
  );
}

interface ContentProps {
  title: string;
  detail: string;
  noBorder?: boolean;
}

function Content({ title, detail, noBorder }: ContentProps) {
  return (
    <div
      className={cn(
        "flex-1",
        "sm:border-e-primary-sm",
        noBorder ? "" : "sm:border",
      )}
    >
      <div className=" bg-green-200 p-2 py-1 font-semibold text-slate-700">
        {title}
      </div>
      <div className="p-2">{detail}</div>
    </div>
  );
}
