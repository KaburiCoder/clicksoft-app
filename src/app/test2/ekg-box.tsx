import React from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "./ob-grid";
import { ObGridHead } from "./ob-grid-head";
import { ObGridBody } from "./ob-grid-body";
import { ObservationEkg } from "@/sockets/models/observation-chart";

interface Props {
  ekg: ObservationEkg | undefined;
}
export default function EkgBox({ ekg }: Props) {
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
