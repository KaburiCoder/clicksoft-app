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
import { useVirtualized } from "./use-virtualized";
import { PtProgress } from "@/sockets/models/pt-progress";
import { Insulin } from "@/sockets/models/insulin";
import { FirstChart } from "@/sockets/models/first-chart";
import { Scan } from "@/sockets/models/scan";
import { ScanImage } from "@/sockets/models/scan-image";
import { Consultation } from "@/sockets/models/consultation";
import { ObservationChart } from "@/sockets/models/observation-chart";

interface Props<T> {
  eventName: string;
  searchState: SearchState<T> | undefined;
}

export function useEmit<T>({ eventName, searchState }: Props<T>) {
  const { socket } = useSocket();
  const searchControlRef = useRef<SearchControlRef>(null);
  const { patInfo } = usePatientStore();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const dataWrapperRef = useRef<HTMLDivElement>(null);
  const {
    setProgress,
    setNursingRecord,
    setVitalSign,
    setIOSheet,
    setPtProgress,
    setInsulin,
    setFirstChart,
    setScan,
    setScanImage,
    setConsultation,
    setObservationChart,
  } = useSearchDataStore();

  function setData(result: AppResult<T>, args: SearchArgs | null) {
    switch (eventName) {
      case emitPaths.getProgressNote:
        setProgress({
          data: result.dataList as ProgressNote[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getNursingRecord:
        setNursingRecord({
          data: result.dataList as NursingRecord[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getVitalSign:
        setVitalSign({
          data: result.dataList as VitalSign[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getIOSheet:
        setIOSheet({
          data: result.dataList as IOSheet[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getPtProgress:
        setPtProgress({
          data: result.dataList as PtProgress[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getInsulin:
        setInsulin({
          data: result.dataList as Insulin[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getFirstChart:
        setFirstChart({
          data: result.dataList as FirstChart[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getScan:
        setScan({
          data: result.dataList as Scan[],
          dates: args!.dates,
        });
        break;
      case emitPaths.getScanImage:
        setScanImage({
          data: result.dataList as ScanImage[],
          dates: undefined,
        });
        break;
      case emitPaths.getConsultation:
        setConsultation({
          data: result.dataList as Consultation[],
          dates: undefined,
        });
        break;
      case emitPaths.getObservationChart:
        setObservationChart({
          data: result.dataList as ObservationChart[],
          dates: undefined,
        });
        break;
    }
  }

  async function handleSearch(
    args: SearchArgs | null,
    params: { [key: string]: any } = {},
    signal: AbortSignal | undefined = undefined,
  ) {
    setIsPending(true);
    setError(undefined);

    const resultPromise: Promise<AppResult<T>> | undefined =
      socket?.emitWithAck(eventName, {
        chartNo: patInfo?.chartNo!,
        startDate: args?.dates.from!,
        endDate: args?.dates.to!,
        ...params,
      });

    const abortPromise = new Promise<AppResult<T>>((resolve) => {
      signal?.addEventListener("abort", () => {
        return resolve({ status: "aborted" });
      });
    });

    const result = await Promise.race([resultPromise, abortPromise]);

    setIsPending(false);

    if (dataWrapperRef.current) dataWrapperRef.current.scrollTop = 0;
    if (result?.status === "aborted") {
      setData(result, args);
    } else if (result?.status === "success") {
      setData(result, args);
    } else {
      setError(result?.message);
    }
  }

  const clear = () => {
    setData({} as AppResult<T>, null);
  };

  const { inViewEl, items } = useVirtualized<T>({
    baseItems: searchState?.data,
    count: 20,
  });

  return {
    items,
    inViewEl,
    dates: searchState?.dates,
    error,
    isPending,
    dataWrapperRef,
    searchControlRef,
    handleSearch,
    clear,
  };
}
