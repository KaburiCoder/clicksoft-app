import { ProgressNote } from "@/sockets/models/progress-note";
import React from "react";
import SearchDataHeader from "../search-data-header";

interface Props {
  progressNote: ProgressNote;
}

export default function ProgressNoteBox({ progressNote }: Props) {
  const { writer, writeDateFullText, detail, doctorName, typeName } =
    progressNote;

  return (
    <div className="border-primary-sm border border-solid shadow-xl">
      <SearchDataHeader
        contents={[
          { title: "작성일자", text: writeDateFullText },
          { title: "작성자", text: writer },
          { title: "유형", text: typeName },
          { title: "진료의", text: doctorName },
        ]}
      />
      <div className="whitespace-pre-wrap bg-white p-2">{detail}</div>
    </div>
  );
}
