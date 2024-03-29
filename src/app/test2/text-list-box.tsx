import React, { Fragment } from "react";
import { ObservationGroup } from "./observation-title";
import ObGrid from "./ob-grid";
import { ObGridHead } from "./ob-grid-head";
import { ObGridBody } from "./ob-grid-body";

interface Props {
  title: string;
  textList: string[] | undefined;
}

export default function TextListBox({ title, textList }: Props) {
  if (!textList || textList.length === 0) return <></>;
  return (
    <ObservationGroup title={title}>
      <ObGrid gridType="textList">
        {textList?.map((text, i) => (
          <Fragment key={i}>
            <ObGridHead>{i + 1}</ObGridHead>
            <ObGridBody className="text-left">{text}</ObGridBody>
          </Fragment>
        ))}
      </ObGrid>
    </ObservationGroup>
  );
}
