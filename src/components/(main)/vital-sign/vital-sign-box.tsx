import React from "react";
import { VitalSign } from "@/sockets/entities/vital-sign";
import { SearchDataBox } from "../search-data-box";
import { ResultGrid } from "@/components/custom/result-grid/result-grid";

interface Props extends VitalSign { }
export function VitalSignBox({
  writeDateFullText,
  managerName,
  details,
}: Props) {
  return (
    <SearchDataBox
      contents={[
        { title: "작성일자", text: writeDateFullText },
        { title: "작성자", text: managerName },
      ]}
      childrenClassName="p-0"
    >
      <ResultGrid details={details} />
    </SearchDataBox>
  );
}
