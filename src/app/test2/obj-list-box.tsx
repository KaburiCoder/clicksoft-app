import React, { Fragment } from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "./ob-grid";
import { ObGridHead } from "./ob-grid-head";
import { ObGridBody } from "./ob-grid-body";

interface Props {
  title: string;
  obj: { [key: string]: string } | undefined;
}
export default function ObjListBox({ title, obj }: Props) {
  if (!obj) return <></>;
  return (
    <ObservationGroup title={title}>
      <ObGrid gridType="textList">
        {Object.entries(obj).map(([key, value]) => (
          <Fragment key={key}>
            <ObGridHead>{key}</ObGridHead>
            <ObGridBody className="text-left">{value}</ObGridBody>
          </Fragment>
        ))}
      </ObGrid>
    </ObservationGroup>
  );
}
