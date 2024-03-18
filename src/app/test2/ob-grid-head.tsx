import { ChildrenClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";

export function ObGridHead({ children, className }: ChildrenClassNameProps) {
  return (
    <div className={cn("flex-center bg-blue-100 text-center", className)}>
      {children}
    </div>
  );
}
