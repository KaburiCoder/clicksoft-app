import { ProgressNote } from "@/sockets/entities/progress-note";
import React from "react";
import { SearchDataBox } from "../search-data-box";

interface Props {
  progressNote: ProgressNote;
}

export default function ProgressNoteBox({ progressNote }: Props) {
  const { writer, writeDateFullText, detail, doctorName, typeName } =
    progressNote;

  return (
    <SearchDataBox
      contents={[
        { title: "작성일자", text: writeDateFullText },
        { title: "작성자", text: writer },
        { title: "유형", text: typeName },
        { title: "진료의", text: doctorName },
      ]}
    >
      {detail}
    </SearchDataBox>
  );
}
