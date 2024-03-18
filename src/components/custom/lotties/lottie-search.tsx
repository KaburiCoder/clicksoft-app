import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import SearchAnimationJson from "@/public/lotties/search-animation.json";
import ExPointAnimation from "@/public/lotties/expoint-animation.json";

export default function LottieSearch() {
  return (
    <Lottie
      className="absolute left-1/2 top-1/2 m-auto h-full max-h-[40rem] w-full max-w-[40rem] -translate-x-1/2 -translate-y-1/2 z-10"
      animationData={SearchAnimationJson}
      play
    />
  );
}

export function LottieExPoint() {
  return (
    <Lottie
      className="max-w-[18rem]"
      animationData={ExPointAnimation}
      play
      loop={false}
    />
  );
}
