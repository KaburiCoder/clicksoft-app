import { PatientInfo } from "@/sockets/models/patient-info";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PatientState = {
  patInfo: PatientInfo | undefined;
};

type Actions = {
  setPatientInfo: (data: PatientInfo) => void;
  clear: () => void;
};

const initialState: PatientState = {
  patInfo: undefined,
};

const usePatientStore = create(
  persist<PatientState & Actions>(
    (set) => ({
      ...initialState,
      setPatientInfo: (data) =>
        set(() => ({ patInfo: Object.assign(new PatientInfo(), data) })),
      clear: () => set(initialState),
    }),
    {
      name: "PatientStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default usePatientStore;
