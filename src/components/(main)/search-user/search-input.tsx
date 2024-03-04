import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchInput({
  delayMs = 500,
  onChange,
}: {
  delayMs?: number;
  onChange: (text: string) => void;
}) {
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
      icon={Search}
      placeholder="이름, 차트번호, 생년월일 등.."
      onChange={handleChange}
    />
  );
}
