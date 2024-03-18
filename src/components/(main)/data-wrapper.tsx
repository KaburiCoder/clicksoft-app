import { ChildrenProps } from "@/lib/props/base-props";
import React, { useRef } from "react";
import LottieSearch from "../custom/lotties/lottie-search";
import { useInView } from "framer-motion";

export interface DataWrapperProps extends ChildrenProps {
  isPending?: boolean;
  error?: string;
  inView?: React.ReactNode;
}

const DataWrapper = React.forwardRef<HTMLDivElement, DataWrapperProps>(
  ({ error, isPending, inView, children }: DataWrapperProps, ref) => {
    if (error) throw new Error(error);
    return (
      <div
        ref={ref}
        className="flex h-full flex-1 flex-col gap-2 overflow-auto p-2 relative"
      >
        {isPending && <LottieSearch />}
        {children}
        {inView}
      </div>
    );
  },
);

DataWrapper.displayName = "DataWrapper";

export { DataWrapper };
