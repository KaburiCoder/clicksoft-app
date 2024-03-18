import MainHeader from "@/components/(main)/header/header";
import ObservationChartBody from "@/components/(main)/observation-chart/observation-chart-body";
import React from "react";

export default function ObservationChartPage() {
  return (
    <>
      <MainHeader>임상관찰 기록지</MainHeader>
      <ObservationChartBody />
    </>
  );
}
