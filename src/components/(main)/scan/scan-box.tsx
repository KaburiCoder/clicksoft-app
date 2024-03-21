"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Scan } from "@/sockets/entities/scan";
import ScanImagesDrawer from "./scan-images-drawer";

interface Props {
  shortDate: string;
  scans: Scan[];
}

export default function ScanBox({ shortDate, scans }: Props) {
  return (
    <Collapsible
      key={shortDate}
      defaultOpen={true}
      className="w-full overflow-hidden rounded border border-primary-sm shadow"
    >
      <CollapsibleTrigger className="w-full bg-green-25 p-4 text-start shadow">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-primary">{shortDate}</span>
          <ChevronDown className="text-gray-500" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2">
        {scans.map((scan) => (
          <ScanImagesDrawer
            key={scan.id}
            scan={scan}
            trigger={
              <div className="flex gap-4 border-b p-2 hover:cursor-pointer hover:bg-slate-100">
                <div>{scan.name}</div>
                <div>{scan.code}</div>
              </div>
            }
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
