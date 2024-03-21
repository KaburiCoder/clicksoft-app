import { useSessionEx } from "@/lib/hooks/use-session-ex";
import { emitPaths } from "@/paths";
import { GetPatientInfoDto, Weib } from "@/sockets/dtos/get-patient-info.dto";
import { useSocket } from "@/sockets/socket.provider";
import { useEffect, useState } from "react";
import { PatientInfo } from "@/sockets/entities/patient-info";
import { extractNumbersFromString } from "@/lib/utils/format-texts";
import { AppResult } from "@/sockets/results/app.result";

interface Args {
  searchText: string | undefined;
}
export const useSearchUserHook = ({ searchText }: Args) => {
  const { user } = useSessionEx();
  const { socket } = useSocket();
  const [isPending, setIsPending] = useState(false);
  const [basePatientInfos, setBasePatientInfos] = useState<PatientInfo[]>();
  const [patientInfos, setPatientInfos] = useState<PatientInfo[] | undefined>();

  async function emitGetPatientInfo(weib: Weib) {
    if (!user) return;

    try {
      setIsPending(true);
      let result: AppResult<PatientInfo> = await socket?.emitWithAck(
        emitPaths.getPatientInfo,
        {
          weib,
        } satisfies GetPatientInfoDto,
      );

      if (result.status === "error") {
        throw new Error(result.message);
      }
      setBasePatientInfos(result.dataList);
    } catch (error) {
      setBasePatientInfos(undefined);
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    if (!searchText) {
      setPatientInfos(basePatientInfos);
      return;
    }

    const includesText = (target: string, value: string) =>
      target?.toLowerCase().includes(value?.toLowerCase());
    const textNumbers = extractNumbersFromString(searchText);
    const searchedData = basePatientInfos?.filter(
      (p) =>
        includesText(p.suName, searchText) ||
        (textNumbers && includesText(p.birthday, textNumbers)) ||
        (textNumbers && includesText(p.chartNo, textNumbers)),
    );
    setPatientInfos(searchedData);
  }, [basePatientInfos, searchText]);

  return {
    isPending,
    patientInfos: patientInfos ?? basePatientInfos,
    emitGetPatientInfo,
  };
};
