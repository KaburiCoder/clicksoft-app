import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { insulinPartLocation } from "@/lib/constraints/insulin-part-location";
import { LottieRedCheck } from "@/components/custom/lotties/lottie-check";

interface Props {
  header: React.ReactNode;
  part: string | undefined;
  trigger: React.ReactNode;
}

export default function InsulinPartDialog({ header, part, trigger }: Props) {
  const partLocation = insulinPartLocation[part ?? -1];
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90%] max-w-fit overflow-auto">
        <DialogHeader>{header}</DialogHeader>
        <div className="relative h-[550px] w-[373px]">
          <LottieRedCheck
            className={cn("absolute h-12 w-12 text-red-500", partLocation)}
          />
          {/* <CheckCircle2
            className={cn("absolute h-12 w-12 text-red-500", partLocation)}
          /> */}
          <Image
            className=""
            src={"/images/insulin.png"}
            alt="인슐린"
            width={373}
            height={550}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
