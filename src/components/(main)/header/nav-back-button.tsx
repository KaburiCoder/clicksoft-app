import ButtonL from "@/components/ui/custom/button-l";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavBackButton() {
  const { back } = useRouter();

  return (
    <ButtonL className="rounded-full p-2" variant="ghost" onClick={back}>
      <ChevronLeft className="hover:cursor-pointer" />
    </ButtonL>
  );
}
