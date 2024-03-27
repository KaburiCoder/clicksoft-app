import React from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";
import { ObservationRespiration } from "@/sockets/entities/observation-chart";

interface Props {
  respiration: ObservationRespiration | undefined;
}

export default function RespirationBox({ respiration }: Props) {
  if (!respiration) return <></>;

  return (
    <TitleGroup title="호흡">
      <ObGrid className="grid-cols-5">
        <ObGridHead className="row-span-2"></ObGridHead>
        <ObGridHead className="row-span-2">{"CPR(CM)\n시간"}</ObGridHead>
        <ObGridHead className="row-span-2">
          {"Artifical\nventilation"}
        </ObGridHead>
        <ObGridHead className="col-span-2">{"Oxygen\ninhalation"}</ObGridHead>

        <ObGridHead>{"산소량\n(l/min)"}</ObGridHead>
        <ObGridHead>총량</ObGridHead>

        <ObGridHead>Start</ObGridHead>
        <ObGridBody>{respiration?.cprTime?.start}</ObGridBody>
        <ObGridBody>{respiration?.AV?.start}</ObGridBody>
        <ObGridBody>{respiration?.oxygen?.amount.start}</ObGridBody>
        <ObGridBody className="row-span-2">
          {respiration?.oxygen?.totalAmount}
        </ObGridBody>

        <ObGridHead>End</ObGridHead>
        <ObGridBody>{respiration?.cprTime?.end}</ObGridBody>
        <ObGridBody>{respiration?.AV?.end}</ObGridBody>
        <ObGridBody>{respiration?.oxygen?.amount.end}</ObGridBody>
      </ObGrid>
    </TitleGroup>
  );
}
