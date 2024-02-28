import {
  SearchArgs,
  SearchControlRef,
} from "@/components/custom/search-control";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { PatientInfo } from "@/sockets/models/patient-info";
import { ProgressNote } from "@/sockets/models/progress-note";
import { AppResult } from "@/sockets/results/app.result";
import { useSocket } from "@/sockets/socket.provider";
import usePatientStore from "@/stores/patient.store";
import { useSearchDataStore } from "@/stores/search-data.store";
import { useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface Props<T> {
  emitCb: (
    socket: Socket | null,
    patInfo: PatientInfo | undefined,
    args: SearchArgs,
  ) => Promise<AppResult<T>> | undefined;
  kind: "progressNote" | "nursingRecord";
}
export function useEmit<T>({ emitCb, kind }: Props<T>) {
  const { socket } = useSocket();
  const searchControlRef = useRef<SearchControlRef>(null);
  const { patInfo } = usePatientStore();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const dataWrapperRef = useRef<HTMLDivElement>(null);
  const { setProgress, setNursingRecord } = useSearchDataStore();

  async function handleSearch(args: SearchArgs) {
    setIsPending(true);
    setError(undefined);

    const result: AppResult<T> | undefined = await emitCb(
      socket,
      patInfo,
      args,
    );
    setIsPending(false);

    if (dataWrapperRef.current) dataWrapperRef.current.scrollTop = 0;
    if (result?.status === "success") {
      switch (kind) {
        case "progressNote":
          setProgress({
            data: result.dataList as ProgressNote[],
            dates: args.dates,
          });
          break;
        case "nursingRecord":
          setNursingRecord({
            data: result.dataList as NursingRecord[],
            dates: args.dates,
          });
          break;
      }
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
