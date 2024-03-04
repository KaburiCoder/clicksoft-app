import {
  SearchArgs,
  SearchControlRef,
} from "@/components/custom/search-control";
import { emitPaths } from "@/paths";
import { IOSheet } from "@/sockets/models/io-sheet";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { ProgressNote } from "@/sockets/models/progress-note";
import { VitalSign } from "@/sockets/models/vital-sign";
import { AppResult } from "@/sockets/results/app.result";
import { useSocket } from "@/sockets/socket.provider";
import usePatientStore from "@/stores/patient.store";
import { SearchState, useSearchDataStore } from "@/stores/search-data.store";
import { useRef, useState } from "react";

interface Props {
  eventName: string;
}
export function useEmit<T>({ eventName }: Props) {
  const { socket } = useSocket();
  const searchControlRef = useRef<SearchControlRef>(null);
  const { patInfo } = usePatientStore();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const dataWrapperRef = useRef<HTMLDivElement>(null);
  const { setProgress, setNursingRecord, setVitalSign, setIOSheet } =
    useSearchDataStore();

  function setData(result: AppResult<T>, args: SearchArgs) {
    switch (eventName) {
      case emitPaths.getProgressNote:
        setProgress({
          data: result.dataList as ProgressNote[],
          dates: args.dates,
        });
        break;
      case emitPaths.getNursingRecord:
        setNursingRecord({
          data: result.dataList as NursingRecord[],
          dates: args.dates,
        });
        break;
      case emitPaths.getVitalSign:
        setVitalSign({
          data: result.dataList as VitalSign[],
          dates: args.dates,
        });
        break;
      case emitPaths.getIOSheet:
        setIOSheet({
          data: result.dataList as IOSheet[],
          dates: args.dates,
        });
        break;
    }
  }

  async function handleSearch(args: SearchArgs) {
    setIsPending(true);
    setError(undefined);

    const result: AppResult<T> | undefined = await socket?.emitWithAck(
      eventName,
      {
        chartNo: patInfo?.chartNo!,
        startDate: args.dates.from!,
        endDate: args.dates.to!,
      },
    );

    setIsPending(false);

    if (dataWrapperRef.current) dataWrapperRef.current.scrollTop = 0;
    if (result?.status === "success") {
      setData(result, args);
    } else {
      setError(result?.message);
    }
  }

  return {
    error,
    isPending,
    dataWrapperRef,
    searchControlRef,
    handleSearch,
  };
}
