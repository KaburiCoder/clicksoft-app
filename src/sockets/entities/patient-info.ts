import { calculateAge } from "@/lib/utils/calculates";

export class PatientInfo {
  id!: string;
  chartNo!: string;
  suName!: string;
  yuhyungName!: string;
  sex!: string;
  get age(): number {
    return calculateAge(this.birthday);
  }
  birthday!: string;
  jinchalName!: string;
  ibYmd?: string;
  wardName?: string;
}
