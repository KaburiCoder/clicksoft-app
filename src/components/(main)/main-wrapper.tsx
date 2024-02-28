import { ChildrenClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends ChildrenClassNameProps { }

export default function MainWrapper({ className, children }: Props) {
  return (
    <main
      className={cn("flex h-full flex-col overflow-hidden bg-white", className)}
    >
      {children}
    </main>
  );
}
