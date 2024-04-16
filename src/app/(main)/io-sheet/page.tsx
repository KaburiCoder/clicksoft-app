"use client";
import { createPortal } from "react-dom";
import MainHeader from "@/components/(main)/header/header";
import IOSheetBody from "@/components/(main)/io-sheet/io-sheet-body";
import React from "react";
import { useCSR } from "kbr-nextjs-shared/hooks";

export default function IOSheetPage() {
  const { isCSR } = useCSR();

  if (!isCSR) return <></>;

  return createPortal(
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans antialiased">
      <MainHeader>I/O Sheet</MainHeader>
      <IOSheetBody />
    </div>,
    document.getElementById("screen-root")!,
  );
}
