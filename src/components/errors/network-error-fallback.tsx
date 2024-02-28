"use client";
import React from "react";
import ButtonL from "../ui/custom/button-l";

interface Props {
  error: Error;
  reset: () => void;
}
export default function NetworkErrorFallback({ error, reset }: Props) {
  return (
    <div>
      <div>{error.message}</div>
      <ButtonL onClick={reset}>재시도</ButtonL>
    </div>
  );
}
