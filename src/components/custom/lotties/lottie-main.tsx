import React from "react";
import Lottie from "react-lottie-player";
import ProgressNoteAnimation from "@/public/lotties/progressnote-animation.json";
import NursingRecordAnimation from "@/public/lotties/nursingrecord-animation.json";
import VitalSignAnimation from "@/public/lotties/vitalsign-animation.json";
import IOSheetAnimation from "@/public/lotties/iosheet-animation.json";
import PtProgressAnimation from "@/public/lotties/ptprogress-animation.json";
import InsulinAnimation from "@/public/lotties/insulin-animation.json";
import FirstChartAnimation from "@/public/lotties/firstchart-animation.json";
import ScanAnimation from "@/public/lotties/scan-animation.json";
import ConsultAnimation from "@/public/lotties/consult-animation.json";
import ObservationAnimation from "@/public/lotties/observation-animation.json";
import BasicExamAnimation from "@/public/lotties/basic-exam-animation.json";

export function LottieProgressNote() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-16 w-16"
      animationData={ProgressNoteAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieNursingRecord() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-16 w-16"
      animationData={NursingRecordAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieVitalSign() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-20 w-20"
      animationData={VitalSignAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieIOSheet() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-12 w-12"
      animationData={IOSheetAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottiePtProgress() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-20 w-20"
      animationData={PtProgressAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieInsulin() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-14 w-14"
      animationData={InsulinAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieFirstChart() {
  return (
    <Lottie
      className="absolute bottom-4 right-7 h-12 w-12"
      animationData={FirstChartAnimation}
      play
      speed={0.5}
    />
  );
}

export function LottieScan() {
  return (
    <Lottie
      className="absolute bottom-4 right-6 h-12 w-12"
      animationData={ScanAnimation}
      play
      speed={1}
    />
  );
}

export function LottieConsult() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-16 w-16"
      animationData={ConsultAnimation}
      play
      speed={1}
    />
  );
}

export function LottieObservation() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-16 w-16"
      animationData={ObservationAnimation}
      play
      speed={1}
    />
  );
}

export function LottieBasicExam() {
  return (
    <Lottie
      className="absolute bottom-4 right-4 h-16 w-16"
      animationData={BasicExamAnimation}
      play
      speed={1}
    />
  );
}
