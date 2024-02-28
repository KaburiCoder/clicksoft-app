import { ChildrenProps } from "@/lib/props/base-props";

export default function MainLayout({ children }: ChildrenProps) {
  return <div className="flex h-full w-full flex-col">{children}</div>;
}
