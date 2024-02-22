"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SquareUser } from "lucide-react";
import { formatYmdToShort } from "@/lib/utils/format-texts";
import { PatientInfo } from "@/sockets/models/patient-info";
import usePatientStore from "@/stores/patient.store";
import { useRouter } from "next/navigation";

interface Props {
  patientInfo: PatientInfo;
}
export default function UserItem({ patientInfo }: Props) {
  const { back } = useRouter();
  const { setPatientInfo } = usePatientStore();
  const {
    age,
    birthday,
    chartNo,
    ibYmd,
    jinchalName,
    sex,
    suName,
    wardName,
    yuhyungName,
  } = Object.assign(new PatientInfo(), patientInfo);

  function handleSelectPatient() {
    setPatientInfo(patientInfo);
    back();
  }

  return (
    <Card
      className="flex flex-col p-2 hover:cursor-pointer hover:bg-gray-50"
      onClick={handleSelectPatient}
    >
      <div className="flex items-center justify-between text-green-600">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <SquareUser />
          <div className="flex flex-col">
            <div className="flex gap-1">
              <span className="min-w-20">{suName}</span>
              <Badge>{yuhyungName}</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base">({chartNo})</div>
          <div className="flex items-center gap-1">
            <span className="text-base">{formatYmdToShort(birthday)}</span>
            <span>
              ({age} / {sex})
            </span>
          </div>
        </div>
      </div>
      <div className="my-2 h-[1px] w-full bg-slate-200" />
      <div className="grid grid-cols-2">
        <SubData title="진료실" text={jinchalName} />
        {ibYmd && <SubData title="입원일자" text={formatYmdToShort(ibYmd)} />}
        {wardName && <SubData title="병동" text={wardName} />}
      </div>
    </Card>
  );
}

function SubData({ title, text }: { title: string; text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500">{title}</span>
      <span className="text-base font-semibold">{text}</span>
    </div>
  );
}

// function SubData({ title, text }: { title: string; text: string }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-sm text-slate-500">{title}</span>
//       <span className="text-base font-semibold">{text}</span>
//     </div>
//   );
// }
