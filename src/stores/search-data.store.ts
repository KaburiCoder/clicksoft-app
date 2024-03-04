import { DateRangeType } from "@/lib/types/date.types";
import { IOSheet, IntakeInfo, OutputsInfo } from "@/sockets/models/io-sheet";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { ProgressNote } from "@/sockets/models/progress-note";
import { VitalSign } from "@/sockets/models/vital-sign";
import { create } from "zustand";

export interface SearchState<T> {
  dates: DateRangeType | undefined;
  data: T[] | undefined;
}

interface State {
  nursingRecord?: SearchState<NursingRecord>;
  progress?: SearchState<ProgressNote>;
  vitalSign?: SearchState<VitalSign>;
  ioSheet?: SearchState<IOSheet>;
}

interface Actions {
  setNursingRecord: (state: SearchState<NursingRecord>) => void;
  setProgress: (state: SearchState<ProgressNote>) => void;
  setVitalSign: (state: SearchState<VitalSign>) => void;
  setIOSheet: (state: SearchState<IOSheet>) => void;
  clearAll: () => void;
}

const inititalState: State = {
  progress: undefined,
  nursingRecord: undefined,
  vitalSign: undefined,
  ioSheet: undefined,
};

export const useSearchDataStore = create<State & Actions>((set) => ({
  ...inititalState,
  setNursingRecord: (nursingRecord) => set(() => ({ nursingRecord })),
  setProgress: (progress) => set(() => ({ progress })),
  setVitalSign: (vitalSign) => set(() => ({ vitalSign })),
  setIOSheet: (ioSheet) =>
    set(() => {
      ioSheet.data?.forEach((d) => {
        d.intake = Object.assign(new IntakeInfo(), { ...d.intake });
        d.outputs = Object.assign(new OutputsInfo(), { ...d.outputs });
      });
      return { ioSheet };
    }),
  clearAll: () => set(inititalState),
}));
