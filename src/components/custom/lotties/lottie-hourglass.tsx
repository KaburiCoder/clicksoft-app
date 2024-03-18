import React from "react";
import HourglassAnimation from "@/public/lotties/hourglass-animation.json";
import Lottie from "react-lottie-player";
import { ClassNameProps } from "@/lib/props/base-props";

export default function LottieHourglass({ className }: ClassNameProps) {
  return (
    <Lottie
      className={className}
      animationData={HourglassAnimation}
      play
      speed={1}
    />
  );
}
