import { useSessionEx } from "@/lib/hooks/useSessionEx";
import { evPaths } from "@/paths";
import { GetPatientInfoDto, Weib } from "@/sockets/dtos/get-patient-info.dto";
import { useSocket } from "@/sockets/socket.provider";
import { useState } from "react";
import { PatientInfo } from "@/sockets/models/patient-info";
import { GetPatientInfoResult } from "@/sockets/results/get-patient-info.result";
import { DataType } from "@/sockets/dtos/_room-base.dto";
import { extractNumbersFromString } from "@/lib/utils/format-texts";

export const useSearchUserHook = () => {
  const { user } = useSessionEx();
  const { socket } = useSocket();
  const [isPending, setIsPending] = useState(false);
  const [basePatientInfos, setBasePatientInfos] = useState<PatientInfo[]>();
  const [patientInfos, setPatientInfos] = useState<PatientInfo[] | undefined>();

  async function emitGetPatientInfo(weib: Weib) {
    if (!user) return;

    try {
      setIsPending(true);
      let result: GetPatientInfoResult = await socket?.emitWithAck(
        evPaths.getPatientInfo,
        {
          key: user.key,
          localId: user.localId,
          dataType: DataType.WEB,
          weib,
        } satisfies GetPatientInfoDto,
      );

      if (result.status === "error") {
        throw new Error(result.message);
      }
      setBasePatientInfos(result.patientInfos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }

  function search(text: string) {
    const includesText = (target: string, value: string) =>
      target?.toLowerCase().includes(value?.toLowerCase());
    const textNumbers = extractNumbersFromString(text);
    const searchedData = basePatientInfos?.filter(
      (p) =>
        includesText(p.suName, text) ||
        (textNumbers && includesText(p.birthday, textNumbers)) ||
        (textNumbers && includesText(p.chartNo, textNumbers)),
    );
    setPatientInfos(searchedData);
  }

  return {
    search,
    isPending,
    patientInfos: patientInfos ?? basePatientInfos,
    emitGetPatientInfo,
  };
};
