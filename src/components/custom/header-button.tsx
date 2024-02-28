"use client";
import React from "react";
import ButtonL from "../ui/custom/button-l";
import { cn } from "@/lib/utils";
import { ChildrenClassNameProps, ChildrenProps } from "@/lib/props/base-props";

interface Props extends ChildrenClassNameProps {
  onClick?: () => void;
}
export default function HeaderButton({ className, children, onClick }: Props) {
  return (
    <ButtonL
      onClick={onClick}
      variant={"ghost"}
      className={cn(
        "flex-center header-item overflow-hidden rounded border border-solid border-primary/30 p-2",
        "hover:cursor-pointer",
        className,
      )}
    >
      {children}
    </ButtonL>
  );
}
