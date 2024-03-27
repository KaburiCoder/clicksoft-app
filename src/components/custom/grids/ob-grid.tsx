import { cn } from "@/lib/utils";
import React from "react";
import styles from "./ob-grid.module.scss";
import { ChildrenClassNameProps } from "@/lib/props/base-props";

interface Props extends ChildrenClassNameProps {
  gridType?: "insulin" | "textList" | "rx-order" | "rx-diagnosis";
}

export default function ObGrid({ children, className, gridType }: Props) {
  return (
    <div
      className={cn(
        "grid gap-[1px] bg-blue-300 p-[1px]",
        styles[gridType ?? ""],
        className,
      )}
    >
      {children}
    </div>
  );
}
