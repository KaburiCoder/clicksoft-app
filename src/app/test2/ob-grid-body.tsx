import { ChildrenClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import React from "react";

export function ObGridBody({ children, className }: ChildrenClassNameProps) {
  return (
    <div
      className={cn(
        "overflow-wrap-anywhere flex items-center overflow-hidden bg-white px-1 text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
