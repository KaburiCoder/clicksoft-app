import React, { Fragment } from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";
import { ObservationIntake } from "@/sockets/entities/observation-chart";

interface Props {
  intake: ObservationIntake | undefined;
}
export default function IntakeBox({ intake }: Props) {
  if (!intake) return <></>;

  return (
    <TitleGroup title="Intake">
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
    </TitleGroup>
  );
}
