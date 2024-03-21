import {
  SearchArgs,
  SearchControlRef,
} from "@/components/custom/search-control";
import { emitPaths } from "@/paths";
import { AppResult } from "@/sockets/results/app.result";
import { JoinRoomState, useSocket } from "@/sockets/socket.provider";
import usePatientStore from "@/stores/patient.store";
import { SearchState, useSearchDataStore } from "@/stores/search-data.store";
import { useEffect, useRef, useState } from "react";
import { useInViewEx } from "./use-in-view-ex";

interface Props<T> {
  eventName: string;
  searchState: SearchState<T> | undefined;
}

export function useEmit<T>({ eventName, searchState }: Props<T>) {
  const { socket, joinRoomState } = useSocket();
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
    setBasicExam,
  } = useSearchDataStore();

  function setData(
    result: AppResult<T>,
    args: SearchArgs,
    clear: boolean = false,
  ) {
    const { dates, page, count, etcParams } = args;
    const stateData = page === 1 ? [] : searchState?.data ?? [];
    const resultData = result.dataList ?? [];
    const state: SearchState<any> = {
      data: clear ? [] : [...stateData, ...resultData],
      dates,
      page,
      count,
      isEndPage: resultData.length === 0,
      etcParams,
    };

    const setStateObj: { [key: string]: (state: SearchState<any>) => void } = {
      [emitPaths.getProgressNote]: setProgress,
      [emitPaths.getNursingRecord]: setNursingRecord,
      [emitPaths.getVitalSign]: setVitalSign,
      [emitPaths.getIOSheet]: setIOSheet,
      [emitPaths.getPtProgress]: setPtProgress,
      [emitPaths.getInsulin]: setInsulin,
      [emitPaths.getFirstChart]: setFirstChart,
      [emitPaths.getScan]: setScan,
      [emitPaths.getScanImage]: setScanImage,
      [emitPaths.getConsultation]: setConsultation,
      [emitPaths.getObservationChart]: setObservationChart,
      [emitPaths.getBasicExam]: setBasicExam,
    };

    setStateObj[eventName](state);
  }

  async function handleSearch(
    args: SearchArgs | null,
    signal: AbortSignal | undefined = undefined,
  ) {
    setIsPending(true);
    setError(undefined);

    if (!args) {
      args = { dates: undefined };
    }
    args.page = args.page ?? 1;
    args.count = args.count ?? 10;

    const resultPromise: Promise<AppResult<T>> | undefined =
      socket?.emitWithAck(eventName, {
        chartNo: patInfo?.chartNo!,
        startDate: args?.dates?.from!,
        endDate: args?.dates?.to!,
        page: args.page,
        count: args.count,
        ...args.etcParams,
      });

    const abortPromise = new Promise<AppResult<T>>((resolve) => {
      signal?.addEventListener("abort", () => {
        return resolve({ status: "aborted" });
      });
    });

    const result = await Promise.race([resultPromise, abortPromise]);

    setIsPending(false);

    if (dataWrapperRef.current) dataWrapperRef.current.scrollTop = 0;
    if (result?.status === "aborted" || result?.status === "success") {
      setData(result, args);
    } else {
      setError(result?.message);
    }
  }

  const clear = () => {
    setData({} as AppResult<T>, { dates: undefined }, true);
  };

  const { inViewEl, inView } = useInViewEx();

  useEffect(() => {
    if (joinRoomState !== JoinRoomState.JOIN || !inView) return;
    const { dates, page, isEndPage, etcParams } = searchState || {};
    if (isEndPage) return;
    handleSearch({
      dates: dates,
      page: (page ?? 0) + 1,
      etcParams,
    });
  }, [inView, joinRoomState]);

  return {
    items: searchState?.data,
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
