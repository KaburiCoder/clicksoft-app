"use client";
import React, { useEffect, useRef, useState } from "react";
import MainWrapper from "../main-wrapper";
import UserItemList from "./user-item-list";
import { RadioButton } from "@/components/custom/radio-button";
import { Weib } from "@/sockets/dtos/get-patient-info.dto";
import { JoinRoomState, useSocket } from "@/sockets/socket.provider";
import { SearchInput } from "./search-input";
import { useEmit } from "@/lib/hooks/use-emit";
import { useSearchDataStore } from "@/stores/search-data.store";
import { emitPaths } from "@/paths";

export default function SearchUser() {
  const [searchText, setSearchText] = useState<string>();
  const [weib, setWeib] = useState<Weib>(Weib.입원);
  const { patientInfo } = useSearchDataStore();

  const { items, inViewEl, handleSearch, isPending, error } = useEmit<any>({
    eventName: emitPaths.getPatientInfo,
    searchState: patientInfo,
    doNotFirstLoading: true,
  });

  const { joinRoomState } = useSocket();
  const defaultWeib = Weib.입원;

  useEffect(() => {
    if (joinRoomState !== JoinRoomState.JOIN) return;
    handleSearch({
      page: 1,
      searchString: searchText,
      count: 10,
      etcParams: { weib },
    });
  }, [joinRoomState, searchText, weib]);

  return (
    <>
      <div className="sticky top-header z-10 space-y-1 bg-white p-2 pb-1 shadow">
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
            setWeib(+weib);
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
