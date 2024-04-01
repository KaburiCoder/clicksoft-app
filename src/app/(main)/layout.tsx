import { ChildrenProps } from "@/lib/props/base-props";

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <div className="flex min-h-full w-full flex-col bg-gradient-to-br from-green-25 via-white to-green-25">
      {children}
    </div>
  );
}
