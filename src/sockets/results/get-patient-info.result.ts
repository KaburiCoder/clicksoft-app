import { PatientInfo } from "../models/patient-info";

export interface GetPatientInfoResult {
  patientInfos?: PatientInfo[];
  status: string;
  message?: string;
}
