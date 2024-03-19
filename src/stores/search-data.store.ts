import { DateRangeType } from "@/lib/types/date.types";
import { Consultation } from "@/sockets/models/consultation";
import { FirstChart } from "@/sockets/models/first-chart";
import { Insulin as Insulin } from "@/sockets/models/insulin";
import { IOSheet, IntakeInfo, OutputsInfo } from "@/sockets/models/io-sheet";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { ObservationChart } from "@/sockets/models/observation-chart";
import { ProgressNote } from "@/sockets/models/progress-note";
import { PtProgress } from "@/sockets/models/pt-progress";
import { Scan } from "@/sockets/models/scan";
import { ScanImage } from "@/sockets/models/scan-image";
import { VitalSign } from "@/sockets/models/vital-sign";
import { create } from "zustand";

export interface SearchState<T> {
  dates: DateRangeType | undefined;
  data: T[] | undefined;
  page?: number;
  count?: number;
  isEndPage?: boolean;
  etcParams?: { [key: string]: any };
}

interface State {
  nursingRecord?: SearchState<NursingRecord>;
  progress?: SearchState<ProgressNote>;
  vitalSign?: SearchState<VitalSign>;
  ioSheet?: SearchState<IOSheet>;
  ptProgress?: SearchState<PtProgress>;
  insulin?: SearchState<Insulin>;
  firstChart?: SearchState<FirstChart>;
  scan?: SearchState<Scan>;
  scanImage?: SearchState<ScanImage>;
  consultation?: SearchState<Consultation>;
  observationChart?: SearchState<ObservationChart>;
}

interface Actions {
  setNursingRecord: (state: SearchState<NursingRecord>) => void;
  setProgress: (state: SearchState<ProgressNote>) => void;
  setVitalSign: (state: SearchState<VitalSign>) => void;
  setIOSheet: (state: SearchState<IOSheet>) => void;
  setPtProgress: (state: SearchState<PtProgress>) => void;
  setInsulin: (state: SearchState<Insulin>) => void;
  setFirstChart: (state: SearchState<FirstChart>) => void;
  setScan: (state: SearchState<Scan>) => void;
  setScanImage: (state: SearchState<ScanImage>) => void;
  setConsultation: (state: SearchState<Consultation>) => void;
  setObservationChart: (state: SearchState<ObservationChart>) => void;
  clearAll: () => void;
}

const inititalState: State = {
  progress: undefined,
  nursingRecord: undefined,
  vitalSign: undefined,
  ioSheet: undefined,
  ptProgress: undefined,
  insulin: undefined,
  firstChart: undefined,
  scan: undefined,
  scanImage: undefined,
  consultation: undefined,
  observationChart: undefined,
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
  setPtProgress: (ptProgress) => set({ ptProgress }),
  setInsulin: (insulin) => set({ insulin }),
  setFirstChart: (firstChart) => set({ firstChart }),
  setScan: (scan) => set({ scan }),
  setScanImage: (scanImage) => set({ scanImage }),
  setConsultation: (consultation) => set({ consultation }),
  setObservationChart: (observationChart) => set({ observationChart }),
  clearAll: () => set(inititalState),
}));
