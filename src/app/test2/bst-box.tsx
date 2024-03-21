import React from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "./ob-grid";
import { ObGridHead } from "./ob-grid-head";
import { ObGridBody } from "./ob-grid-body";
import { ObservationBst } from "@/sockets/entities/observation-chart";

interface Props {
  bstList: ObservationBst[] | undefined;
}

export default function BstBox({ bstList }: Props) {
  return (
    <ObservationGroup title="Glucose(BST)">
      <div className="flex flex-wrap gap-2">
        {bstList?.map((bst, i) => (
          <ObGrid className="grid-cols-2" key={i}>
            <ObGridHead className="min-w-12">시간</ObGridHead>
            <ObGridHead className="min-w-12">수치</ObGridHead>
            <ObGridBody>{bst.time}</ObGridBody>
            <ObGridBody className="text-left">{bst.value}</ObGridBody>
          </ObGrid>
        ))}
      </div>
    </ObservationGroup>
  );
}
