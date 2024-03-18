import React from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "../grids/ob-grid";
import { ObGridHead } from "../grids/ob-grid-head";
import { ObGridBody } from "../grids/ob-grid-body";
import { ObservationBst } from "@/sockets/models/observation-chart";

interface Props {
  bstList: ObservationBst[] | undefined;
}

export default function BstBox({ bstList }: Props) {
  if (!bstList) return <></>;

  return (
    <ObservationGroup title="Glucose(BST)">
      <div className="flex flex-wrap gap-2">
        {bstList
          ?.filter((bst) => bst)
          .map((bst, i) => (
            <ObGrid className="grid-cols-2" key={i}>
              <ObGridHead className="min-w-12">시간</ObGridHead>
              <ObGridHead className="min-w-12">수치</ObGridHead>
              <ObGridBody>{bst?.time}</ObGridBody>
              <ObGridBody>{bst?.value}</ObGridBody>
            </ObGrid>
          ))}
      </div>
    </ObservationGroup>
  );
}
