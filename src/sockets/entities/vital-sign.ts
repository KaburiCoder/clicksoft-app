import { TitleValueDetail } from "../models/title-value-detail";

export class VitalSign {
  id!: string;
  writeDateFullText!: string;
  managerName!: string;
  details!: TitleValueDetail[];
}
