import React from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "../grids/ob-grid";
import { ObGridHead } from "../grids/ob-grid-head";
import { ObGridBody } from "../grids/ob-grid-body";
import { ObservationEkg } from "@/sockets/entities/observation-chart";

interface Props {
  ekg: ObservationEkg | undefined;
}
export default function EkgBox({ ekg }: Props) {
  if (!ekg) return <></>;

  return (
    <ObservationGroup title="EKG Monitoring">
      <ObGrid className="grid-cols-3">
        <ObGridHead></ObGridHead>
        <ObGridHead>EKG</ObGridHead>
        <ObGridHead>SPO2</ObGridHead>

        <ObGridHead>Start</ObGridHead>
        <ObGridBody>{ekg?.start}</ObGridBody>
        <ObGridBody className="row-span-2">{ekg?.SPO2}</ObGridBody>

        <ObGridHead>End</ObGridHead>
        <ObGridBody>{ekg?.end}</ObGridBody>
      </ObGrid>
    </ObservationGroup>
  );
}
