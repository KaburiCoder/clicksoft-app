"use client";
import { ChildrenClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import React from "react";

export default function HeaderWrapper({
  className,
  children,
}: ChildrenClassNameProps) {
  // const { scrollY } = useScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-10 mx-auto flex h-header w-full items-center justify-between border-b bg-white px-4 py-2",
        className,
      )}
    >
      {children}
    </header>
  );
}
