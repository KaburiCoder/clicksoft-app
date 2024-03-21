import React, { Fragment } from "react";
import { ObservationGroup } from "./observation-title";
import { ObGridBody } from "./ob-grid-body";
import { ObGridHead } from "./ob-grid-head";
import ObGrid from "./ob-grid";
import { ObservationVs } from "@/sockets/entities/observation-chart";

interface Props {
  vsList: ObservationVs[] | undefined;
}

export default function VsBox({ vsList }: Props) {
  if (!vsList) return <></>;

  return (
    <ObservationGroup title="V.S">
      <ObGrid className="grid-cols-6">
        <ObGridHead className="row-span-2">{"측정\n시간"}</ObGridHead>
        <ObGridHead className="col-span-2">B.P혈압</ObGridHead>
        <ObGridHead className="row-span-2">P(맥박)</ObGridHead>
        <ObGridHead className="row-span-2">R(호흡)</ObGridHead>
        <ObGridHead className="row-span-2">T(체온)</ObGridHead>
        <ObGridHead>고</ObGridHead>
        <ObGridHead>저</ObGridHead>
        {vsList?.map((vs, i) => (
          <Fragment key={i}>
            <ObGridBody>{vs.measurementTime}</ObGridBody>
            <ObGridBody>{vs.highBP}</ObGridBody>
            <ObGridBody>{vs.lowBP}</ObGridBody>
            <ObGridBody>{vs.pulse}</ObGridBody>
            <ObGridBody>{vs.respiration}</ObGridBody>
            <ObGridBody>{vs.temperature}</ObGridBody>
          </Fragment>
        ))}
      </ObGrid>
    </ObservationGroup>
  );
}
