import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import SearchAnimationJson from "@/public/lotties/search-animation.json";
import ExPointAnimation from "@/public/lotties/expoint-animation.json";

export default function LottieSearch() {
  return (
    <Lottie
      className="m-auto h-full max-h-[40rem] w-full max-w-[40rem]"
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
