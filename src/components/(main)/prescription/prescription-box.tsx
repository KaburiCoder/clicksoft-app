import { Prescription } from "@/sockets/entities/prescription";
import React from "react";
import { SearchDataBox } from "../search-data-box";
import OrderBox from "./boxes/order-box";
import DiagnosisBox from "./boxes/diagnosis-box";
import MedicalNotesBox from "./boxes/medical-notes-box";

interface Props {
  prescription: Prescription;
}
export default function PrescriptionBox({ prescription }: Props) {
  return (
    <SearchDataBox
      contents={prescription.headers}
      childrenClassName="flex flex-col gap-4"
    >
      <div className="flex h-fit flex-col gap-4 overflow-hidden">
        <DiagnosisBox diagnosises={prescription.diagnosises} />
        <OrderBox orders={prescription.orders} />
        <MedicalNotesBox medicalNotes={prescription.medicalNotes} />
      </div>
    </SearchDataBox>
  );
}
