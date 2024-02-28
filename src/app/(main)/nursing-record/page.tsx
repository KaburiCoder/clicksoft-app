import MainHeader from "@/components/(main)/header/header";
import NursingRecordBody from "@/components/(main)/nursing-record/nursing-record-body";
import React from "react";

export default function NursingRecordPage() {
  return (
    <>
      <MainHeader>간호기록 조회</MainHeader>
      <NursingRecordBody />
    </>
  );
}
