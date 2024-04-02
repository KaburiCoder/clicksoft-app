import { ChildrenProps } from "@/lib/props/base-props";
import React, { useRef } from "react";
import LottieSearch, { LottieExPoint } from "../custom/lotties/lottie-search";
import { useInView } from "framer-motion";

export interface DataWrapperProps extends ChildrenProps {
  isPending?: boolean;
  error?: string;
  inView?: React.ReactNode;
}

const DataWrapper = React.forwardRef<HTMLDivElement, DataWrapperProps>(
  ({ error, isPending, inView, children }: DataWrapperProps, ref) => {
    if (error) return <ClientConnectError error={error} />;

    return (
      <div
        ref={ref}
        className="relative flex h-full flex-1 flex-col gap-2 overflow-auto p-2"
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

function ClientConnectError({ error }: { error: string | undefined }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 pt-28">
      <LottieExPoint />
      <div className="pb-4 text-xl font-bold text-error">{error}</div>
    </div>
  );
}
