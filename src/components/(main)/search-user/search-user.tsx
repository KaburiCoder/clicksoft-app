"use client";
import React, { useEffect, useState } from "react";
import MainWrapper from "../main-wrapper";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UserItemList from "./user-item-list";
import { RadioButton } from "@/components/custom/radio-button";
import { Weib } from "@/sockets/dtos/get-patient-info.dto";
import { useSearchUserHook } from "./use-search-user.hook";
import { JoinRoomState, useSocket } from "@/sockets/socket.provider";

export default function SearchUser() {
  const { search, isPending, emitGetPatientInfo, patientInfos } =
    useSearchUserHook();
  const { joinRoomState } = useSocket();
  const defaultWeib = Weib.입원;

  useEffect(() => {
    if (joinRoomState !== JoinRoomState.JOIN) return;
    emitGetPatientInfo(defaultWeib);
  }, [joinRoomState]);

  function handleSearch(text: string): void {
    search(text);
  }

  return (
    <MainWrapper className="gap-2 p-2">
      <SearchInput onChange={handleSearch} />
      <RadioButton
        isPending={isPending}
        defaultValue={defaultWeib.toString()}
        items={[
          { value: Weib.입원.toString(), text: "입원" },
          // { value: Weib.외래.toString(), text: "외래" },
          { value: Weib.전체.toString(), text: "전체" },
        ]}
        onChange={(weib) => {
          emitGetPatientInfo(+weib as Weib);
        }}
      />
      <UserItemList patientInfos={patientInfos} isPending={isPending} />
    </MainWrapper>
  );
}

function SearchInput({
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
