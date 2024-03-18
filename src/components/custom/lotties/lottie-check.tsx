import React from "react";
import Lottie from "react-lottie-player";
import RedCheckAnimation from "@/public/lotties/red-check-animation.json";
import { ClassNameProps } from "@/lib/props/base-props";

export function LottieRedCheck({ className }: ClassNameProps) {
  return (
    <Lottie
      className={className}
      animationData={RedCheckAnimation}
      play
      speed={0.5}
    />
  );
}
