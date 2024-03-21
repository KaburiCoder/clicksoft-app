import React from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "../grids/ob-grid";
import { ObGridHead } from "../grids/ob-grid-head";
import { ObGridBody } from "../grids/ob-grid-body";
import { ObservationFood } from "@/sockets/entities/observation-chart";

interface Props {
  food: ObservationFood | undefined;
}
export default function FoodBox({ food }: Props) {
  if (!food) return <></>;

  return (
    <ObservationGroup title="식사">
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
    </ObservationGroup>
  );
}
