export class NursingRecord {
  id!: string;
  writeDateFullText!: string;
  nurseName!: string;
  details!: NursingDetail[];
}

export class NursingDetail {
  title!: string;
  detail!: string;
}