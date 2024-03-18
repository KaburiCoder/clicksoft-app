export class GetScanDto {
  chartNo!: String;
  startDate!: Date | string;
  endDate!: Date | string;
}

export enum ScanSearchType {
  LIST,
  DATA,
}
