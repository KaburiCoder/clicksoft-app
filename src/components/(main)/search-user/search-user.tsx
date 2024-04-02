"use client";
import React, { useEffect, useRef, useState } from "react";
import MainWrapper from "../main-wrapper";
import UserItemList from "./user-item-list";
import { RadioButton } from "@/components/custom/radio-button";
import { Weib } from "@/sockets/dtos/get-patient-info.dto";
import { useSearchUserHook } from "./use-search-user.hook";
import { JoinRoomState, useSocket } from "@/sockets/socket.provider";
import { useVirtualized } from "@/lib/hooks/use-virtualized";
import { PatientInfo } from "@/sockets/entities/patient-info";
import { SearchInput } from "./search-input";

export default function SearchUser() {
  const [searchText, setSearchText] = useState<string>();
  const { isPending, emitGetPatientInfo, patientInfos } = useSearchUserHook({
    searchText,
  });
  const { joinRoomState } = useSocket();
  const defaultWeib = Weib.입원;

  useEffect(() => {
    if (joinRoomState !== JoinRoomState.JOIN) return;
    emitGetPatientInfo(defaultWeib);
  }, [joinRoomState]);

  const { inViewEl, items } = useVirtualized<PatientInfo>({
    baseItems: patientInfos,
    count: 20,
  });

  return (
    <>
      <div className="top-header sticky z-10 space-y-1 bg-white p-2 pb-1 shadow">
        <SearchInput onChange={setSearchText} />
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
      </div>
      <MainWrapper className="gap-2 p-2">
        <UserItemList
          patientInfos={items}
          isPending={isPending}
          bottomComponents={inViewEl}
        />
      </MainWrapper>
    </>
  );
}
