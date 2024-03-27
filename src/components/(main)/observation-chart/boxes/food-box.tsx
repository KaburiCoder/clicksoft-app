import React from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";
import { ObservationFood } from "@/sockets/entities/observation-chart";

interface Props {
  food: ObservationFood | undefined;
}
export default function FoodBox({ food }: Props) {
  if (!food) return <></>;

  return (
    <TitleGroup title="식사">
      <ObGrid className="grid-cols-4">
        <ObGridHead></ObGridHead>
        <ObGridHead>Diet</ObGridHead>
        <ObGridHead>용량</ObGridHead>
        <ObGridHead>비고</ObGridHead>

        <ObGridHead>아침</ObGridHead>
        <ObGridBody>{food?.breakfast?.diet}</ObGridBody>
        <ObGridBody>{food?.breakfast?.volume}</ObGridBody>
        <ObGridBody>{food?.breakfast?.note}</ObGridBody>

        <ObGridHead>점심</ObGridHead>
        <ObGridBody>{food?.lunch?.diet}</ObGridBody>
        <ObGridBody>{food?.lunch?.volume}</ObGridBody>
        <ObGridBody>{food?.lunch?.note}</ObGridBody>

        <ObGridHead>저녁</ObGridHead>
        <ObGridBody>{food?.dinner?.diet}</ObGridBody>
        <ObGridBody>{food?.dinner?.volume}</ObGridBody>
        <ObGridBody>{food?.dinner?.note}</ObGridBody>
      </ObGrid>
    </TitleGroup>
  );
}
