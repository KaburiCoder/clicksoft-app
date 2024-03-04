import { ChildrenProps } from "@/lib/props/base-props";
import React from "react";
import LottieSearch from "../custom/lotties/lottie-search";

export interface DataWrapperProps extends ChildrenProps {
  isPending?: boolean;
  error?: string;
}

const DataWrapper = React.forwardRef<HTMLDivElement, DataWrapperProps>(
  ({ error, isPending, children }: DataWrapperProps, ref) => {
    if (error) throw new Error(error);
    if (isPending) return <LottieSearch />;

    return (
      <div
        ref={ref}
        className="flex h-full flex-1 flex-col gap-2 overflow-auto p-2"
      >
        {children}
      </div>
    );
  },
);

DataWrapper.displayName = "DataWrapper";

export { DataWrapper };
