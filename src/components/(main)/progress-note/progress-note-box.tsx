import { ProgressNote } from "@/sockets/entities/progress-note";
import React from "react";
import { SearchDataBox } from "../search-data-box";
import HighlighterSplit from "@/components/custom/highlighter-split";

interface Props {
  progressNote: ProgressNote;
  searchString?: string;
}

export default function ProgressNoteBox({ progressNote, searchString }: Props) {
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
      <HighlighterSplit searchString={searchString} textToHighlight={detail} />
    </SearchDataBox>
  );
}
