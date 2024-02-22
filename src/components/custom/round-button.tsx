"use client";
import React from "react";
import ButtonL from "../ui/custom/button-l";
import { cn } from "@/lib/utils";
import { ChildrenClassNameProps, ChildrenProps } from "@/lib/props/base-props";

interface Props extends ChildrenClassNameProps {
  onClick?: () => void;
}
export default function RoundButton({ className, children, onClick }: Props) {
  return (
    <ButtonL
      onClick={onClick}
      variant={"ghost"}
      className={cn(
        "flex-center h-10 w-10 overflow-hidden rounded-full p-2",
        "hover:cursor-pointer",
        className,
      )}
    >
      {children}
    </ButtonL>
  );
}
