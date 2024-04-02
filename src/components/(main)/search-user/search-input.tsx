import { Input } from "@/components/ui/input";
import { ClassNameProps } from "@/lib/props/base-props";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

interface Props extends ClassNameProps {
  delayMs?: number;
  onChange: (text: string) => void;
}

export function SearchInput({ className, delayMs = 300, onChange }: Props) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeout = setTimeout(() => {
      onChange(e.target.value);
    }, delayMs);

    setTimeoutId(newTimeout);
  }

  return (
    <Input
      className="text-base"
      wrapperClassName={className}
      autoFocus
      icon={Search}
      placeholder="이름, 차트번호, 생년월일 등.."
      onChange={handleChange}
    />
  );
}
