import { ChildrenProps } from "@/lib/props/base-props";
import React from "react";

export default function MainLayout({ children }: ChildrenProps) {
  return <div className="flex h-full flex-col w-full">{children}</div>;
}
