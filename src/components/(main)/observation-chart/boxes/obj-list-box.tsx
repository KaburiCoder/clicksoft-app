import React, { Fragment } from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";

interface Props {
  title: string;
  obj: { [key: string]: string } | undefined;
}
export default function ObjListBox({ title, obj }: Props) {
  if (!obj) return <></>;
  return (
    <TitleGroup title={title}>
      <ObGrid gridType="textList">
        {Object.entries(obj).map(([key, value]) => (
          <Fragment key={key}>
            <ObGridHead>{key}</ObGridHead>
            <ObGridBody className="text-left">{value}</ObGridBody>
          </Fragment>
        ))}
      </ObGrid>
    </TitleGroup>
  );
}
