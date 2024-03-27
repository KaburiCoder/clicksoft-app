import React, { Fragment } from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";

interface Props {
  title: string;
  textList: string[] | undefined;
}

export default function TextListBox({ title, textList }: Props) {
  if (!textList || textList.length === 0) return <></>;
  return (
    <TitleGroup title={title}>
      <ObGrid gridType="textList">
        {textList
          ?.filter?.((item) => !!item?.trim())
          .map((text, i) => (
            <Fragment key={i}>
              <ObGridHead>{i + 1}</ObGridHead>
              <ObGridBody className="text-left">{text}</ObGridBody>
            </Fragment>
          ))}
      </ObGrid>
    </TitleGroup>
  );
}
