import React from "react";
import Lottie from "react-lottie-player";
import ProgressNoteAnimation from "@/public/lotties/progressnote-animation.json";
import NursingRecordAnimation from "@/public/lotties/nursingrecord-animation.json";
import VitalSignAnimation from "@/public/lotties/vitalsign-animation.json";
import IOSheetAnimation from "@/public/lotties/iosheet-animation.json";
import PtProgressAnimation from "@/public/lotties/ptprogress-animation.json";

export function LottieProgressNote() {
  return (
    <Lottie
      className="h-20 w-20"
      animationData={ProgressNoteAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieNursingRecord() {
  return (
    <Lottie
      className="h-20 w-20"
      animationData={NursingRecordAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieVitalSign() {
  return (
    <Lottie
      className="h-20 w-20"
      animationData={VitalSignAnimation}
      play
      speed={0.5}
    />
  );
}


export function LottieIOSheet() {
  return (
    <Lottie
      className="h-20 w-20 p-4"
      animationData={IOSheetAnimation}
      play
      speed={0.5}
    />
  );
}


export function LottiePtProgress() {
  return (
    <Lottie
      className="h-20 w-20"
      animationData={PtProgressAnimation}
      play
      speed={0.5}
    />
  );
}
