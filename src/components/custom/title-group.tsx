import { ChildrenClassNameProps, ChildrenProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import { BadgeInfo } from "lucide-react";

interface Props extends ChildrenClassNameProps {
  title: string;
}

export function TitleGroup({ title, children, className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-4 p-2 border-b border-b-blue-200 mb-2 w-fit">
        <BadgeInfo className="text-blue-500" />
        <h2 className="text-xl font-bold text-blue-500">{title}</h2>
      </div>
      {children}
    </div>
  );
}
