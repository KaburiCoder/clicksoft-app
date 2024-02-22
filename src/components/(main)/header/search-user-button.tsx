import React from "react";
import ButtonL from "../../ui/custom/button-l";
import { UserRoundSearch } from "lucide-react";
import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import RoundButton from "@/components/custom/round-button";

export default function SearchUserButton() {
  const { push } = useRouter();

  function handleCllick(): void {
    push(paths.searchUser);
  }

  return (
    <RoundButton onClick={handleCllick}>
      <UserRoundSearch />
    </RoundButton>
  );
}
