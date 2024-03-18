"use client";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";

interface Props {
  title: string;
  description: string;
  lottie: React.FC<any>;
  href?: string;
}
export function MenuCard({ title, description, lottie: Lottie, href }: Props) {
  const { push } = useRouter();

  function handleClick(): void {
    if (href) push(href);
  }

  return (
    <Card
      className="relative h-44 p-4 hover:cursor-pointer hover:bg-green-50"
      onClick={handleClick}
    >
      <div>
        <h3 className="pb-2 text-xl font-semibold">{title}</h3>
        <div className="text-sm text-slate-500">{description}</div>
      </div>
      <Lottie />
    </Card>
  );
}
