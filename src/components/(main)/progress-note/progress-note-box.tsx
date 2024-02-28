import { ProgressNote } from "@/sockets/models/progress-note";
import React from "react";

interface Props {
  progressNote: ProgressNote;
}

export default function ProgressNoteBox({ progressNote }: Props) {
  const { writer, writeDateFullText, detail, doctorName, typeName } =
    progressNote;

  return (
    <div className="border border-solid border-primary-sm shadow-xl">
      <div className="flex flex-wrap gap-x-4 gap-y-1 bg-slate-50 p-2">
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">작성일자</div>
          <div className="font-semibold text-blue-500">{writeDateFullText}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">작성자</div>
          <div className="font-semibold text-blue-500">{writer}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">유형</div>
          <div className="font-semibold text-blue-500">{typeName}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-slate-500">진료의</div>
          <div className="font-semibold text-blue-500">{doctorName}</div>
        </div>
      </div>
      <div className="bg-white p-2 whitespace-pre-wrap">{detail}</div>
    </div>
  );
}
