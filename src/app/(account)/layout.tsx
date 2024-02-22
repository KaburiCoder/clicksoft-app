import { ChildrenProps } from "@/lib/props/base-props";
import React from "react";

export default function AccountLayout({ children }: ChildrenProps) {
  return <div className="h-full flex-center bg-gray-300">{children}</div>;
}
