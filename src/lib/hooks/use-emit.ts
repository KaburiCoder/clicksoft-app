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
import dayjs from "dayjs";
import { DateRangeType } from "../types/date.types";

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

  /** 기본 조회 기간 설정 */
  function getDateRange(
    dates: DateRangeType | undefined,
  ): DateRangeType | undefined {
    // 기초검사의 경우는 기간이 없음
    if (eventName === emitPaths.getBasicExam) {
      return undefined;
    }

    return (
      dates || {
        from: dayjs().subtract(1, "month").toDate(),
        to: dayjs().toDate(),
      }
    );
  }

  async function handleSearch(
    args: SearchArgs,
    signal: AbortSignal | undefined = undefined,
  ) {
    setIsPending(true);
    setError(undefined);

    args.page = args?.page ?? 1;
    const count = args?.count ?? 10;
    const resultPromise: Promise<AppResult<T>> | undefined =
      socket?.emitWithAck(eventName, {
        chartNo: patInfo?.chartNo!,
        startDate: args?.dates?.from,
        endDate: args?.dates?.to,
        page: args.page,
        count,
        ...args?.etcParams,
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

  // 스크롤 내릴 때 추가로 조회
  // 최초 로드 시에도 조회 시도함
  useEffect(() => {
    if (joinRoomState !== JoinRoomState.JOIN || !inView) return;
    const { dates, page, isEndPage, etcParams } = searchState || {};
    if (isEndPage) return;

    handleSearch({
      dates: getDateRange(dates),
      page: (page ?? 0) + 1,
      etcParams,
    });
  }, [inView, joinRoomState]);

  return {
    items: searchState?.data,
    inViewEl,
    dates: getDateRange(searchState?.dates),
    error,
    isPending,
    dataWrapperRef,
    searchControlRef,
    handleSearch,
    clear,
  };
}
