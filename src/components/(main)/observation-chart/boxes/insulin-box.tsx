"use client";
import React, { Fragment } from "react";
import { ObservationGroup } from "./observation-title";
import { ObGridBody } from "../grids/ob-grid-body";
import { ObGridHead } from "../grids/ob-grid-head";
import ObGrid from "../grids/ob-grid";
import { ObservationInsulin } from "@/sockets/models/observation-chart";

interface Props {
  insulinList: ObservationInsulin[] | undefined;
}
export default function InsulinBox({ insulinList }: Props) {
  if (!insulinList) return <></>;

  return (
    <ObservationGroup title="Insulin">
      <ObGrid gridType="insulin">
        <ObGridHead>시간</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        <ObGridHead>용량</ObGridHead>
        <ObGridHead>혈당</ObGridHead>
        {insulinList?.map((insulin, i) => (
          <Fragment key={i}>
            <ObGridBody>{insulin?.time}</ObGridBody>
            <ObGridBody className="text-left">{insulin?.name}</ObGridBody>
            <ObGridBody>{insulin?.dosage}</ObGridBody>
            <ObGridBody>{insulin?.bloodSugar}</ObGridBody>
          </Fragment>
        ))}
      </ObGrid>
    </ObservationGroup>
  );
}
