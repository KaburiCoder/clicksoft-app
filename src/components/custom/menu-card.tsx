"use client";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";

interface Props {
  title: string;
  description: string;
  icon: React.FC<any>;
  href?: string;
}
export function MenuCard({ title, description, icon: Icon, href }: Props) {
  const { push } = useRouter();

  function handleClick(): void {
    if (href) push(href);
  }

  return (
    <Card
      className="p-4 hover:cursor-pointer hover:bg-green-50"
      onClick={handleClick}
    >
      <div>
        <h3 className="pb-2 text-xl font-semibold">{title}</h3>
        <div className="text-sm text-slate-500">{description}</div>
      </div>
      <div className="flex w-full justify-end">
        <Icon className="!h-8 !w-8 text-green-800" />
      </div>
    </Card>
  );
}
