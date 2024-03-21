import { BasicExam } from "@/sockets/entities/basic-exam";
import React from "react";
import { SearchDataBox } from "../search-data-box";
import { ResultGrid } from "@/components/custom/result-grid/result-grid";

interface Props extends BasicExam { }

export default function BasicExamBox({
  headers,
  writeDateFullText,
  details,
}: Props) {
  const headerContents = headers?.map((header) => ({ ...header }));

  return (
    <SearchDataBox
      contents={[
        { title: "작성일자", text: writeDateFullText },
        ...(headerContents ?? []),
      ]}
      childrenClassName="p-0"
    >
      <ResultGrid details={details} />
    </SearchDataBox>
  );
}
