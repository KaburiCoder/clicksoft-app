import { ContentInfo } from "../models/content-info";

export class Prescription {
  id!: string;
  headers!: ContentInfo[];
  diagnosises?: Diagnosis[]
  orders?: RxOrder[];
  medicalNotes?: MedicalNote[];
}

export class MedicalNote {
  code!: string;
  name!: string;
}

export class Diagnosis {
  code!: string;
  name!: string;
}

export class RxOrder {
  code?: string;
  name!: string;

  /** 일투 */
  dailyDose!: number;
  /** 횟수 */
  frequency!: number;
  /** 총투 */
  day!: number;
  /** 용법 */
  yongbup!: string;

  orderType?: OrderType;
}

export enum OrderType {
  NORMAL = 0,
  INSTRUCTIONS = 1,
  GROUP = 2,
  SUB_ITEM = 3,
}
