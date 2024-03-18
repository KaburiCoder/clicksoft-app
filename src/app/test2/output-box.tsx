import React, { Fragment } from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "./ob-grid";
import { ObGridHead } from "./ob-grid-head";
import { ObGridBody } from "./ob-grid-body";
import { ObservationOutput } from "@/sockets/models/observation-chart";

interface Props {
  output: ObservationOutput | undefined;
}

export default function OutputBox({ output }: Props) {
  return (
    <ObservationGroup title="Output">
      <ObGrid className="grid-cols-4">
        <ObGridHead></ObGridHead>
        <ObGridHead>D</ObGridHead>
        <ObGridHead>E</ObGridHead>
        <ObGridHead>N</ObGridHead>

        <ObGridHead>Urine</ObGridHead>
        <ObGridBody>{output?.D?.urine}</ObGridBody>
        <ObGridBody>{output?.E?.urine}</ObGridBody>
        <ObGridBody>{output?.N?.urine}</ObGridBody>

        <ObGridHead>Stool 용량</ObGridHead>
        <ObGridBody>{output?.D?.stool?.amount}</ObGridBody>
        <ObGridBody>{output?.E?.stool?.amount}</ObGridBody>
        <ObGridBody>{output?.N?.stool?.amount}</ObGridBody>

        <ObGridHead>Stool 횟수</ObGridHead>
        <ObGridBody>{output?.D?.stool?.frequency}</ObGridBody>
        <ObGridBody>{output?.E?.stool?.frequency}</ObGridBody>
        <ObGridBody>{output?.N?.stool?.frequency}</ObGridBody>

        <ObGridHead>Drainage</ObGridHead>
        <ObGridBody>{output?.D?.drainage}</ObGridBody>
        <ObGridBody>{output?.E?.drainage}</ObGridBody>
        <ObGridBody>{output?.N?.drainage}</ObGridBody>

        <ObGridHead>총배설량</ObGridHead>
        <ObGridBody className="col-span-3">{output?.totalExcretion}</ObGridBody>
      </ObGrid>
    </ObservationGroup>
  );
}
