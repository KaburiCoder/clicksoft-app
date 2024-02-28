import { DateRangeType } from "@/lib/types/date.types";
import { NursingRecord } from "@/sockets/models/nursing-record";
import { ProgressNote } from "@/sockets/models/progress-note";
import { create } from "zustand";

interface SearchState<T> {
  dates: DateRangeType | undefined;
  data: T[] | undefined;
}

interface State {
  nursingRecord?: SearchState<NursingRecord>;
  progress?: SearchState<ProgressNote>;
}

interface Actions {
  setNursingRecord: (state: SearchState<NursingRecord>) => void;
  setProgress: (state: SearchState<ProgressNote>) => void;
  clearAll: () => void;
}

const inititalState: State = {
  progress: undefined,
  nursingRecord: undefined,
};

export const useSearchDataStore = create<State & Actions>((set) => ({
  ...inititalState,
  setNursingRecord: (nursingRecord) => set(() => ({ nursingRecord })),
  setProgress: (progress) => set(() => ({ progress })),
  clearAll: () => set(inititalState),
}));
