import React, { Fragment } from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "./ob-grid";
import { ObGridHead } from "./ob-grid-head";
import { ObGridBody } from "./ob-grid-body";
import { ObservationIntake } from "@/sockets/models/observation-chart";

interface Props {
  intake: ObservationIntake | undefined;
}
export default function IntakeBox({ intake }: Props) {
  return (
    <ObservationGroup title="Intake">
      <ObGrid className="grid-cols-4">
        <ObGridHead></ObGridHead>
        <ObGridHead>D</ObGridHead>
        <ObGridHead>E</ObGridHead>
        <ObGridHead>N</ObGridHead>

        <ObGridHead>Oral</ObGridHead>
        <ObGridBody>{intake?.D?.oral}</ObGridBody>
        <ObGridBody>{intake?.E?.oral}</ObGridBody>
        <ObGridBody>{intake?.N?.oral}</ObGridBody>

        <ObGridHead>Parenteral</ObGridHead>
        <ObGridBody>{intake?.D?.parenteral}</ObGridBody>
        <ObGridBody>{intake?.E?.parenteral}</ObGridBody>
        <ObGridBody>{intake?.N?.parenteral}</ObGridBody>

        <ObGridHead>총섭취량</ObGridHead>
        <ObGridBody className="col-span-3">{intake?.totalIntake}</ObGridBody>
      </ObGrid>
    </ObservationGroup>
  );
}
