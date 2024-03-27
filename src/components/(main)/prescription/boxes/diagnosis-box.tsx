import { Diagnosis } from "@/sockets/entities/prescription";
import React, { Fragment } from "react";
import { TitleGroup } from "../../../custom/title-group";
import ObGrid from "../../../custom/grids/ob-grid";
import { ObGridHead } from "../../../custom/grids/ob-grid-head";
import { ObGridBody } from "../../../custom/grids/ob-grid-body";
import { cn } from "@/lib/utils";

interface Props {
  diagnosises: Diagnosis[] | undefined;
}

export default function DiagnosisBox({ diagnosises }: Props) {
  if (!diagnosises || diagnosises.length === 0) return <></>;

  return (
    <TitleGroup title="상병내역">
      <ObGrid gridType="rx-diagnosis">
        <ObGridHead>코드</ObGridHead>
        <ObGridHead>명칭</ObGridHead>
        {diagnosises?.map((diag, i) => {
          return (
            <Fragment key={i}>
              <ObGridBody className={cn("flex items-center")}>
                {diag.code}
              </ObGridBody>
              <ObGridBody className={cn("text-left")}>{diag.name}</ObGridBody>
            </Fragment>
          );
        })}
      </ObGrid>
    </TitleGroup>
  );
}
