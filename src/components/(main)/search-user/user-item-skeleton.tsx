import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { SquareUser } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserItemSkeleton() {
  return (
    <Card className="flex flex-col p-2 hover:cursor-pointer hover:bg-gray-50">
      <Skeleton className="flex items-center justify-between text-green-600">
        <Skeleton className="flex items-center gap-2 text-xl font-semibold">
          <SquareUser />
          <Skeleton className="flex flex-col">
            <Skeleton className="flex gap-1">
              <Badge>...</Badge>
            </Skeleton>
          </Skeleton>
        </Skeleton>
        <Skeleton className="flex flex-col">
          <Skeleton className="text-base">(.......)</Skeleton>
          <Skeleton className="flex items-center gap-1">
            {/* <span className="text-base">{birthday}</span>
            <span>
              ({age} / {sex})
            </span> */}
          </Skeleton>
        </Skeleton>
      </Skeleton>
      <Skeleton className="my-2 h-[1px] w-full bg-slate-200" />
      <Skeleton className="grid grid-cols-2">
        <SubData title="진료실" text="..." />
        <SubData title="입원일자" text="..." />
        <SubData title="병동" text="..." />
      </Skeleton>
    </Card>
  );
}

function SubData({ title, text }: { title: string; text: string }) {
  return (
    <Skeleton className="flex items-center gap-2">
      <span className="text-sm text-slate-500">{title}</span>
      <span className="text-base font-semibold">{text}</span>
    </Skeleton>
  );
}
