export class VitalSign {
  writeDateFullText!: string;
  managerName!: string;
  details!: VitalSignDetail[];
}

export class VitalSignDetail {
  title!: string;
  value!: string;
  spanCount?: number;
}
