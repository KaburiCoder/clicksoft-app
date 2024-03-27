import React, { Fragment } from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { MedicalNote } from "@/sockets/entities/prescription";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";
import { cn } from "@/lib/utils";

interface Props {
  medicalNotes: MedicalNote[] | undefined;
}

export default function MedicalNotesBox({ medicalNotes }: Props) {
  if (!medicalNotes || medicalNotes.length === 0) return <></>;

  return (
    <TitleGroup title="참고사항">
      <ObGrid gridType="rx-diagnosis">
        <ObGridHead>코드</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        {medicalNotes?.map((mediNote, i) => {
          return (
            <Fragment key={i}>
              <ObGridBody className={cn("flex items-center")}>
                {mediNote.code}
              </ObGridBody>
              <ObGridBody className={cn("text-left")}>
                {mediNote.name}
              </ObGridBody>
            </Fragment>
          );
        })}
      </ObGrid>
    </TitleGroup>
  );
}
