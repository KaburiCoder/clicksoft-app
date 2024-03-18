"use client";
import { useEffect, useState } from "react";

export function useCSR() {
  const [isCSR, setIsCSR] = useState<boolean>(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  const isWindowUndefined = typeof window === "undefined";

  return {
    isCSR: isCSR && !isWindowUndefined,
  };
}
