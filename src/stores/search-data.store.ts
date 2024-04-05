import { SearchArgs } from "@/components/custom/search-control";
import { BasicExam } from "@/sockets/entities/basic-exam";
import { Consultation } from "@/sockets/entities/consultation";
import { FirstChart } from "@/sockets/entities/first-chart";
import { Insulin as Insulin } from "@/sockets/entities/insulin";
import { IOSheet, IntakeInfo, OutputsInfo } from "@/sockets/entities/io-sheet";
import { NursingRecord } from "@/sockets/entities/nursing-record";
import { ObservationChart } from "@/sockets/entities/observation-chart";
import { Prescription } from "@/sockets/entities/prescription";
import { ProgressNote } from "@/sockets/entities/progress-note";
import { PtProgress } from "@/sockets/entities/pt-progress";
import { Scan } from "@/sockets/entities/scan";
import { ScanImage } from "@/sockets/entities/scan-image";
import { VitalSign } from "@/sockets/entities/vital-sign";
import { create } from "zustand";

export interface SearchState<T> extends SearchArgs {
  data: T[] | undefined;
  isEndPage?: boolean;
}

interface State {
  patientInfo?: SearchState<any>;
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
  basicExam?: SearchState<BasicExam>;
  prescription?: SearchState<Prescription>;
}

interface Actions {
  setPatientInfo: (state: SearchState<any>) => void;
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
  setBasicExam: (state: SearchState<BasicExam>) => void;
  setPrescription: (state: SearchState<Prescription>) => void;
  clearAll: () => void;
}

const inititalState: State = {
  patientInfo: undefined,
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
  basicExam: undefined,
  prescription: undefined,
};

export const useSearchDataStore = create<State & Actions>((set) => ({
  ...inititalState,
  setPatientInfo: (patientInfo) => set(() => ({ patientInfo })),
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
  setBasicExam: (basicExam) => set({ basicExam }),
  setPrescription: (prescription) => set({ prescription }),
  clearAll: () => set(inititalState),
}));
