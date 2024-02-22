import {
  ChildrenClassNameProps,
  ChildrenProps,
  ClassNameProps,
} from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends ChildrenClassNameProps { }

export default function MainWrapper({ className, children }: Props) {
  return <main className={cn("px-4 overflow-hidden", className)}>{children}</main>;
}
