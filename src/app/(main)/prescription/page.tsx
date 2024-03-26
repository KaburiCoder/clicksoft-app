import MainHeader from "@/components/(main)/header/header";
import PrescriptionBody from "@/components/(main)/prescription/prescription-body";
import React from "react";

export default function PrescriptionPage() {
  return (
    <>
      <MainHeader>진료내역 조회</MainHeader>
      <PrescriptionBody />
    </>
  );
}
