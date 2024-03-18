import MainHeader from "@/components/(main)/header/header";
import InsulinBody from "@/components/(main)/insulin/insulin-body";
import React from "react";

export default function InsulinPage() {
  return (
    <>
      <MainHeader>인슐린 조회</MainHeader>
      <InsulinBody />
    </>
  );
}
